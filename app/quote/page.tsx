export default function QuotePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "160px 40px 100px",
        background: "#07111f",
        color: "#f8f5ef",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
          }}
        >
          見積依頼
        </h1>

        <p
          style={{
            opacity: 0.8,
            lineHeight: 2,
            marginBottom: "60px",
          }}
        >
          商品情報・数量・配送先をご入力ください。
          内容確認後、担当者よりお見積りをご案内いたします。
        </p>

        <form
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <input
            type="text"
            placeholder="会社名"
            style={{
              padding: "16px",
              background: "#0f1f3d",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />

          <input
            type="text"
            placeholder="ご担当者名"
            style={{
              padding: "16px",
              background: "#0f1f3d",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />

          <input
            type="email"
            placeholder="メールアドレス"
            style={{
              padding: "16px",
              background: "#0f1f3d",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />

          <textarea
            rows={8}
            placeholder="商品名・数量・配送先国をご記入ください"
            style={{
              padding: "16px",
              background: "#0f1f3d",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#8b1e2f",
              color: "#fff",
              border: "none",
              padding: "18px",
              cursor: "pointer",
            }}
          >
            見積依頼を送信
          </button>
        </form>
      </div>
    </main>
  )
}