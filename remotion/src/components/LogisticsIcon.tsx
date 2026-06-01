import { COLORS } from "../styles";

type LogisticsIconProps = {
  kind: "box" | "check" | "air" | "sea" | "globe";
  left: number;
  top: number;
  size?: number;
  opacity?: number;
};

export const LogisticsIcon = ({
  kind,
  left,
  top,
  size = 150,
  opacity = 0.86,
}: LogisticsIconProps) => {
  const stroke = COLORS.gold;
  const faint = "rgba(248,245,239,0.2)";

  return (
    <svg
      viewBox="0 0 160 160"
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        opacity,
        overflow: "visible",
      }}
    >
      {kind === "box" ? (
        <>
          <path d="M28 56 L80 28 L132 56 L80 84 Z" fill="rgba(201,168,76,0.08)" stroke={stroke} />
          <path d="M28 56 V108 L80 138 V84 Z" fill="rgba(7,17,31,0.3)" stroke={faint} />
          <path d="M132 56 V108 L80 138 V84 Z" fill="rgba(248,245,239,0.05)" stroke={faint} />
          <path d="M55 44 L108 73" stroke={stroke} strokeWidth="2" />
        </>
      ) : null}
      {kind === "check" ? (
        <>
          <circle cx="80" cy="80" r="48" fill="rgba(7,17,31,0.36)" stroke={faint} />
          <path d="M52 82 L72 102 L112 56" fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      {kind === "air" ? (
        <>
          <path d="M26 88 L132 42 L146 58 L42 106 Z" fill="rgba(248,245,239,0.16)" stroke={stroke} />
          <path d="M69 82 L42 128 L70 118 L104 68" fill="rgba(201,168,76,0.16)" stroke={faint} />
          <path d="M105 61 L126 111 L144 102 L126 52" fill="rgba(201,168,76,0.12)" stroke={faint} />
        </>
      ) : null}
      {kind === "sea" ? (
        <>
          <path d="M28 82 H132 L116 118 H44 Z" fill="rgba(7,17,31,0.42)" stroke={stroke} />
          <path d="M48 62 H72 V82 H48 Z M78 62 H102 V82 H78 Z M108 62 H132 V82 H108 Z" fill="rgba(201,168,76,0.18)" stroke={faint} />
          <path d="M26 128 C48 114 70 142 92 128 S126 118 146 130" fill="none" stroke={faint} strokeWidth="3" />
        </>
      ) : null}
      {kind === "globe" ? (
        <>
          <circle cx="80" cy="80" r="56" fill="rgba(7,17,31,0.24)" stroke={stroke} />
          <path d="M24 80 H136 M80 24 C55 50 55 110 80 136 M80 24 C105 50 105 110 80 136" fill="none" stroke={faint} strokeWidth="2" />
          <path d="M38 48 C62 62 98 62 122 48 M38 112 C62 98 98 98 122 112" fill="none" stroke={faint} strokeWidth="2" />
        </>
      ) : null}
    </svg>
  );
};
