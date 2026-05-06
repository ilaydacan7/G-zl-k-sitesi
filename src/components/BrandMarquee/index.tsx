import styles from './BrandMarquee.module.css'
import { brands } from './data'

const loopBrands = [...brands, ...brands]

const fontClassMap = {
  serif: styles.serif,
  script: styles.script,
  sans: styles.sans,
  elegant: styles.elegant,
}

const BrandMarquee = () => {
  return (
    <section className={styles.section} aria-label="Popüler markalar">
      <h2 className={styles.title}>POPÜLER MARKALAR</h2>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {loopBrands.map((brand, index) => (
            <div className={styles.item} key={`${brand.name}-${index}`}>
              <span className={fontClassMap[brand.fontClass]}>{brand.name}</span>
              <span className={styles.separator} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee
