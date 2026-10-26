# 2026-10-26 公開ページ優先の再開

管理者は最新指示で、従来の全条件確認までの全サイト停止から、通常閲覧の早期復旧・問い合わせの個別制限へ方針を変更し、本番公開とメンテナンス解除を明示的に承認した。この指示が以前の全サイト停止条件に優先する。

対象はjusthen-yuukis-projects / yukimichi-chat-gpt-new-hp-cxx6のみ。基点mainはe782e80e7e61e306d6293bbb51894facf6304562。yukimichi-v2、DNS/MX、さくらメール、SendGrid秘密値は変更しない。

- 公開ページ：PRODUCTION_MAINTENANCE_LOCK=false＋Production MAINTENANCE_MODE=offで再開。ページは既存の静的生成を維持。robotsとsitemapを通常取得できるようにする。停止中だけ動作する既存Yahoo互換処理は残す。
- 問い合わせ：Production INQUIRY_MODE=onを明示設定するまで停止。設定欠落・off・不正値は停止。onでも実Node判定・Origin・入力検証・送信量・レート制限は必須。Node24.22.1以上または22.23.4以上を確認する。公開ページの状態とは独立。
- Contact/Quote：制限中は送信ボタンを無効にし、日英の案内と既存公式メールのリンクを表示。数量等の任意属性、IME/FormData、入力保持、既存価格・デザインを維持。
- 管理画面：Productionの既存notFound制限を維持。認証解除や一般公開を行わない。
- 実行環境：/api/runtime-checkは引き続きVercel認証付きPreviewだけ。診断レスポンスは200でpatched真偽を返す（200だけで安全と判定しない）。Productionは404。
- SendGrid：一度の本番候補検証用にSENDGRID_SANDBOX_VERIFY=onを設定すると、修正済みNodeを要求するprebuildの後、既存秘密値を同じVercel環境内で使用しSandbox要求を1回送る。宛先は既存管理者設定のみ、sandbox_mode.enable=true固定。実メール・クレジット消費はなし。秘密値・メールアドレス・レスポンス本文をログへ出さない。HTTP200は要求形式・認証の検証結果であり、実配達の証明ではない。失敗はログにHTTP状態だけ残し、静的ページの公開を妨げない。検証後このフラグをoffにする。
- 復旧：API障害はINQUIRY_MODE=offで再デプロイし公開ページを維持。全体障害はMAINTENANCE_MODE=onで再デプロイ、または修正済み停止デプロイdpl_6Ge81xrF9XyTAfL5sMuphMWRC48iへ戻す。環境変更だけでは既存デプロイに反映されない。脆弱な過去デプロイへ通常公開のために戻さない。

Node公式：https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
SendGrid Sandbox公式：https://www.twilio.com/docs/sendgrid/for-developers/sending-email/sandbox-mode

最終デプロイ・公開URL・HTTP・フォーム・実Node・Sandbox結果は実施時の検証記録に保存する。
