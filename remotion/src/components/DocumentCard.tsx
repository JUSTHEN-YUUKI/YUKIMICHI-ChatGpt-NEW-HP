import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../styles";

type DocumentCardProps = {
  title: string;
  rows?: number;
  left: number;
  top: number;
  delay?: number;
  width?: number;
};

export const DocumentCard = ({
  title,
  rows = 4,
  left,
  top,
  delay = 0,
  width = 330,
}: DocumentCardProps) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame - delay, [0, 32], [0, 1], {
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
        height: 188,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [22, 0])}px)`,
        border: `1px solid ${COLORS.goldSoft}`,
        background: "linear-gradient(150deg, rgba(248,245,239,0.08), rgba(7,17,31,0.76))",
        boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
        padding: 24,
      }}
    >
      <div
        style={{
          color: COLORS.gold,
          fontSize: 18,
          letterSpacing: 3.6,
          marginBottom: 24,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          style={{
            width: index === rows - 1 ? "54%" : `${74 - index * 7}%`,
            height: 3,
            marginBottom: 18,
            background: index === 0 ? COLORS.goldSoft : "rgba(248,245,239,0.18)",
          }}
        />
      ))}
    </div>
  );
};
