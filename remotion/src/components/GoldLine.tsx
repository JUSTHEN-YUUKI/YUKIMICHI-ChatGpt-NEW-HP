import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../styles";

type GoldLineProps = {
  delay?: number;
  left?: number;
  top?: number;
  width?: number;
  rotate?: number;
  opacity?: number;
};

export const GoldLine = ({
  delay = 0,
  left = 0,
  top = 0,
  width = 520,
  rotate = 0,
  opacity = 1,
}: GoldLineProps) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 52], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height: 1,
        opacity,
        overflow: "hidden",
        transform: `rotate(${rotate}deg)`,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};
