import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GoldLine } from "../components/GoldLine";
import { COLORS, bodyStyle, safeTextStyle, smallCaps, titleStyle } from "../styles";

export const Opening = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 34], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [96, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: fade * out }}>
      <Img
        src={staticFile("yukimichi-logo-favicon.png")}
        style={{
          position: "absolute",
          right: 158,
          top: 130,
          width: 180,
          height: 152,
          objectFit: "contain",
          opacity: 0.48,
          filter: "sepia(0.24) saturate(0.85)",
        }}
      />
      <GoldLine left={1180} top={326} width={420} delay={12} opacity={0.7} />
      <div style={safeTextStyle}>
        <div style={smallCaps}>YUKIMICHI</div>
        <div style={{ ...smallCaps, color: COLORS.washiDim, fontSize: 21, marginTop: 13 }}>
          SNOWPATH JAPAN
        </div>
        <div style={{ ...titleStyle, marginTop: 30 }}>From Japan to the World</div>
        <div style={{ ...bodyStyle, marginTop: 20 }}>Compliance-first export support</div>
      </div>
    </div>
  );
};
