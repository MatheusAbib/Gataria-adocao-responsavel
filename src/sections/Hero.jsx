import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmartImage from "../components/SmartImage/SmartImage";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.eyebrow}`, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from(`.${styles.titleLine}`, {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.13,
        ease: "power4.out",
        delay: 0.25,
      });

      gsap.from(
        [
          `.${styles.description}`,
          `.${styles.actions}`,
          `.${styles.note}`,
        ],
        {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.65,
        }
      );

      gsap.from(`.${styles.visual}`, {
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from(`.${styles.sticker}`, {
        scale: 0.7,
        rotation: -12,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        delay: 0.9,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="inicio" ref={heroRef}>
      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          <span />
          Adoção responsável, cuidado e conexão
        </p>

        <h1 className={`section-title ${styles.title}`}>
          <span className={styles.titleLine}>Encontre seu</span>
          <span className={styles.titleLine}>
            novo <em className="hand">companheiro.</em>
          </span>
        </h1>

        <p className={styles.description}>
          Conheça gatos que esperam por um lar, entenda as responsabilidades
          da adoção e descubra tudo o que você precisa saber para receber um
          novo felino com segurança, preparo e carinho.
        </p>

        <div className={styles.actions}>
          <a className={styles.primaryAction} href="#adocao">
            Adotar um gato
            <span aria-hidden="true">↗</span>
          </a>

          <a className={styles.secondaryAction} href="#sobre">
            Aprender sobre gatos
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.note}>
          <span className={styles.noteSymbol} aria-hidden="true">{"\u2733\uFE0E"}</span>
          <p>
            Uma adoção consciente,
            <br />
            uma vida inteira de cuidado.
          </p>
        </div>
      </div>

      <div className={styles.visual}>
        <SmartImage
          className={styles.imageFrame}
          src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85"
          alt="Gato observando atentamente o ambiente"
          loading="eager"
          fetchPriority="high"
        />

        <div className={styles.imageCaption}>
          <span>Conheça melhor quem vive com você</span>
        </div>

        <div className={styles.sticker} aria-label="Vida de gato">
          <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
            <defs>
              <path
                id="stickerCircle"
                d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              />
            </defs>
            <text>
              <textPath href="#stickerCircle">
                • VIDA DE GATO • VIDA DE GATO • VIDA DE GATO •
              </textPath>
            </text>
            <path
              className={styles.heart}
              d="M60 79 C53 72 40 63 40 52 C40 42 53 38 60 49 C67 38 80 42 80 52 C80 63 67 72 60 79Z"
            />
          </svg>
        </div>
      </div>

      <a
        className={styles.scrollCue}
        href="#sobre"
        aria-label="Continuar para a próxima seção"
      />
    </section>
  );
}