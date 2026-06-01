import { interpolate, useCurrentFrame } from "remotion";
import { DocumentCard } from "../components/DocumentCard";
import { GoldLine } from "../components/GoldLine";
import { bodyStyle, safeTextStyle, smallCaps, titleStyle } from "../styles";

export const Compliance = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 28, 98, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: fade }}>
      <DocumentCard title="Invoice" left={1040} top={172} delay={10} />
      <DocumentCard title="Packing List" left={1212} top={328} delay={22} />
      <DocumentCard title="Compliance Check" left={1380} top={484} delay={34} width={380} />
      <GoldLine left={1082} top={754} width={610} delay={36} opacity={0.52} />
      <div style={safeTextStyle}>
        <div style={smallCaps}>Documentation and Compliance Check</div>
        <div style={{ ...titleStyle, marginTop: 24 }}>
          Subject to product, destination and regulations.
        </div>
        <div style={{ ...bodyStyle, marginTop: 20 }}>
          Clear records support transparent export communication.
        </div>
      </div>
    </div>
  );
};
