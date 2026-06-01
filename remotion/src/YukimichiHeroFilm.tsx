import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SnowParticles } from "./components/SnowParticles";
import { Closing } from "./scenes/Closing";
import { Compliance } from "./scenes/Compliance";
import { Logistics } from "./scenes/Logistics";
import { Opening } from "./scenes/Opening";
import { Sapporo } from "./scenes/Sapporo";
import { Sourcing } from "./scenes/Sourcing";
import { COLORS, TIMING, typography } from "./styles";

const sceneStarts = [0, 120, 240, 360, 480, 600];

export const YukimichiHeroProductLogisticsFilm = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, TIMING.totalFrames - 1], [1.05, 1.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pan = interpolate(frame, [0, TIMING.totalFrames - 1], [0, -52], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.navyDeep,
        color: COLORS.washi,
        fontFamily: typography.sans,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("hero-bg.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          transform: `scale(${zoom}) translateX(${pan}px)`,
          filter: "saturate(0.58) contrast(0.92)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(7,17,31,0.96) 0%, rgba(7,17,31,0.88) 38%, rgba(7,17,31,0.64) 72%, rgba(7,17,31,0.82) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 78% 26%, rgba(201,168,76,0.18), transparent 28%), radial-gradient(circle at 18% 92%, rgba(139,30,47,0.18), transparent 28%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 70,
          border: "1px solid rgba(201,168,76,0.14)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.28,
          backgroundImage:
            "linear-gradient(rgba(248,245,239,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(248,245,239,0.025) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          background:
            "repeating-linear-gradient(0deg, transparent 0px, rgba(248,245,239,0.03) 1px, transparent 4px, transparent 10px)",
        }}
      />
      <SnowParticles count={38} opacity={0.3} />

      <Sequence from={sceneStarts[0]} durationInFrames={TIMING.sceneFrames}>
        <Opening />
      </Sequence>
      <Sequence from={sceneStarts[1]} durationInFrames={TIMING.sceneFrames}>
        <Sapporo />
      </Sequence>
      <Sequence from={sceneStarts[2]} durationInFrames={TIMING.sceneFrames}>
        <Sourcing />
      </Sequence>
      <Sequence from={sceneStarts[3]} durationInFrames={TIMING.sceneFrames}>
        <Compliance />
      </Sequence>
      <Sequence from={sceneStarts[4]} durationInFrames={TIMING.sceneFrames}>
        <Logistics />
      </Sequence>
      <Sequence from={sceneStarts[5]} durationInFrames={TIMING.sceneFrames}>
        <Closing />
      </Sequence>

      <div
        style={{
          position: "absolute",
          left: 94,
          top: 82,
          color: COLORS.gold,
          fontSize: 19,
          letterSpacing: 6,
        }}
      >
        YUKIMICHI
      </div>
      <div
        style={{
          position: "absolute",
          left: 94,
          bottom: 82,
          width: 420,
          height: 1,
          background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
          opacity: 0.54,
        }}
      />
    </AbsoluteFill>
  );
};
