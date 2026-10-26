# YUKIMICHI 緊急セキュリティメンテナンス運用

## 解除禁止

2026-10-26に管理者から、指定の安全性・機能・本番確認条件を**すべて満たした場合だけ**再公開する承認を受けた。現在のソースロックはtrueのまま維持する。条件が一つでも未確認・未達なら解除しない。詳細は `security-recovery-20261026.md` を参照。
日時の経過、安全性確認の完了、ビルド、再デプロイ、環境変数の欠落は解除理由にならない。
この文書は解除操作を実行する指示ではない。

## 変更前の記録（2026-10-22 JST）

- GitHub: `JUSTHEN-YUUKI/YUKIMICHI-ChatGpt-NEW-HP`
- リモートmain基点: `68755509d082f35924985dd30f551455d3f4052d`
- 作業開始時のローカルHEAD: `50fda3e44e9426faa98c24ddde33a90a5b8a64b9`
- 専用ブランチ: `codex/emergency-security-maintenance-20261022`
- ローカルリンク先: `yukimichi-chat-gpt-new-hp-cxx6` / `prj_qSdp3iNVTw2uI7RXlhiCX3hZnwUH`
- Vercelチーム: `justhen-yuukis-projects` / `team_TLQaFDtKuaSN5WEXeWNy5Lay`
- GitHubの直前mainにはVercelプロジェクト2件の成功ステータスがある。`yukimichi-chat-gpt-new-hp` と `yukimichi-chat-gpt-new-hp-cxx6`。どちらに本番ドメインが紐付くか管理画面で確認する。
- 既存データ・問い合わせ履歴、DNS・MX・メールサーバーは変更対象外。

## 動作と環境変数

`middleware.ts` は全パス・全メソッドを対象とし、通常のReactレンダリングやAPIハンドラーより前に503を返す。
`/robots.txt` のGET/HEADだけ、既存のAllow/Disallow/Sitemap/Hostを維持した200を直接返す。
静的アセット、`/_next`、管理ページ、未知のURL、サイトマップも例外にしない。
APIはJSON、その他は日本語・英語の静的HTML。画像・外部スクリプト・解析・外部フォントは不要。
問い合わせPOSTハンドラーにも、JSON解析とメール処理より前の停止判定を追加。

### 2026-10-23: Yahoo! JAPANアプリの表示互換対応

スマホでもPCと同じお知らせを表示する修正依頼に基づき、Yahoo!アプリ（YJApp-ANDROID / YJApp-IOS）の公開HTMLページ閲覧（GET/HEAD、Acceptにtext/html）に限り、HTTP200で**同一のメンテナンスHTML**を返す。Yahoo!アプリが503を独自エラー画面に置き換える事象への互換対応であり、通常アプリを実行・再公開する経路は設けない。
これは当初の「全通常ページ503」に対する表示用の例外。一般ブラウザー・検索クローラーは503を維持。API、admin、_next、ファイル、POST等もYahoo!アプリを含め503を維持する。
200のお知らせにもno-storeを設定し、Vary: User-Agent, Acceptを明示。200にはRetry-Afterを付けず、noindexは追加しない。Productionのロック・環境変数・解除承認条件は変更しない。

Vercel Productionで `MAINTENANCE_MODE=on` を永続設定する。環境変数変更は既存デプロイに反映されないため、新しいProductionデプロイを作成して確認する。
`lib/maintenance.ts` の `PRODUCTION_MAINTENANCE_LOCK=true` が本番の二重ロック。Productionは環境変数がoff・欠落しても停止する。Vercel外のproduction実行も停止する。
クエリ・リクエストヘッダー・Cookie・時刻による解除経路は設けない。

Previewも初期状態では停止する。通常サイトの検証には次の順序を守る。

1. 対象プロジェクトのDeployment Protection / Vercel Authenticationを有効にし、以前のPreviewも含めて保護する。
2. 未認証の別セッションでPreview URLが認証要求（例:401）になり、通常コンテンツを取得できないことを確認する。
3. Preview環境だけ `MAINTENANCE_MODE=off` と `MAINTENANCE_PREVIEW_SITE_ENABLED=on` を設定する。
4. Previewを新規デプロイし、認証済みセッションで通常サイトを検証する。
5. メンテナンス画面検証用Previewは `MAINTENANCE_MODE=on` とする。

