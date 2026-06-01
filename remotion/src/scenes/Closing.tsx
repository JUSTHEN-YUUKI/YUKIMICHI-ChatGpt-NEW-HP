import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GoldLine } from "../components/GoldLine";
import { COLORS, bodyStyle, safeTextStyle, smallCaps, titleStyle } from "../styles";

export const Closing = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 32, 96, 120], [0, 1, 1, 0], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: fade }}>
      <Img
        src={staticFile("yukimichi-logo-favicon.png")}
        style={{
          position: "absolute",
          right: 154,
          top: 136,
          width: 168,
          height: 142,
          objectFit: "contain",
          opacity: 0.42,
          filter: "sepia(0.18) saturate(0.84)",
        }}
      />
      <GoldLine left={1112} top={328} width={490} delay={10} opacity={0.6} />
      <div
        style={{
          position: "absolute",
          right: 118,
          top: 124,
          width: 360,
          height: 360,
          border: "1px solid rgba(201,168,76,0.2)",
          transform: `rotate(${45 + frame * 0.02}deg)`,
        }}
      />
      <div style={safeTextStyle}>
        <div style={smallCaps}>Trusted Export Support from Japan</div>
        <div style={{ ...titleStyle, marginTop: 24 }}>Request a Quote</div>
        <div style={{ ...bodyStyle, marginTop: 26, color: COLORS.washi }}>
          YUKIMICHI - SNOWPATH JAPAN
        </div>
        <div style={{ ...bodyStyle, marginTop: 6, fontSize: 24 }}>JUSTHEN CO., LTD.</div>
      </div>
    </div>
  );
};
