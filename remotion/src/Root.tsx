import {Composition} from 'remotion';
import {YukimichiSitePromo, PROMO_DURATION_FRAMES, PROMO_FPS} from './promo/YukimichiSitePromo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="YukimichiSitePromo"
      component={YukimichiSitePromo}
      durationInFrames={PROMO_DURATION_FRAMES}
      fps={PROMO_FPS}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
