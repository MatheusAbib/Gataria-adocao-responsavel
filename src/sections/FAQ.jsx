
import { useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./FAQ.module.css";

const questions = [
  {
    question: "Como saber se meu gato está feliz?",
    answer:
      "Um gato confortável costuma explorar o ambiente, descansar em posições relaxadas, brincar e procurar contato por iniciativa própria. Ronronar ou ficar de barriga para cima, isoladamente, não garante que ele esteja feliz. Observe o conjunto dos sinais e procure um veterinário se houver mudanças persistentes no comportamento, apetite ou disposição.",
  },
  {
    question: "Com que frequência devo levar meu gato ao veterinário?",
    answer:
      "Gatos adultos saudáveis geralmente precisam de pelo menos uma avaliação veterinária por ano. Filhotes, gatos idosos e animais com doenças crônicas podem precisar de consultas mais frequentes. O acompanhamento permite revisar a vacinação, a prevenção de parasitas, a saúde bucal e identificar problemas antes que se agravem.",
  },
  {
    question: "Gatos precisam viver dentro de casa?",
    answer:
      "Manter o gato dentro de casa, em um ambiente seguro e enriquecido, reduz riscos como atropelamentos, brigas, intoxicações e transmissão de doenças. Instale telas de proteção nas janelas, ofereça arranhadores, esconderijos, prateleiras e brincadeiras diárias. Varandas e áreas externas só devem ser acessadas quando houver proteção adequada contra fugas e quedas.",
  },
  {
    question: "É possível ter mais de um gato em casa?",
    answer:
      "Sim, mas a convivência não é garantida e depende da personalidade dos animais e da forma como são apresentados. Comece em ambientes separados, faça a troca gradual de cheiros e permita encontros curtos e supervisionados. Disponibilize recursos separados e, como referência, mantenha uma caixa de areia por gato, mais uma extra, distribuídas pela casa.",
  },
  {
    question: "Como escolher a alimentação ideal?",
    answer:
      "Escolha um alimento completo e balanceado adequado à idade e às necessidades de saúde do gato. Filhotes, adultos e idosos podem ter necessidades nutricionais diferentes. Mantenha água limpa disponível, controle as porções e não ofereça alimentos tóxicos, como cebola, alho e chocolate. Se o gato precisa perder peso ou tem alguma doença, consulte um médico-veterinário antes de mudar a dieta.",
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openQuestion, setOpenQuestion] = useState(0);

  useScrollReveal(sectionRef);

  return (
    <section
      className={styles.faq}
      id="duvidas"
      ref={sectionRef}
    >
      <div className={`${styles.heading} reveal`}>
        <p className={styles.eyebrow}>
          <span />
          Dúvidas sobre gatos
        </p>

        <h2>
          Cuidados e respostas
          <br />
          para a vida com seu <em className={styles.hand}>gato.</em>
        </h2>

        <p className={styles.introduction}>
          Entenda os sinais do seu gato, organize os cuidados preventivos e
          tome decisões mais seguras sobre alimentação e convivência.
        </p>
      </div>

      <div className={styles.questions}>
        {questions.map((item, index) => {
          const isOpen = openQuestion === index;
          const answerId = `faq-answer-${index}`;

          return (
            <article
              className={`${styles.item} ${isOpen ? styles.open : ""} reveal`}
              key={item.question}
            >
              <button
                className={styles.question}
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenQuestion(isOpen ? -1 : index)}
              >
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.questionText}>
                  {item.question}
                </span>

                <span className={styles.toggle} aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                className={styles.answer}
                id={answerId}
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={`${styles.bottomNote} reveal`}>
        <span aria-hidden="true">✳</span>
        <p>
          Dificuldade para urinar, falta de ar ou suspeita de intoxicação
          exigem atendimento veterinário imediato.
        </p>
        <a href="#sobre">
          Explorar comportamento felino <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
