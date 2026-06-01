import { useCurrentFrame } from "remotion";

type SnowParticlesProps = {
  count?: number;
  opacity?: number;
};

export const SnowParticles = ({ count = 70, opacity = 0.42 }: SnowParticlesProps) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const x = (index * 137) % 1920;
        const baseY = (index * 89) % 1080;
        const speed = 0.16 + (index % 6) * 0.035;
        const drift = Math.sin((frame + index * 17) / 55) * (10 + (index % 4) * 4);
        const size = 2 + (index % 4) * 0.8;
        const y = (baseY + frame * speed) % 1120;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x + drift,
              top: y - 20,
              width: size,
              height: size,
              borderRadius: 99,
              background: `rgba(248,245,239,${opacity})`,
              boxShadow: "0 0 14px rgba(248,245,239,0.22)",
            }}
          />
        );
      })}
    </>
  );
};
