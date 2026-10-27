
import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Adoption.module.css";

const preparations = [
  {
    number: "01",
    title: "Sua rotina permite ter um gato?",
    description:
      "Gatos precisam de alimentação diária, caixa de areia limpa, brincadeiras e acompanhamento veterinário. Considere também quem cuidará dele durante viagens e ausências prolongadas.",
  },
  {
    number: "02",
    title: "Sua casa está preparada?",
    description:
      "Instale telas de proteção nas janelas e varandas, prepare um espaço tranquilo para a adaptação e disponibilize água, comida, caixa de areia, esconderijos e arranhadores.",
  },
  {
    number: "03",
    title: "Você consegue arcar com os custos?",
    description:
      "Além de ração e areia, inclua no orçamento vacinas, castração, consultas, prevenção de parasitas e possíveis emergências veterinárias.",
  },

];

const whatsappUrl =
  "https://wa.me/SEUNUMERO?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20ado%C3%A7%C3%A3o%20de%20gatos.";

export default function Adoption() {
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  return (
    <section
      className={styles.adoption}
      id="adocao"
      ref={sectionRef}
    >
      <div className={`${styles.imageColumn} reveal`}>
        <div className={styles.imageFrame}>
          <img
            src="https://images.unsplash.com/photo-1597626133663-53df9633b799?auto=format&fit=crop&w=1100&q=85"
            alt="Gato que pode encontrar um novo lar por meio da adoção responsável"
            loading="lazy"
          />
        </div>

        <div className={styles.imageNote}>
          <span aria-hidden="true">✳</span>
          <p>Um novo lar começa com uma escolha responsável.</p>
        </div>

        <span className={styles.imageIndex}>
          Adoção responsável
        </span>
      </div>

      <div className={`${styles.content} reveal`}>
        <p className={styles.eyebrow}>
          <span />
          Quer adotar um gato?
        </p>

        <h2>
          Um novo amigo
          <br />
          pode estar
          <br />
          esperando por <em className={styles.hand}>você.</em>
        </h2>

        <p className={styles.description}>
          Está pensando em adotar? Confira os pontos importantes antes
          de receber um gato em casa e entre em contato pelo WhatsApp
          para conversar sobre o processo de adoção.
        </p>

        {preparations.map((item) => (
          <div className={styles.promise} key={item.number}>
            <span className={styles.promiseIcon}>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

        <a
          href={whatsappUrl}
          className={styles.action}
          target="_blank"
          rel="noopener noreferrer"
        >
          Conversar sobre adoção no WhatsApp
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
