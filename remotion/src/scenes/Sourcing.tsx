import { Easing, interpolate, useCurrentFrame } from "remotion";
import { GoldLine } from "../components/GoldLine";
import { LogisticsIcon } from "../components/LogisticsIcon";
import { COLORS, bodyStyle, safeTextStyle, smallCaps, titleStyle } from "../styles";

export const Sourcing = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 28, 98, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardIn = interpolate(frame, [14, 48], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: fade }}>
      <LogisticsIcon kind="box" left={1160} top={170} size={230} opacity={0.76} />
      <LogisticsIcon kind="check" left={1418} top={206} size={150} opacity={0.7} />
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            right: 250 + index * 42,
            top: 404 + index * 58,
            width: 410,
            height: 84,
            opacity: cardIn,
            border: `1px solid rgba(201,168,76,${0.24 - index * 0.03})`,
            background: "linear-gradient(135deg, rgba(248,245,239,0.07), rgba(7,17,31,0.58))",
            transform: `translateY(${interpolate(cardIn, [0, 1], [28, 0])}px)`,
            padding: "18px 24px",
          }}
        >
          <div style={{ color: COLORS.gold, fontSize: 16, letterSpacing: 3.4 }}>
            {index === 0 ? "SOURCE" : index === 1 ? "PACK" : "INSPECT"}
          </div>
          <div style={{ color: COLORS.washiDim, fontSize: 18, letterSpacing: 1.2, marginTop: 9 }}>
            {index === 0 ? "Eligible goods" : index === 1 ? "Careful handling" : "Visible checks"}
          </div>
        </div>
      ))}
      <GoldLine left={1158} top={636} width={500} delay={24} opacity={0.52} />
      <div style={safeTextStyle}>
        <div style={smallCaps}>Sourcing, Packing and Inspection</div>
        <div style={{ ...titleStyle, marginTop: 24 }}>Eligible Japanese products, handled with care.</div>
        <div style={{ ...bodyStyle, marginTop: 20 }}>
          Product details are checked before shipment planning.
        </div>
      </div>
    </div>
  );
};
