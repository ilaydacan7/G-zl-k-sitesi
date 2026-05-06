export type ShapeIcon = 'triangle' | 'tall-oval' | 'circle' | 'square' | 'rectangle'

export interface FrameStyle {
  id: string
  name: string
  svgPath: string
}

export interface FaceShape {
  id: string
  labelTR: string
  shapeIcon: ShapeIcon
  facePath: string
  recommendedFrames: FrameStyle[]
}

const frames = {
  catEye: { id: 'cat-eye', name: 'Cat-eye', svgPath: 'M12 28 C22 16, 36 14, 50 22 M50 22 C64 14, 78 16, 88 28 M24 28 H40 M60 28 H76' },
  butterfly: { id: 'butterfly', name: 'Butterfly', svgPath: 'M10 26 C20 12, 38 12, 48 24 M52 24 C62 12, 80 12, 90 26 M24 26 H38 M62 26 H76' },
  rimlessRound: { id: 'rimless-round', name: 'Rimless Round', svgPath: 'M18 26 H42 M58 26 H82 M50 26 H52' },
  ovalThin: { id: 'oval-thin', name: 'Oval Thin', svgPath: 'M14 26 C14 18, 24 14, 34 18 C42 20, 42 32, 34 34 C24 38, 14 34, 14 26 M58 26 C58 18, 68 14, 78 18 C86 20, 86 32, 78 34 C68 38, 58 34, 58 26 M42 26 H58' },
  classicRound: { id: 'classic-round', name: 'Classic Round', svgPath: 'M18 26 H42 M58 26 H82 M42 26 H58' },
  aviator: { id: 'aviator', name: 'Aviator', svgPath: 'M14 22 H86 M18 24 C18 14, 32 14, 38 22 C44 30, 38 38, 28 36 C20 34, 18 30, 18 24 M62 24 C62 14, 76 14, 82 22 C88 30, 82 38, 72 36 C64 34, 62 30, 62 24' },
  rectangleWide: { id: 'rectangle-wide', name: 'Rectangle Wide', svgPath: 'M10 20 H44 V34 H10 Z M56 20 H90 V34 H56 Z M44 27 H56' },
  square: { id: 'square', name: 'Square', svgPath: 'M14 20 H42 V36 H14 Z M58 20 H86 V36 H58 Z M42 27 H58' },
  rectangle: { id: 'rectangle', name: 'Rectangle', svgPath: 'M12 21 H44 V35 H12 Z M56 21 H88 V35 H56 Z M44 28 H56' },
  browline: { id: 'browline', name: 'Browline', svgPath: 'M10 20 H44 M56 20 H90 M12 22 H44 V34 H12 Z M56 22 H88 V34 H56 Z M44 27 H56' },
  wayfarerWide: { id: 'wayfarer-wide', name: 'Wayfarer Wide', svgPath: 'M8 22 H44 V36 H8 Z M56 22 H92 V36 H56 Z M44 29 H56' },
  angularWrap: { id: 'angular-wrap', name: 'Angular Wrap', svgPath: 'M10 24 L24 18 H44 L38 34 H18 Z M56 18 H76 L90 24 L82 34 H62 Z M44 26 H56' },
  roundLarge: { id: 'round-large', name: 'Round Large', svgPath: 'M14 26 H44 M56 26 H86 M44 26 H56' },
  oval: { id: 'oval', name: 'Oval', svgPath: 'M14 26 C14 18, 24 14, 34 18 C42 20, 42 32, 34 34 C24 38, 14 34, 14 26 M58 26 C58 18, 68 14, 78 18 C86 20, 86 32, 78 34 C68 38, 58 34, 58 26 M42 26 H58' },
  rimlessOval: { id: 'rimless-oval', name: 'Rimless Oval', svgPath: 'M16 26 H40 M60 26 H84 M40 26 H60' },
  softRectangle: { id: 'soft-rectangle', name: 'Soft Rectangle', svgPath: 'M12 22 H44 C46 22 46 34 44 34 H12 C10 34 10 22 12 22 Z M56 22 H88 C90 22 90 34 88 34 H56 C54 34 54 22 56 22 Z M44 28 H56' },
  round: { id: 'round', name: 'Round', svgPath: 'M18 26 H42 M58 26 H82 M42 26 H58' },
  rimless: { id: 'rimless', name: 'Rimless', svgPath: 'M16 26 H40 M60 26 H84 M40 26 H60' },
  catEyeSmall: { id: 'cat-eye-small', name: 'Cat-eye Small', svgPath: 'M16 28 C24 20, 34 19, 42 24 M58 24 C66 19, 76 20, 84 28 M28 28 H36 M64 28 H72' },
} as const

export const FACE_SHAPES: FaceShape[] = [
  {
    id: 'kalp',
    labelTR: 'Kalp',
    shapeIcon: 'triangle',
    facePath: 'M50 24 C28 24 12 42 12 66 C12 90 28 104 50 108 C72 104 88 90 88 66 C88 42 72 24 50 24 M50 14 C38 14 24 20 18 34 M50 14 C62 14 76 20 82 34',
    recommendedFrames: [frames.catEye, frames.butterfly, frames.rimlessRound, frames.ovalThin],
  },
  {
    id: 'oval',
    labelTR: 'Oval',
    shapeIcon: 'tall-oval',
    facePath: 'M50 20 C34 20 22 34 22 54 V82 C22 98 34 110 50 112 C66 110 78 98 78 82 V54 C78 34 66 20 50 20',
    recommendedFrames: [frames.classicRound, frames.aviator, frames.rectangleWide, frames.square],
  },
  {
    id: 'yuvarlak',
    labelTR: 'Yuvarlak',
    shapeIcon: 'circle',
    facePath: 'M50 24 C28 24 10 42 10 66 C10 90 28 108 50 108 C72 108 90 90 90 66 C90 42 72 24 50 24',
    recommendedFrames: [frames.rectangle, frames.browline, frames.wayfarerWide, frames.angularWrap],
  },
  {
    id: 'kare',
    labelTR: 'Kare',
    shapeIcon: 'square',
    facePath: 'M28 34 L72 34 L80 58 L74 92 L50 108 L26 92 L20 58 Z',
    recommendedFrames: [frames.roundLarge, frames.oval, frames.rimlessOval, frames.softRectangle],
  },
  {
    id: 'dikdortgen',
    labelTR: 'Dikdörtgen',
    shapeIcon: 'rectangle',
    facePath: 'M50 16 C60 16 66 26 66 44 V84 C66 100 60 110 50 112 C40 110 34 100 34 84 V44 C34 26 40 16 50 16',
    recommendedFrames: [frames.round, frames.oval, frames.rimless, frames.catEyeSmall],
  },
]