ProductionでPreviewフラグをonにしても本番ロックは解除されない。Previewで実際の問い合わせを送信しない。メール認証情報はProductionと共有しない。

## HTTP・検索エンジン

- 停止応答: HTTP503、`Cache-Control: no-store, max-age=0`、CDNもno-store。
- `Retry-After: 3600` は再クロールまでの目安。1時間後の再開を約束せず、解除処理にも使わない。
- `noindex` と `X-Robots-Tag: noindex` を追加せず、robots.txtを全面Disallowにしない。
- Google公式は、サイト全体の停止は長引くと検索登録に悪影響があると説明している。503は長期の検索順位維持を保証しない。このリスクを理由に自動解除しない。
- 参考: https://developers.google.com/search/docs/crawling-indexing/pause-online-business

## 検証コマンド

```powershell
node --test tests/maintenance.test.mjs
npm run build
npm run lint
node node_modules/eslint/bin/eslint.js middleware.ts lib/maintenance.ts app/api/inquiry/route.ts next.config.ts
# next startはProductionロックにより.env設定にかかわらず停止する。
npm run start -- --port 3215
node tests/maintenance-http.mjs http://localhost:3215
git diff --check
npm audit --json
```

`tests/maintenance-http.mjs` は通常・管理・API・静的・内部データURL・不明URL・クエリ・複数メソッド・RSC/Server Action風リクエストを検証する。
送信テストは壊れたJSONを使用するため、仮に停止判定が壊れても通常APIの400となりメールは送信されない。
本番でも両ホストを確認する。ホスト間のVercelドメインリダイレクトがある場合は最終応答503まで確認する。
接続不能・DNS/SSLエラーは503確認成功に数えない。

## PHPと残存課題

PHP公式2026-10-21告知: CVE-2026-109618 / CVE-2026-109619。
公式情報: https://www.php.net/archive/2026.php
本リポジトリの公開アプリはNext.js/TypeScript、問い合わせAPIはNode.jsランタイムとSendGrid SDK。追跡対象にPHP/composer/WordPressの実装はないため、確認した自社アプリにPHP実行環境を前提とする当該脆弱性の直接該当根拠はない。
外部サービス（SendGrid、Google Analytics、Clarity等）の内部実装や同一ドメイン配下の別契約ホスティングは、このソース確認だけでは断定できない。必要に応じ提供元に確認する。PHP/WordPressは追加しない。

初回npm auditは16件（Critical1 / High14 / Moderate1）。Next.js15.3.9ほかの依存関係に告知あり。監査件数は脆弱なパッケージ数であり、実際の攻撃成立数ではない。関連性・実行環境・到達可能性は個別確認が必要。
既存問い合わせAPIにはhoneypot、文字数制限、HTMLエスケープ、メール設定確認がある。一方、共有ストアでのレート制限、リクエスト本文の事前サイズ制限、null/配列等のJSON形状検証の強化は通常運用再開前の検証対象。今回の停止中はMiddlewareとAPIの早期判定で処理させない。
Firewall・アクセス/エラーログはVercelの対象アカウント権限で確認し、確認できなければ未確認と報告する。不審アクセスがないとは断定しない。
Codex Securityのスキャン開始ツールが失敗した場合は正式スキャン完了と報告しない。

## 解除手順（実行禁止・文書のみ）

1. 代表者の「メンテナンス解除OK」の明示指示を保存する。それまでは以下を実行しない。
2. 別ブランチと保護付きPreviewで残存する依存関係/API/認証/ログ等を検証する。
3. レビュー済み変更で `PRODUCTION_MAINTENANCE_LOCK` を解除し、明示的な `MAINTENANCE_MODE=off` だけを解除条件にするようポリシーとテストを更新する。
4. 承認済みの本番設定とコードから新しいProductionデプロイを作成し、両ドメイン・通常ページ・フォーム・APIを確認する。
5. 問題があれば、今回の**メンテナンス有効コミット**に戻す。メンテナンス実装より古い通常サイトへのRollback/Promoteは行わない。

通常サイトが表示される過去のデプロイへの切替、Productionドメインの付け替え、ソースロック削除は、いずれも解除操作に該当する。
