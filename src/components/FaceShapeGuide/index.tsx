import type { ReactElement } from 'react'
import styles from './FaceShapeGuide.module.css'
import { FACE_SHAPES, type FaceShape, type ShapeIcon } from './data'

const shapeIconClass: Record<ShapeIcon, string> = {
  triangle: styles.triangle,
  'tall-oval': styles.tallOval,
  circle: styles.circle,
  square: styles.square,
  rectangle: styles.rectangle,
}

function renderFaceDetails(): ReactElement {
  return (
    <>
      <path className={styles.faceDetail} d="M36 56h8M56 56h8" />
      <path className={styles.faceDetail} d="M50 64v16" />
      <path className={styles.faceDetail} d="M42 92q8 6 16 0" />
    </>
  )
}

function FaceIllustration({ shape }: { shape: FaceShape }) {
  return (
    <svg className={styles.faceSvg} viewBox="0 0 100 120" aria-hidden="true">
      <path className={styles.faceMain} d={shape.facePath} />
      {renderFaceDetails()}
    </svg>
  )
}

function GlassesFrame({ path }: { path: string }) {
  return (
    <svg className={styles.glassSvg} viewBox="0 0 100 52" aria-hidden="true">
      <ellipse className={styles.glassLine} cx="30" cy="26" rx="14" ry="10" />
      <ellipse className={styles.glassLine} cx="70" cy="26" rx="14" ry="10" />
      <path className={styles.glassLine} d={path} />
      <path className={styles.glassLine} d="M2 24L10 26 M90 26L98 24" />
    </svg>
  )
}

const FaceShapeGuide = () => {
  const rows = 4

  return (
    <section className={styles.section} aria-labelledby="face-shape-guide-title">
      <div className={styles.head}>
        <h2 id="face-shape-guide-title" className={styles.title}>
          Yüz Şekline Göre Güneş Gözlüğü
        </h2>
        <p className={styles.subtitle}>Aşağıdaki şema, yüz formuna göre önerilen çerçeve tiplerini görsel olarak özetler.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.topRow}>
          {FACE_SHAPES.map((shape) => (
            <article key={shape.id} className={styles.topCol}>
              <FaceIllustration shape={shape} />
              <span className={`${styles.shapeIcon} ${shapeIconClass[shape.shapeIcon]}`} />
              <div className={styles.label}>{shape.labelTR}</div>
            </article>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomWrap}>
          <div className={styles.grid}>
            {Array.from({ length: rows }).flatMap((_, rowIndex) =>
              FACE_SHAPES.map((shape) => {
                const frame = shape.recommendedFrames[rowIndex]
                return (
                  <div className={styles.cell} key={`${shape.id}-${frame.id}`}>
                    <GlassesFrame path={frame.svgPath} />
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaceShapeGuide
