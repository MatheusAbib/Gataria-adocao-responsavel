import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const links = [
  { label: "Comportamentos", href: "#sobre" },
  { label: "Alimentação", href: "#alimentacao" },
  { label: "Raças", href: "#racas" },
  { label: "Adoção", href: "#adocao" },
  { label: "Dúvidas", href: "#duvidas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        let currentSection = "";

        links.forEach(({ href }) => {
          const section = document.querySelector(href);

          if (section && section.getBoundingClientRect().top <= 160) {
            currentSection = href;
          }
        });

        setActiveLink(currentSection);
        ticking = false;
      });
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        menuOpen ? styles.menuOpen : ""
      }`}
    >
      <a
        className={styles.logo}
        href="#inicio"
        aria-label="Gataria — página inicial"
        onClick={closeMenu}
      >
        <img
          className={styles.logoIcon}
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt=""
        />
        <span className={styles.logoText}>
          gataria<span className={styles.logoDot}>.</span>
        </span>
      </a>

      <nav
        id="main-navigation"
        className={`${styles.navigation} ${
          menuOpen ? styles.navigationOpen : ""
        }`}
        aria-label="Navegação principal"
      >
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={activeLink === href ? styles.active : ""}
            aria-current={activeLink === href ? "location" : undefined}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={styles.menuToggle}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </header>
  );
}

