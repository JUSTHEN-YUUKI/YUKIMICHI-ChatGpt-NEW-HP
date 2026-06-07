import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {captionTracks, ctaDuration, ctaFrom, mediaScenes, type CaptionTrack, type MediaScene} from './timeline';

export const PROMO_FPS = 30;
export const PROMO_DURATION_FRAMES = 870;

const navyDeep = '#07111f';
const washi = '#f8f5ef';
const washiDim = '#ddd4c3';
const paleGold = '#d8bd72';
const crossfadeFrames = 12;
const odoriTowerFixedScale = 1;
const audioFadeInFrames = 30;
const audioFadeOutStartFrame = PROMO_DURATION_FRAMES - 48;
const audioMaxVolume = 0.36;

const serifStack =
  '"Yu Mincho", "YuMincho", "Noto Serif JP", "Shippori Mincho", "Hiragino Mincho ProN", Georgia, "Times New Roman", serif';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const motionEase = Easing.bezier(0.33, 0, 0.2, 1);
const odoriTowerPanEase = Easing.bezier(0.42, 0, 0.58, 1);

const sceneEnd = (scene: MediaScene) => scene.from + scene.duration;

const sceneActualStart = (scene: MediaScene, index: number) =>
  index === 0 ? scene.from : scene.from - crossfadeFrames;

const sceneOpacity = (frame: number, scene: MediaScene, index: number) => {
  const fadeIn =
    index === 0
      ? 1
      : interpolate(frame, [scene.from - crossfadeFrames, scene.from], [0, 1], clamp);
  const fadeOut = interpolate(frame, [sceneEnd(scene) - crossfadeFrames, sceneEnd(scene)], [1, 0], clamp);

  return Math.min(fadeIn, fadeOut);
};

const captionOpacity = (frame: number, caption: CaptionTrack) => {
  const fadeIn = interpolate(frame, [caption.from, caption.from + 16], [0, 1], clamp);
  const fadeOut = interpolate(
    frame,
    [caption.from + caption.duration - 18, caption.from + caption.duration],
    [1, 0],
    clamp,
  );

  return Math.min(fadeIn, fadeOut);
};

const BaseAtmosphere = () => (
  <AbsoluteFill style={{backgroundColor: navyDeep}}>
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 35%, rgba(216,189,114,0.09), transparent 34%), linear-gradient(180deg, rgba(7,17,31,0.1), rgba(7,17,31,0.55))',
      }}
    />
  </AbsoluteFill>
);

const ReadabilityOverlay = () => (
  <AbsoluteFill
    style={{
      background:
        'linear-gradient(180deg, rgba(7,17,31,0.05) 0%, rgba(7,17,31,0.02) 42%, rgba(7,17,31,0.28) 100%), linear-gradient(90deg, rgba(7,17,31,0.09) 0%, transparent 24%, transparent 76%, rgba(7,17,31,0.09) 100%)',
    }}
  />
);

const FineFrame = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div
      style={{
        position: 'absolute',
        inset: 46,
        border: '1px solid rgba(216,189,114,0.15)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 98,
        right: 98,
        bottom: 80,
        height: 1,
        backgroundColor: 'rgba(216,189,114,0.18)',
      }}
    />
  </AbsoluteFill>
);

const PromoAudio = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, audioFadeInFrames], [0, audioMaxVolume], clamp);
  const fadeOut = interpolate(frame, [audioFadeOutStartFrame, PROMO_DURATION_FRAMES], [audioMaxVolume, 0], clamp);

  return <Audio src={staticFile('source/northbound-horizon-29s.wav')} volume={Math.min(fadeIn, fadeOut)} />;
};

const SceneMedia = ({scene, index}: {scene: MediaScene; index: number}) => {
  const frame = useCurrentFrame();
  const start = sceneActualStart(scene, index);
  const end = sceneEnd(scene);
  const progress = interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing: motionEase,
  });
  const odoriTowerPanProgress =
    scene.id === 'odori-tv-tower'
      ? interpolate(frame, [scene.from, sceneEnd(scene)], [0, 1], {
          ...clamp,
          easing: odoriTowerPanEase,
        })
      : null;
  const opacity = sceneOpacity(frame, scene, index);
  const scale =
    odoriTowerPanProgress === null
      ? interpolate(progress, [0, 1], [scene.scaleFrom, scene.scaleTo], clamp)
      : odoriTowerFixedScale;
  const translateX =
    odoriTowerPanProgress === null
      ? interpolate(progress, [0, 1], [scene.panXFrom ?? 0, scene.panXTo ?? 0], clamp)
      : 0;
  const translateY =
    odoriTowerPanProgress === null
      ? interpolate(progress, [0, 1], [scene.panYFrom ?? 0, scene.panYTo ?? 0], clamp)
      : 0;
  const objectPositionY =
    odoriTowerPanProgress === null
      ? null
      : interpolate(odoriTowerPanProgress, [0, 1], [58, 15], clamp);
  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: objectPositionY === null ? scene.objectPosition ?? '50% 50%' : `50% ${objectPositionY}%`,
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
    transformOrigin: 'center center',
    filter: 'saturate(0.92) contrast(1.02) brightness(0.99)',
  };

  return (
    <Sequence from={start} durationInFrames={end - start} premountFor={30}>
      <AbsoluteFill style={{backgroundColor: navyDeep, opacity}}>
        {scene.mediaType === 'video' ? (
          <OffthreadVideo
            src={staticFile(`source/${scene.file}`)}
            trimBefore={scene.trimBeforeFrames ?? 0}
            muted
            style={mediaStyle}
          />
        ) : (
          <Img src={staticFile(`source/${scene.file}`)} style={mediaStyle} />
        )}
        <ReadabilityOverlay />
      </AbsoluteFill>
    </Sequence>
  );
};

