(function () {
  const state = {
    officeReady: false,
    currentBodyText: "",
    resultText: "",
    isLoading: false
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", () => {
    cacheElements();
    bindEvents();

    if (!window.Office || typeof Office.onReady !== "function") {
      showStatus("Office.jsを読み込めませんでした。Outlook内で開いているか確認してください。");
      return;
    }

    Office.onReady((info) => {
      state.officeReady = info.host === Office.HostType.Outlook;
      if (state.officeReady) {
        showStatus("Outlookメールを取得できます。");
      } else {
        showStatus("Outlook以外で表示されています。画面確認はできますが、メール本文取得はOutlook内で実行してください。");
      }
      updateButtons();
    });
  });

  function cacheElements() {
    elements.targetLanguage = document.getElementById("targetLanguage");
    elements.mode = document.getElementById("mode");
    elements.loadEmailButton = document.getElementById("loadEmailButton");
    elements.translateButton = document.getElementById("translateButton");
    elements.copyButton = document.getElementById("copyButton");
    elements.errorArea = document.getElementById("errorArea");
    elements.statusArea = document.getElementById("statusArea");
    elements.sourceText = document.getElementById("sourceText");
    elements.resultArea = document.getElementById("resultArea");
    elements.resultMeta = document.getElementById("resultMeta");
  }

  function bindEvents() {
    elements.loadEmailButton.addEventListener("click", loadEmailBody);
    elements.translateButton.addEventListener("click", translateCurrentBody);
    elements.copyButton.addEventListener("click", copyResult);
  }

  function loadEmailBody() {
    clearError();
    state.resultText = "";
    elements.resultArea.textContent = "翻訳結果はここに表示されます。";
    elements.resultMeta.textContent = "";
    updateButtons();

    if (!state.officeReady) {
      showError("Outlook環境の準備が完了していません。Outlookでメールを開いてから再実行してください。");
      return;
    }

    const item = Office.context && Office.context.mailbox && Office.context.mailbox.item;
    if (!item || !item.body || typeof item.body.getAsync !== "function") {
      showError("開いているメール本文を取得できません。閲覧中のメールを開いてからお試しください。");
      return;
    }

    setLoading(true, "メール本文を取得しています。");

    item.body.getAsync(Office.CoercionType.Text, (result) => {
      setLoading(false);

      if (result.status !== Office.AsyncResultStatus.Succeeded) {
        const message = result.error && result.error.message ? result.error.message : "原因不明のエラー";
        showError(`メール本文の取得に失敗しました。${message}`);
        return;
      }

      const bodyText = normalizeText(result.value);
      if (!bodyText) {
        showError("メール本文が空のため翻訳できません。本文のあるメールを開いてください。");
        return;
      }

      state.currentBodyText = bodyText;
      elements.sourceText.value = bodyText;
      showStatus("メール本文を取得しました。翻訳先とモードを選んで翻訳できます。");
      updateButtons();
    });
  }

  async function translateCurrentBody() {
    clearError();
    const text = normalizeText(state.currentBodyText || elements.sourceText.value);

    if (!text) {
      showError("翻訳するメール本文がありません。先に「メール本文を取得」を押してください。");
      return;
    }

    const payload = {
      text,
      targetLanguage: elements.targetLanguage.value,
      mode: elements.mode.value
    };

    setLoading(true, "翻訳しています。");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `翻訳APIでエラーが発生しました。HTTP ${response.status}`);
      }

      state.resultText = normalizeText(data.translation);
      elements.resultArea.textContent = state.resultText || "翻訳結果が空でした。";
      elements.resultMeta.textContent = getResultLabel(payload.targetLanguage, payload.mode);
      showStatus("翻訳が完了しました。");
    } catch (error) {
      showError(error.message || "翻訳に失敗しました。サーバーとOpenAI APIキーの設定を確認してください。");
    } finally {
      setLoading(false);
      updateButtons();
    }
  }

  async function copyResult() {
    clearError();
    if (!state.resultText) {
      showError("コピーする翻訳結果がありません。");
      return;
    }

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(state.resultText);
      } else {
        const range = document.createRange();
        range.selectNodeContents(elements.resultArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }
      showStatus("翻訳結果をコピーしました。");
    } catch (error) {
      showError("コピーに失敗しました。翻訳結果を選択して手動でコピーしてください。");
    }
  }

  function setLoading(isLoading, message) {
    state.isLoading = isLoading;
    if (message) {
      showStatus(message);
    }
    updateButtons();
  }

  function updateButtons() {
    elements.loadEmailButton.disabled = state.isLoading || !state.officeReady;
    elements.translateButton.disabled = state.isLoading || !normalizeText(state.currentBodyText || elements.sourceText.value);
    elements.copyButton.disabled = state.isLoading || !state.resultText;
  }

  function showError(message) {
    elements.errorArea.textContent = message;
    elements.errorArea.hidden = false;
  }

  function clearError() {
    elements.errorArea.textContent = "";
    elements.errorArea.hidden = true;
  }

  function showStatus(message) {
    elements.statusArea.textContent = message;
  }

  function normalizeText(value) {
    return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
  }

  function getResultLabel(targetLanguage, mode) {
    const languageLabels = {
      ja: "日本語",
      en: "英語",
      "zh-CN": "中国語・簡体字"
    };
    const modeLabels = {
      literal: "直訳",
      business: "ビジネス文",
      trade: "貿易・輸出入"
    };
    return `${languageLabels[targetLanguage] || targetLanguage} / ${modeLabels[mode] || mode}`;
  }
})();
