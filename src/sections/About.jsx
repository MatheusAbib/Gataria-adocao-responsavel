import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SmartImage from "../components/SmartImage/SmartImage";
import styles from "./About.module.css";

const cats = [
  {
    name: "Irritado ou assustado?",
    category: "Sinais de desconforto",
    description:
      "Orelhas achatadas, corpo tenso e cauda batendo com força podem indicar medo ou irritação. Evite tocar nele e dê espaço para se acalmar.",
    image:
      "https://br.cats.com/wp-content/uploads/2022/07/Their-Ears-Are-Back.jpg",
    alt: "Gato com as orelhas voltadas para trás",
    shape: "arched",
  },
  {
    name: "Relaxado e confortável",
    category: "Sinais de bem-estar",
    description:
      "Corpo solto, olhos semicerrados e postura tranquila costumam indicar conforto. Observe também se ele se aproxima espontaneamente e parece à vontade no ambiente.",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=85",
    alt: "Gato descansando em uma posição confortável",
    shape: "oval",
  },
  {
    name: "Desconfortável ou reservado",
    category: "Respeite o espaço dele",
    description:
      "Esconder-se, afastar-se ou evitar contato pode indicar medo ou estresse, mas alguns gatos também preferem ficar sozinhos. Não force a interação e ofereça um esconderijo seguro.",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=85",
    alt: "Gato observando o ambiente com cautela",
    shape: "sculpted",
  },
  {
    name: "Pode estar doente?",
    category: "Sinais de alerta",
    description:
      "Apatia, perda de apetite e mudanças repentinas de comportamento merecem atenção veterinária. Se o gato tentar urinar e não conseguir, procure atendimento de emergência.",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1000&q=85",
    alt: "Gato em um retrato para ilustrar a observação de sinais de saúde",
    shape: "landscape",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeCat, setActiveCat] = useState(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    if (!activeCat) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveCat(null);
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeCat]);

  const openModal = (event, cat) => {
    triggerRef.current = event.currentTarget;
    setActiveCat(cat);
  };

  return (
    <section className={styles.about} id="sobre" ref={sectionRef}>
      <div className={`${styles.intro} reveal`}>
        <p className="eyebrow">
          <span />
          Um guia sobre o universo felino
        </p>

        <h2 className={`section-title ${styles.title}`}>
          Seu gato faz coisas
          <br />
          que você não <em className="hand">entende?</em>
        </h2>

        <p className={styles.introduction}>
          Por que seu gato se esconde, balança a cauda ou parece mudar de humor
          de repente? O Gataria ajuda você a interpretar os sinais do
          comportamento felino, reconhecer possíveis sinais de alerta e
          entender como respeitar as necessidades do seu companheiro.
        </p>
      </div>

      <div className={styles.story}>
        <div className={`${styles.imageColumn} reveal`}>
          <SmartImage
            className={styles.imageFrame}
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85"
            alt="Gato de pelagem alaranjada com o olhar atento"
          />

          <p className={styles.imageCaption}>
            Orelhas, cauda e postura ajudam a interpretar o comportamento
            felino.
          </p>
        </div>

        <div className={`${styles.textColumn} reveal`}>
          <span className={styles.chapter}>Comportamento felino</span>

          <h3>
            O que seu gato
            <br />
            está tentando <em className="hand">dizer?</em>
          </h3>

          <p>
            <strong>Orelhas para trás ou achatadas:</strong> podem indicar medo,
            desconforto ou irritação. Dê espaço, principalmente se o gato
            também estiver encolhido, rosnando ou tentando se afastar.
          </p>

          <p>
            <strong>Cauda batendo de um lado para o outro:</strong> pode ser
            sinal de agitação ou irritação, especialmente durante o carinho.
            Pare por alguns instantes e veja se ele procura sua mão novamente
            ou prefere ficar sozinho.
          </p>

          <p>
            <strong>Corpo encolhido e escondido:</strong> pode indicar que ele
            está assustado ou quer evitar contato. Se começar a se esconder
            muito mais que o habitual, especialmente com mudanças no apetite ou
            na disposição, procure um veterinário.
          </p>

          <p>
            Nenhum sinal isolado confirma o que o gato sente. Observe o conjunto
            da postura, o ambiente e o comportamento habitual dele.
          </p>
        </div>
      </div>

      <div className={`${styles.behaviorSection} reveal`}>
        <div className={styles.behaviorHeading}>
          <p className="eyebrow">
            <span />
            Aprenda a observar
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {cats.map((cat, index) => (
            <article
              key={cat.name}
              className={`${styles.card} ${styles[cat.shape]}`}
            >
              <SmartImage
                className={styles.cardImage}
                src={cat.image}
                alt={cat.alt}
              />

              <span className={styles.cardOverlay} />

              <span className={styles.cardIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>{cat.category}</span>
                <span className={styles.cardTitle}>{cat.name}</span>
              </div>

              <span className={styles.cardArrow} aria-hidden="true">
                ↗
              </span>

              <div className={styles.cardExplanation}>
                <span className={styles.explanationCategory}>
                  {cat.category}
                </span>
                <span className={styles.explanationTitle}>{cat.name}</span>
                <span className={styles.explanationText}>
                  {cat.description}
                </span>
              </div>

              <button
                type="button"
                className={styles.eyeButton}
                aria-label={`Ver informações: ${cat.name}`}
                onClick={(event) => openModal(event, cat)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2.7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeCat && (
        <div
          className={styles.modalBackdrop}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveCat(null);
            }
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cat-modal-title"
            aria-describedby="cat-modal-description"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.modalClose}
              aria-label="Fechar informações"
              onClick={() => setActiveCat(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <SmartImage
              className={styles.modalImage}
              src={activeCat.image}
              alt={activeCat.alt}
            />

            <div className={styles.modalContent}>
              <span className={styles.modalCategory}>
                {activeCat.category}
              </span>
              <h3 id="cat-modal-title">{activeCat.name}</h3>
              <p id="cat-modal-description">{activeCat.description}</p>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}