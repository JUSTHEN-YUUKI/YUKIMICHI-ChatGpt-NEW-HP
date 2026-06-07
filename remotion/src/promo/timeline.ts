export type MediaScene = {
  id: string;
  label: string;
  file: string;
  mediaType: 'video' | 'image';
  from: number;
  duration: number;
  trimBeforeFrames?: number;
  objectPosition?: string;
  scaleFrom: number;
  scaleTo: number;
  panXFrom?: number;
  panXTo?: number;
  panYFrom?: number;
  panYTo?: number;
};

export type CaptionTrack = {
  id: string;
  from: number;
  duration: number;
  ja: string;
  en: string;
  tone?: 'white' | 'gold';
};

export const mediaScenes: MediaScene[] = [
  {
    id: 'odori-tv-tower',
    label: '② 大通・テレビ塔',
    file: 'odori-tv-tower.mp4',
    mediaType: 'video',
    from: 0,
    duration: 102,
    trimBeforeFrames: 90,
    objectPosition: '50% 50%',
    scaleFrom: 1,
    scaleTo: 1.004,
  },
  {
    id: 'sapporo-station',
    label: '① 札幌駅',
    file: 'sapporo-station.mp4',
    mediaType: 'video',
    from: 102,
    duration: 96,
    trimBeforeFrames: 30,
    objectPosition: '50% 50%',
    scaleFrom: 1,
    scaleTo: 1.006,
  },
  {
    id: 'inspection',
    label: '1 検品',
    file: 'inspection.png',
    mediaType: 'image',
    from: 198,
    duration: 96,
    objectPosition: '52% 50%',
    scaleFrom: 1.012,
    scaleTo: 1.024,
    panXFrom: -2,
    panXTo: 2,
  },
  {
    id: 'documentation',
    label: '2 書類確認',
    file: 'documentation.png',
    mediaType: 'image',
    from: 294,
    duration: 96,
    objectPosition: '50% 50%',
    scaleFrom: 1.01,
    scaleTo: 1.022,
    panXFrom: 2,
    panXTo: -2,
  },
  {
    id: 'packing',
    label: '3 梱包・段ボール',
    file: 'packing-boxes.jpg',
    mediaType: 'image',
    from: 390,
    duration: 96,
    objectPosition: '50% 50%',
    scaleFrom: 1.008,
    scaleTo: 1.02,
  },
  {
    id: 'shipping-preparation',
    label: '5 発送準備',
    file: 'shipping-preparation.png',
    mediaType: 'image',
    from: 486,
    duration: 96,
    objectPosition: '50% 50%',
    scaleFrom: 1.01,
    scaleTo: 1.022,
    panXFrom: -2,
    panXTo: 2,
  },
  {
    id: 'air-cargo',
    label: '6 航空貨物',
    file: 'air-cargo.png',
    mediaType: 'image',
    from: 582,
    duration: 102,
    objectPosition: '50% 50%',
    scaleFrom: 1.006,
    scaleTo: 1.018,
  },
  {
    id: 'sea-container-ship',
    label: '7 海上コンテナ船',
    file: 'sea-container-ship.png',
    mediaType: 'image',
    from: 684,
    duration: 108,
    objectPosition: '50% 50%',
    scaleFrom: 1.006,
    scaleTo: 1.018,
    panXFrom: 2,
    panXTo: -2,
  },
];

export const captionTracks: CaptionTrack[] = [
  {
    id: 'hokkaido',
    from: 9,
    duration: 78,
    ja: '北海道・札幌から。',
    en: 'From Sapporo, Hokkaido.',
  },
  {
    id: 'japanese-products',
    from: 111,
    duration: 72,
    ja: '日本の商品を、丁寧に世界へ。',
    en: 'Japanese products, delivered with care.',
    tone: 'gold',
  },
  {
    id: 'inspection-documentation',
    from: 207,
    duration: 168,
    ja: '検品と書類確認を、確実に。',
    en: 'Careful inspection and export documentation.',
  },
  {
    id: 'packing',
    from: 399,
    duration: 72,
    ja: '国際配送に向け、安全に梱包。',
    en: 'Secure packing for international delivery.',
    tone: 'gold',
  },
  {
    id: 'transport',
    from: 495,
    duration: 72,
    ja: '国際宅配便・航空・海上輸送に対応。',
    en: 'Export by courier, air, and sea.',
  },
  {
    id: 'global-buyers',
    from: 594,
    duration: 75,
    ja: '日本の商品と、世界のバイヤーをつなぐ。',
    en: 'Connecting Japanese products with global buyers.',
  },
  {
    id: 'brand',
    from: 696,
    duration: 78,
    ja: 'YUKIMICHI — Export Support from Japan',
    en: 'From Hokkaido to the World.',
    tone: 'gold',
  },
];

export const ctaFrom = 792;
export const ctaDuration = 78;
