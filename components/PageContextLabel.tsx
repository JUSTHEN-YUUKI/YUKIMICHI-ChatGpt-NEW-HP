type PageContextLabelProps = {
  current: string
  trail: string
  label?: string
}

export default function PageContextLabel({
  current,
  trail,
  label = "Page Context",
}: PageContextLabelProps) {
  return (
    <div className="page-context-label" aria-label={`${label}: ${current}`}>
      <span>{label}</span>
      <strong>{trail}</strong>
      <em>現在のページ：{current}</em>

      <style>{`
        .page-context-label {
          display: inline-grid;
          gap: 6px;
          max-width: min(100%, 720px);
          margin: 0 0 24px;
          padding: 13px 16px;
          border: 1px solid rgba(201,168,76,0.2);
          border-left: 2px solid var(--gold);
          background:
            linear-gradient(135deg, rgba(201,168,76,0.08), transparent 56%),
            rgba(7,17,31,0.42);
          color: var(--washi-dim);
        }

        .page-context-label span {
          color: var(--gold);
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.26em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .page-context-label strong {
          color: var(--washi);
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.12em;
          line-height: 1.6;
        }

        .page-context-label em {
          color: var(--suzu);
          font-size: 11px;
          font-style: normal;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .page-context-label {
            width: 100%;
            padding: 12px 14px;
          }
        }
      `}</style>
    </div>
  )
}
