import { Easing, interpolate, useCurrentFrame } from "remotion";
import { GoldLine } from "../components/GoldLine";
import { LogisticsIcon } from "../components/LogisticsIcon";
import { COLORS, bodyStyle, safeTextStyle, smallCaps, titleStyle } from "../styles";

export const Sapporo = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 28, 98, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line = interpolate(frame, [18, 92], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: fade }}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path
          d="M146 802 C 372 670, 562 642, 760 702 S 1108 790, 1380 660 S 1660 486, 1812 546"
          fill="none"
          stroke="rgba(248,245,239,0.12)"
          strokeWidth="3"
        />
        <path
          d="M146 802 C 372 670, 562 642, 760 702 S 1108 790, 1380 660 S 1660 486, 1812 546"
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="4"
          strokeDasharray={`${line * 1740} 1740`}
          strokeLinecap="round"
        />
        <path
          d="M124 848 C 420 770, 690 770, 1004 840 S 1506 860, 1820 740"
          fill="none"
          stroke="rgba(248,245,239,0.08)"
          strokeWidth="2"
        />
      </svg>
      <LogisticsIcon kind="globe" left={1380} top={174} size={210} opacity={0.38} />
      <GoldLine left={1258} top={416} width={410} delay={18} opacity={0.56} />
      <div style={safeTextStyle}>
        <div style={smallCaps}>Japanese Product Sourcing</div>
        <div style={{ ...titleStyle, marginTop: 24 }}>from Sapporo, Hokkaido</div>
        <div style={{ ...bodyStyle, marginTop: 20 }}>
          A quiet northern base for careful export coordination.
        </div>
      </div>
    </div>
  );
};
