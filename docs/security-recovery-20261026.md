# 2026-10-26 セキュリティ修正・条件付き復旧記録

## 承認と停止状態

管理者の2026-10-26指示は、列挙された安全性・機能・デプロイ条件を**すべて確認した場合だけ**通常サイトの再公開を承認する。条件未確認時の解除は承認されていない。日時、ビルド、再デプロイによる自動解除は行わない。

`PRODUCTION_MAINTENANCE_LOCK=true` を維持。将来の承認済み解除でも、ソースロックfalseに加えてProductionの `MAINTENANCE_MODE=off` が必要となるよう制御を補強した。設定欠落・不正値・onは停止する。テスト内の解除シミュレーションは実ファイルを書き換えない。

## 変更前の対象

- GitHub main: `8b697539e2e55b1053266fbbd0a0d689692fd425`
- 引継ぎPR: #4 / `security/nextjs-oct2026-preflight` / `5b87bfa9fa41640a72c8daf90d9d700cfece6edc`
- Vercel: `justhen-yuukis-projects/yukimichi-chat-gpt-new-hp-cxx6`
- project: `prj_qSdp3iNVTw2uI7RXlhiCX3hZnwUH`
- 変更前Production: `Ccmxa127h5ww5vkwoHFp5gZFQBEQ` / main `8b69753`
- 公開URL: `https://justhen.co.jp/` / `https://www.justhen.co.jp/`
- 初回実測: 両トップ503、API503、robots200。no-store、Retry-After=3600。HTTPS証明書検証を有効にした接続が成功。
- MX: `justhen.sakura.ne.jp`。DNS/MX、さくらメール、ProductionのSendGrid資格情報・送信先・送信者は変更しない。

## 公式情報と適用判断

