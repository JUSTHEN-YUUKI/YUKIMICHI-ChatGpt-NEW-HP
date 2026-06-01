import { Easing, interpolate, useCurrentFrame } from "remotion";
import { LogisticsIcon } from "../components/LogisticsIcon";
import { COLORS, bodyStyle, safeTextStyle, smallCaps, titleStyle } from "../styles";

export const Logistics = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 28, 98, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const route = interpolate(frame, [18, 92], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: fade }}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path
          d="M260 760 C 580 520, 828 546, 1034 640 S 1426 720, 1700 404"
          fill="none"
          stroke="rgba(248,245,239,0.13)"
          strokeWidth="3"
          strokeDasharray="12 18"
        />
        <path
          d="M260 760 C 580 520, 828 546, 1034 640 S 1426 720, 1700 404"
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="4"
          strokeDasharray={`${route * 1680} 1680`}
          strokeLinecap="round"
        />
        <circle cx="260" cy="760" r="8" fill={COLORS.gold} opacity="0.72" />
        <circle cx="1700" cy="404" r="8" fill={COLORS.gold} opacity="0.54" />
      </svg>
      <LogisticsIcon kind="air" left={1186} top={160} size={210} opacity={0.62} />
      <LogisticsIcon kind="sea" left={1426} top={356} size={230} opacity={0.64} />
      <LogisticsIcon kind="globe" left={1028} top={454} size={150} opacity={0.34} />
      <div style={safeTextStyle}>
        <div style={smallCaps}>International Express</div>
        <div style={{ ...titleStyle, marginTop: 20 }}>Air Freight</div>
        <div style={{ ...titleStyle, color: COLORS.washiDim, fontSize: 54, marginTop: 8 }}>
          Sea Freight
        </div>
        <div style={{ ...bodyStyle, marginTop: 20 }}>
          Route planning based on shipment conditions.
        </div>
      </div>
    </div>
  );
};
