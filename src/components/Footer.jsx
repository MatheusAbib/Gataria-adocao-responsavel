
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.signature}>
        <img
          className={styles.symbol}
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt=""
          aria-hidden="true"
        />

        <h2 className={styles.title}>
          gataria<span>.</span>
        </h2>

        <div className={styles.imageCaption}>
          <span>Universo Felino</span>
        </div>
      </div>

      <span className={styles.copyright}>
        © {currentYear} Gataria
      </span>
    </footer>
  );
}