- [PHP公式](https://www.php.net/archive/2026.php#2026-10-21-5)、[IPA](https://www.ipa.go.jp/security/security-alert/2026/alert20261022.html)：CVE-2026-109618/109619。対象リポジトリにPHP、Composer、WordPressはなく、公開サイトはNext.js/Node。直接のPHP実行経路は確認されない。PHPやWordPressは追加しない。
- 別ホスト `justhen.sakura.ne.jp` のHTTP/HTTPSは403（nginx）で、PHP利用・パッチ状態はヘッダーから判断できない。メール/共有サーバー側の内部構成は未確認。PHP公式の10月23日session.upload_progress追加注意も別ホストの管理者・提供元で確認する。
- [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)：Next画像処理の上流librsvg CVE-2026-96889。Next15.5.28、sharp0.35.5へ更新。
- [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr)：影響範囲はNext16.0.0〜16.4.0。Next15の本サイトにはこの条件で直接該当しない。
- [React公式アドバイザリー](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3)：React19.2.9修正系列を採用。React DOM、eslint-config-nextも対応版に固定。
- [Node公式](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)：CVE-2026-111497等。Node22.23.4 /24.22.1以上をバージョン判定する。プロジェクトは24.xを指定し、古い実行環境ではビルドを失敗させ、問い合わせAPIも処理前に503で停止する。
- [Vercel公式](https://vercel.com/kb/bulletin/node-js-security-advisory)：WAF緩和はランタイム修正の代替ではない。管理ランタイムは配布状況を実測して確認する。

## 実装

- Next15.3.9 →15.5.28。React/React DOM19.2.9、sharp0.35.5、PostCSS8.5.31。Nextの固定された古いPostCSSは同一8系修正版へoverrideし、互換性をビルドで検証する。その他は既存の互換範囲内で更新し、実際のlockfileとインストール結果を照合する。`npm audit fix --force` は使わない。
- Vercel installCommandを `npm ci` にし、ロックファイルに従う。Node24.x、prebuildの修正済みNode確認を追加。
- 問い合わせは32KiB上限（ストリーム実測）、JSONと文字列フィールドの型、同一Origin、Fetch Metadata、Content-Type、非圧縮、正規APIパスを確認。商品/資料URLは資格情報のないHTTP(S)のみ。URLは取得しない。
- Vercel Firewallに `inquiry-submission-limit`：`/api/inquiry`、10回/IP/600秒、超過429を公開済み。これは共有制限。アプリの10回/IP/1時間はインスタンス単位の補助であり、分散全体の時間当たり保証ではない。2048キーでメモリーを制限する。大量分散送信を完全に排除したとは主張しない。
- 管理者宛通知を先に処理。顧客宛自動返信は受付番号・種別・日時等の定型情報だけとし、自由文・任意URLを転送しない。自動返信だけ失敗した場合は受付成功・自動返信失敗を区別し、不要な再送を防ぐ。プロバイダーの生エラー本文は記録しない。
- PreviewのSendGrid呼出しは常にSandboxに固定し、実メール配信しない。ProductionにSandbox用停止フラグが誤設定された場合は503。検証はモックSDKによるテストと、別途保護されたPreview上のプロバイダー検証を区別する。
- `/api/runtime-check` はPreview専用の読み取り確認。Node/Brotli/修正版判定だけを返す。Productionは404。Vercel Authentication保護が前提で、秘密値や顧客データは返さない。
- 通常ページにもnosniff、フレーム拒否、Referrer/Permissions Policyを設定。管理画面は既存のProduction404を維持し、新しいCRMや認証機能を今回追加しない。
- 数量等の任意項目、FormDataによるIME/オートフィル取得、失敗時の入力保持、既存料金・ページデザインを維持。

## 検証と現時点の制約

- ローカル検証用Node24.22.1はnodejs.orgの配布ZIPとSHA256一覧を照合して使用（PC全体のNodeは変更しない）。
- 依存更新後の `npm audit` は0件。最終のnpm ci/build/型/lint/追加テストとPreview結果は後続記録で確定する。
- Preview保護：Require Log In、Standard Protection有効。保護除外・共有リンク・自動化バイパスなしを確認。
- 直近1時間のRuntime Logsは0件。Firewall直近1日ではAllowed114、Denied764、Challenged11、System DDoS775、active alertsなしを確認。この数値は確認時点のスナップショットで、侵害なしの証明ではない。詳細ログの選択可能期間は現Hobbyプランで1時間まで。長期ログ/過去侵害の確認は未完了。
- PreviewにはSENDGRID_FROM_EMAILがあるが、SENDGRID_API_KEY・CONTACT_TO_EMAILはProductionのみ。秘密値はwrite-onlyで複製できない。Productionから移動・削除せず、検証専用キーを保護されたブランチへ設定してから外部連携検証を実施する。
- 実メールの送受信や、さくら/SendGrid内部の安全性を、DNS不変更やモック成功だけで確認済みとはしない。
- 別ローカルツールのtranslatorは全インターフェースの無認証API、開発専用adminのCSVは数式無害化に中程度の課題がある。いずれもrootのVercel公開経路は確認されない。本番復旧に無関係な大規模変更は避け、別途対処事項として保持する。

## 将来の解除・安全な再停止

1. 管理者の全解除条件について、PHP範囲、修正版依存関係・実Node、侵害調査、保護Previewのページ/フォーム/Sandbox API、正しい本番対象、復旧ビルドを証拠付きで確認する。一つでも不足なら以下を行わない。
2. 同じ修正済みソースの `PRODUCTION_MAINTENANCE_LOCK=false` とProductionの `MAINTENANCE_MODE=off` を組み合わせて段階公開する。環境変更だけでは既存デプロイに反映されない。未割当の保護されたProduction候補を検証し、同じビルドを昇格する。古い脆弱なビルドで解除しない。
3. 再停止時は、今回の修正済み依存関係とtrueロックを持つ検証済みmaintenanceデプロイへ戻す。併せてProductionをonにし、以後の新デプロイにも停止を維持する。既存デプロイは環境変更だけでは停止しないので、ドメイン切替/再デプロイ後にHTTPを確認する。
4. 両ドメイン、contact/quote/admin/API/未知URL、robots、503/no-store/Retry-After、Yahooでは同じお知らせ（公開HTMLのみ200）を確認。メール送信を伴うAPIを実行しない。
5. 現状はtrueロックを保持している。上記の解除操作は実行していない。
