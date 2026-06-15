const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

async function translateEmail({ text, targetLanguage, mode }) {
  const apiKey = getRequiredEnv("OPENAI_API_KEY");
  const model = getRequiredEnv("OPENAI_MODEL");

  if (typeof fetch !== "function") {
    const error = new Error("Node.js 18以上が必要です。現在のNode.jsではfetch APIを利用できません。");
    error.statusCode = 500;
    throw error;
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: buildSystemPrompt(targetLanguage, mode)
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.2
    })
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload && payload.error && payload.error.message
      ? payload.error.message
      : `OpenAI API error: HTTP ${response.status}`;
    const error = new Error(message);
    error.statusCode = response.status >= 400 && response.status < 500 ? 502 : 500;
    throw error;
  }

  const translation = extractOutputText(payload);
  if (!translation) {
    const error = new Error("OpenAI APIから翻訳結果を取得できませんでした。");
    error.statusCode = 502;
    throw error;
  }

  return translation.trim();
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value || value === "your_api_key_here" || value === "your_model_here") {
    const error = new Error(`${name} が設定されていません。.env を確認してください。`);
    error.statusCode = 500;
    throw error;
  }
  return value;
}

function buildSystemPrompt(targetLanguage, mode) {
  const languageMap = {
    ja: "Japanese",
    en: "English",
    "zh-CN": "Simplified Chinese"
  };

  const modeMap = {
    literal: "Translate while preserving the original meaning and structure as much as possible.",
    business: "Translate into natural, polite business writing.",
    trade: "Translate as a practical trade, import/export, logistics, and quotation-related business email."
  };

  return [
    `Translate the user's email into ${languageMap[targetLanguage]}.`,
    "Common rules:",
    "- Do not change the meaning.",
    "- Do not add information.",
    "- Do not omit information.",
    "- Preserve proper nouns, company names, port names, amounts, quantities, and dates accurately.",
    "- Consider the context of trade, import/export, logistics, quotations, SDS, Invoice, and Packing List.",
    "- Return only the translated text.",
    "- Do not return explanations, notes, markdown fences, or labels.",
    `Mode rule: ${modeMap[mode]}`
  ].join("\n");
}

function extractOutputText(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  if (typeof payload.output_text === "string") {
    return payload.output_text;
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  return payload.output
    .flatMap((item) => Array.isArray(item.content) ? item.content : [])
    .map((content) => {
      if (typeof content.text === "string") {
        return content.text;
      }
      if (content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
      return "";
    })
    .join("")
    .trim();
}

module.exports = {
  translateEmail
};
