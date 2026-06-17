import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.logoArea}>
        <h1 className={styles.logo}>APAC</h1>
        <span className={styles.subtitulo}>
          Environmental Monitoring Platform
        </span>
      </div>

      <div className={styles.creditos}>
        Developed by GPADS Tech
      </div>

    </header>
  )
}

export default Header