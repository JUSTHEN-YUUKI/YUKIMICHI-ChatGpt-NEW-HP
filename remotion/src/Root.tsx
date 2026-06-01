import "./index.css";
import { Composition } from "remotion";
import { YukimichiHeroProductLogisticsFilm } from "./YukimichiHeroFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="YukimichiHeroProductLogisticsFilm"
        component={YukimichiHeroProductLogisticsFilm}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
