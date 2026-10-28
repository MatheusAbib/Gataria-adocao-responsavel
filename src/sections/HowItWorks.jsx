import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Interesse",
    description:
      "Escolha o gato que combina com você e preencha o formulário de interesse. Conte um pouco sobre sua rotina, moradia e por que quer adotar.",
  },
  {
    number: "02",
    title: "Conversa",
    description:
      "Entramos em contato pelo WhatsApp para conhecer melhor você, tirar dúvidas e alinhar expectativas sobre a adoção e o cuidado com o gato.",
  },
  {
    number: "03",
    title: "Visita",
    description:
      "Combine de conhecer o gato pessoalmente. É o momento de observar o temperamento, a saúde e a adaptação entre vocês.",
  },
  {
    number: "04",
    title: "Adoção",
    description:
      "Se tudo der certo, você assina o termo de adoção responsável e leva o gato para casa. Continuamos disponíveis para acompanhar a adaptação.",
  },
];

const requirements = [
  "Ser maior de 18 anos",
  "Moradia telada (janelas e varandas)",
  "Termo de adoção assinado",
  "Castração obrigatória (feita pela ONG)",
  "Acompanhamento pós-adoção",
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  return (
    <section
      className={styles.howItWorks}
      id="como-funciona"
      ref={sectionRef}
    >
      <div className={`${styles.heading} reveal`}>
        <p className="eyebrow">
          <span />
          Do interesse ao lar
        </p>

        <h2 className="section-title">
          Como funciona
          <br />
          a <em className="hand">adoção.</em>
        </h2>

        <p className={styles.introduction}>
          Nosso processo é simples, mas leva a sério o bem-estar do gato e a
          preparação de quem adota. Entenda cada etapa antes de se candidatar.
        </p>
      </div>

      <div className={styles.content}>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li className={`${styles.step} reveal`} key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>

              <div className={styles.stepBody}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`${styles.requirements} reveal`}>
          <h3 className={styles.requirementsTitle}>
            Requisitos para adotar
          </h3>

          <ul className={styles.requirementsList}>
            {requirements.map((requirement) => (
              <li className={styles.requirement} key={requirement}>
                <span className={styles.requirementCheck} aria-hidden="true">
                  ✓
                </span>
                <span>{requirement}</span>
              </li>
            ))}
          </ul>

          <a className={styles.action} href="#adocao">
            Ver gatos disponíveis
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}