export const COLORS = {
  navyDeep: "#07111f",
  navyMid: "#0d1c35",
  navySoft: "#122744",
  washi: "#f8f5ef",
  washiDim: "rgba(248, 245, 239, 0.66)",
  washiFaint: "rgba(248, 245, 239, 0.32)",
  gold: "#c9a84c",
  goldSoft: "rgba(201, 168, 76, 0.34)",
  benigara: "#8b1e2f",
};

export const TIMING = {
  fps: 30,
  sceneFrames: 120,
  totalFrames: 720,
};

export const typography = {
  serif: "Georgia, 'Times New Roman', serif",
  sans: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', Arial, sans-serif",
  tracking: 4.8,
};

export const safeTextStyle: React.CSSProperties = {
  position: "absolute",
  right: 118,
  bottom: 112,
  width: 720,
  textAlign: "right",
};

export const smallCaps: React.CSSProperties = {
  color: COLORS.gold,
  fontSize: 24,
  letterSpacing: typography.tracking,
  lineHeight: 1.35,
  textTransform: "uppercase",
};

export const titleStyle: React.CSSProperties = {
  color: COLORS.washi,
  fontFamily: typography.serif,
  fontSize: 66,
  fontWeight: 300,
  letterSpacing: 0,
  lineHeight: 1.05,
  textShadow: "0 28px 56px rgba(0,0,0,0.5)",
};

export const bodyStyle: React.CSSProperties = {
  color: COLORS.washiDim,
  fontSize: 28,
  letterSpacing: 1.4,
  lineHeight: 1.55,
};
