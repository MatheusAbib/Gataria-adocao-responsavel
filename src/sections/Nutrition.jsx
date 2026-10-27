
import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Nutrition.module.css";

const guidelines = [
  {
    number: "01",
    title: "Ração seca ou sachê: qual escolher?",
    description:
      "As duas opções podem fazer parte de uma dieta adequada. Confira se o alimento é completo e balanceado para a fase de vida do gato. O sachê também contribui para a ingestão de água por conter mais umidade.",
  },
  {
    number: "02",
    title: "Gato pode beber leite?",
    description:
      "O leite de vaca não é necessário e pode causar diarreia e desconforto digestivo em muitos gatos adultos, que digerem mal a lactose. Deixe água fresca disponível e não substitua a água por leite.",
  },
  {
    number: "03",
    title: "Quais alimentos são perigosos?",
    description:
      "Cebola, alho, chocolate, bebidas com cafeína e álcool podem intoxicar gatos. Não ofereça restos de comida sem verificar os ingredientes. Se ele ingerir algo potencialmente tóxico, procure atendimento veterinário imediatamente.",
  },
];

export default function Nutrition() {
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  return (
    <section
      className={styles.nutrition}
      id="alimentacao"
      ref={sectionRef}
    >
      <div className={`${styles.heading} reveal`}>
        <p className={styles.eyebrow}>
          <span />
          Guia de alimentação felina
        </p>

        <h2>
          O que vai
          <br />
          no pote do <em className={styles.hand}>seu gato?</em>
        </h2>

        <p className={styles.introduction}>
          Ração, sachê, leite, comida caseira: nem tudo o que parece
          adequado para nós faz bem aos gatos. Veja o que considerar
          antes de escolher o que oferecer.
        </p>
      </div>

      <div className={styles.content}>
        <div className={`${styles.visual} reveal`}>
          <img
            src="https://th.bing.com/th/id/R.3e3bb2d74b66caf8a8edd8b2d078d159?rik=kCZUhYpqOdmVUQ&pid=ImgRaw&r=0"
            alt="Gato observando o ambiente"
            loading="lazy"
          />

          <div className={styles.imageLabel}>
            <span>Antes de oferecer</span>
            <p>Confira o que é seguro para gatos.</p>
          </div>
        </div>

        <div className={styles.guidelines}>
          {guidelines.map((guideline) => (
            <article
              className={`${styles.guideline} reveal`}
              key={guideline.number}
            >
              <span className={styles.number}>{guideline.number}</span>

              <div>
                <h3>{guideline.title}</h3>
                <p>{guideline.description}</p>
              </div>

              <span className={styles.symbol} aria-hidden="true">
                ↗
              </span>
            </article>
          ))}

          <div className={`${styles.notice} reveal`}>
            <span aria-hidden="true">✳</span>
            <p>
              Filhotes, gatos idosos e animais com doenças podem precisar
              de dietas específicas. Não faça mudanças importantes na
              alimentação sem orientação veterinária.
            </p>
          </div>

          <a href="#contato" className={styles.action}>
            Conhecer outras orientações
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
