const http = require("http");
const https = require("https");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { translateEmail } = require("./openaiTranslator");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const PORT = Number.parseInt(process.env.PORT || "3001", 10);
const MAX_TEXT_LENGTH = 12000;
const ALLOWED_LANGUAGES = new Set(["ja", "en", "zh-CN"]);
const ALLOWED_MODES = new Set(["literal", "business", "trade"]);

app.disable("x-powered-by");
app.use(express.json({ limit: "96kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});
app.use(express.static(path.join(__dirname, "..", "src", "taskpane")));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/translate", async (req, res) => {
  try {
    const validation = validateTranslateRequest(req.body);
    if (!validation.ok) {
      return res.status(400).json({ error: validation.error });
    }

    const translation = await translateEmail({
      text: validation.text,
      targetLanguage: validation.targetLanguage,
      mode: validation.mode
    });

    return res.json({ translation });
  } catch (error) {
    const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
    return res.status(statusCode).json({
      error: error.message || "翻訳処理でエラーが発生しました。"
    });
  }
});

function validateTranslateRequest(body) {
  const text = normalizeText(body && body.text);
  const targetLanguage = normalizeText(body && body.targetLanguage);
  const mode = normalizeText(body && body.mode);

  if (!text) {
    return { ok: false, error: "text は必須です。" };
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return {
      ok: false,
      error: `text が長すぎます。${MAX_TEXT_LENGTH}文字以内にしてください。`
    };
  }

  if (!ALLOWED_LANGUAGES.has(targetLanguage)) {
    return { ok: false, error: "targetLanguage は ja / en / zh-CN のいずれかを指定してください。" };
  }

  if (!ALLOWED_MODES.has(mode)) {
    return { ok: false, error: "mode は literal / business / trade のいずれかを指定してください。" };
  }

  return { ok: true, text, targetLanguage, mode };
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function createServer() {
  const useHttps = process.env.USE_HTTPS !== "false";

  if (useHttps) {
    try {
      const devCerts = require("office-addin-dev-certs");
      const httpsOptions = await devCerts.getHttpsServerOptions();
      return {
        protocol: "https",
        server: https.createServer(httpsOptions, app)
      };
    } catch (error) {
      console.warn("HTTPS dev certificate could not be loaded. Falling back to HTTP. For Outlook Web, see the certificate setup in README.md.");
      console.warn(error.message);
    }
  }

  return {
    protocol: "http",
    server: http.createServer(app)
  };
}

createServer()
  .then(({ protocol, server }) => {
    server.listen(PORT, () => {
      console.log(`outlook-chatgpt-translator is running at ${protocol}://localhost:${PORT}/taskpane.html`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