const Caption = ({caption}: {caption: CaptionTrack}) => {
  const frame = useCurrentFrame();
  const opacity = captionOpacity(frame, caption);
  const isAirCargoCaption = caption.id === 'global-buyers';
  const isBrandCaption = caption.id === 'brand';
  const lift = interpolate(frame, [caption.from, caption.from + 18], [8, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const mainColor = caption.tone === 'gold' ? paleGold : washi;
  const captionBottom = isBrandCaption ? 154 : 148;
  const captionShadow = isAirCargoCaption
    ? '0 12px 30px rgba(0,0,0,0.66), 0 4px 12px rgba(0,0,0,0.58), 0 0 2px rgba(7,17,31,0.92)'
    : '0 8px 24px rgba(0,0,0,0.42), 0 2px 7px rgba(0,0,0,0.36)';

  return (
    <Sequence from={caption.from} durationInFrames={caption.duration} premountFor={30}>
      <div
        style={{
          position: 'absolute',
          left: 190,
          right: 190,
          bottom: captionBottom,
          textAlign: 'center',
          opacity,
          transform: `translateY(${lift}px)`,
          fontFamily: serifStack,
          textShadow: captionShadow,
          whiteSpace: 'normal',
          wordBreak: 'keep-all',
          overflowWrap: 'normal',
        }}
      >
        {isAirCargoCaption ? (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 1120,
              height: 220,
              transform: 'translate(-50%, -45%)',
              background:
                'radial-gradient(ellipse at center, rgba(4,8,14,0.44) 0%, rgba(4,8,14,0.26) 44%, rgba(4,8,14,0.08) 72%, transparent 100%)',
              filter: 'blur(2px)',
              pointerEvents: 'none',
            }}
          />
        ) : null}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            color: mainColor,
            fontSize: isBrandCaption ? 46 : 54,
            lineHeight: isBrandCaption ? 1.1 : 1.14,
            fontWeight: 400,
            letterSpacing: isBrandCaption ? 1.4 : 2.6,
          }}
        >
          {caption.ja}
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: isBrandCaption ? 14 : 16,
            color: washiDim,
            fontSize: isBrandCaption ? 30 : 31,
            lineHeight: 1.22,
            fontWeight: 400,
            letterSpacing: isBrandCaption ? 1.2 : 1.6,
          }}
        >
          {caption.en}
        </div>
      </div>
    </Sequence>
  );
};

const CtaScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [ctaFrom - crossfadeFrames, ctaFrom + 10], [0, 1], clamp);
  const lift = interpolate(frame, [ctaFrom - 4, ctaFrom + 18], [12, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Sequence from={ctaFrom - crossfadeFrames} durationInFrames={ctaDuration + crossfadeFrames} premountFor={30}>
      <AbsoluteFill style={{backgroundColor: navyDeep, opacity}}>
        <BaseAtmosphere />
        <FineFrame />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${lift}px)`,
            textAlign: 'center',
            fontFamily: serifStack,
          }}
        >
          <Img
            src={staticFile('yukimichi-snowpath-japan-logo.png')}
            style={{
              width: 690,
              height: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'screen',
              filter: 'drop-shadow(0 18px 32px rgba(0,0,0,0.34))',
            }}
          />
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export const YukimichiSitePromo = () => {
  return (
    <AbsoluteFill style={{backgroundColor: navyDeep, overflow: 'hidden'}}>
      <PromoAudio />
      <BaseAtmosphere />
      {mediaScenes.map((scene, index) => (
        <SceneMedia key={scene.id} scene={scene} index={index} />
      ))}
      <CtaScene />
      {captionTracks
        .filter((caption) => caption.id !== 'quote')
        .map((caption) => (
          <Caption key={caption.id} caption={caption} />
        ))}
      <FineFrame />
    </AbsoluteFill>
  );
};
