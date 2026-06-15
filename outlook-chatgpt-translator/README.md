# Outlook ChatGPT翻訳アドイン

Outlookで開いているメール本文を取得し、OpenAI APIで日本語・英語・中国語（簡体字）へ翻訳するタスクペイン型のOutlook Web Add-inです。

## 1. このアドインでできること

- Outlookで開いているメール本文を右側パネルに取得できます。
- 翻訳先を日本語、英語、中国語・簡体字から選べます。
- 翻訳モードを「意味を変えない直訳」「自然なビジネス文」「貿易・輸出入向け」から選べます。
- 翻訳結果をパネル内に表示し、コピーできます。
- OpenAI APIキーはバックエンド側の `.env` から読み込みます。フロントエンドには置きません。

## 2. 必要なもの

- Node.js 18以上
- npm
- Outlook（Outlook on the web またはデスクトップ版Outlook）
- OpenAI APIキー

Node.jsやnpmが入っていない場合は、先にNode.jsをインストールしてください。インストール後、ターミナルで `node -v` と `npm -v` が表示されれば準備完了です。

## 3. インストール手順

```powershell
cd outlook-chatgpt-translator
npm install
```

## 4. `.env` の作り方

`.env.example` をコピーして `.env` を作成します。

```powershell
Copy-Item .env.example .env
```

作成した `.env` を開き、次の値を設定してください。

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=your_model_here
PORT=3001
```

`OPENAI_API_KEY` にはOpenAI APIキーを入れます。`OPENAI_MODEL` には利用するモデル名を入れます。

## 5. 起動方法

開発用サーバーを起動します。

```powershell
npm run dev
```

起動後、通常は次のURLでタスクペイン画面を確認できます。

```text
https://localhost:3001/taskpane.html
```

HTTPS開発証明書がまだ使えない環境では、サーバーがHTTPへフォールバックする場合があります。その場合はターミナルに表示された `http://localhost:3001/taskpane.html` をブラウザで確認できます。Outlook Webへ追加する場合はHTTPSが必要になることがあるため、次の証明書コマンドを実行してください。

```powershell
npx office-addin-dev-certs install
```

## 6. Outlookへmanifest.xmlを追加する方法

1. `npm run dev` で開発サーバーを起動します。
2. Outlookでメールを開きます。
3. アドイン管理画面を開きます。
   - Outlook on the webでは、アプリまたはアドイン管理から「カスタム アドイン」を選びます。
   - デスクトップ版Outlookでは、アドイン管理または「個人用アドイン」からカスタムアドインを追加します。
4. `manifest.xml` をアップロードします。
5. メール閲覧画面のリボンまたはアプリ一覧から「ChatGPT翻訳」を開きます。
6. 右側パネルで「メール本文を取得」を押し、翻訳先とモードを選んで「翻訳する」を押します。

## 7. よくあるエラー

- `OPENAI_API_KEY が設定されていません`
  - `.env` が作成されているか、APIキーが `your_api_key_here` のままではないか確認してください。
- `OPENAI_MODEL が設定されていません`
  - `.env` の `OPENAI_MODEL` に利用するモデル名を入れてください。
- Outlookでパネルが開かない
  - `npm run dev` が起動中か、`manifest.xml` のURLと起動URLが一致しているか確認してください。
- Outlook Webで読み込まれない
  - HTTPS証明書が信頼されていない可能性があります。`npx office-addin-dev-certs install` を実行し、ブラウザで `https://localhost:3001/taskpane.html` を開いて警告が出ないか確認してください。
- メール本文を取得できない
  - Outlookでメールを閲覧モードで開いているか確認してください。このアドインは `Office.context.mailbox.item.body.getAsync` で本文を取得します。
- 翻訳APIでエラーになる
  - OpenAI APIキー、モデル名、利用上限、ネットワーク接続を確認してください。

## 8. APIキーを公開してはいけない注意

OpenAI APIキーは秘密情報です。`src/taskpane/taskpane.js` や `taskpane.html` などのフロントエンドファイルには絶対に書かないでください。

このプロジェクトでは、APIキーは `.env` に保存し、Expressバックエンドだけが読み込みます。`.env` は `.gitignore` に入っているため、通常はGit管理されません。

## 9. 今後追加できる機能

- 返信文作成
- 翻訳結果を返信本文に挿入
- 日本語・英語・中国語の3言語同時生成
- よく使う翻訳モードの保存
- 翻訳履歴のローカル保存

## 補足

このプロジェクトは既存のYUKIMICHIサイトとは独立した新規フォルダです。既存サイトの `package.json`、Next.jsコード、公開ページには変更を加えません。
