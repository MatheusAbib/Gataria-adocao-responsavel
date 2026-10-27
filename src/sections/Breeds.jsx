
import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Breeds.module.css";

const breeds = [
  {
    name: "Frajolinha",
    origin: "Sem raça definida",
    personality: "Brincalhão e companheiro",
    sex: "Fêmea",
    age: "Aproximadamente 1 ano",
    image: "/cats/frajolinha.jpg",
    alt: "Gato doméstico de pelagem bicolor",
    number: "02",
  },
  {
    name: "Siamês",
    origin: "Tailândia",
    personality: "Comunicativo e sociável",
    sex: "Macho",
    age: "Aproximadamente 2 anos",
    image: "/cats/siames.jpg",
    alt: "Gato siamês de pelagem clara e extremidades escuras",
    number: "03",
  },
  {
    name: "Gato preto",
    origin: "Sem raça definida",
    personality: "Afetuoso e observador",
    sex: "Fêmea",
    age: "Aproximadamente 8 meses",
    image: "/cats/gatopreto.jpg",
    alt: "Gato doméstico de pelagem preta",
    number: "04",
  },
  {
    name: "Gato laranjinha",
    origin: "Sem raça definida",
    personality: "Sociável e brincalhão",
    sex: "Macho",
    age: "Aproximadamente 1 ano e 6 meses",
    image: "/cats/laranja.jpg",
    alt: "Gato de pelagem alaranjada",
    number: "05",
  },
  {
    name: "Persa",
    origin: "Pérsia (atual Irã)",
    personality: "Tranquilo e afetuoso",
    sex: "Fêmea",
    age: "Aproximadamente 3 anos",
    image: "/cats/persa.jpg",
    alt: "Gato de pelagem longa e aparência arredondada",
    number: "06",
  },
  {
    name: "Gato cinza",
    origin: "Sem raça definida",
    personality: "Calmo e companheiro",
    sex: "Macho",
    age: "Aproximadamente 2 anos",
    image: "/cats/cinza.jpg",
    alt: "Gato doméstico de pelagem acinzentada",
    number: "08",
  },
  {
    name: "Gato rajado",
    origin: "Sem raça definida",
    personality: "Atento e aventureiro",
    sex: "Fêmea",
    age: "Aproximadamente 6 meses",
    image: "/cats/rajado.jpg",
    alt: "Gato doméstico com pelagem rajada",
    number: "10",
  },
  {
    name: "Gato tricolor",
    origin: "Sem raça definida",
    personality: "Independente e curioso",
    sex: "Fêmea",
    age: "Aproximadamente 1 ano",
    image: "/cats/tricolor.jpg",
    alt: "Gato doméstico de pelagem com três cores",
    number: "11",
  },
  {
    name: "Maine Coon",
    origin: "Estados Unidos",
    personality: "Sociável e brincalhão",
    sex: "Macho",
    age: "Aproximadamente 4 anos",
    image: "/cats/mainecoon.jpg",
    alt: "Gato de porte grande e pelagem longa",
    number: "12",
  },
  {
    name: "Gato de pelo curto",
    origin: "Sem raça definida",
    personality: "Adaptável e sociável",
    sex: "Macho",
    age: "Aproximadamente 1 ano e 6 meses",
    image: "/cats/pelocurto.jpg",
    alt: "Gato doméstico de pelo curto",
    number: "13",
  },
];

const ITEMS_PER_PAGE = 8;

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function BreedImage({ breed }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.imageFrame}>
      {!loaded && !failed && (
        <div
          className={styles.imageLoader}
          role="status"
          aria-label="Carregando imagem"
        >
          <span className={styles.spinner} />
        </div>
      )}

      {failed ? (
        <div className={styles.imageError} role="status">
          Imagem indisponível
        </div>
      ) : (
        <img
          className={`${styles.breedImage} ${loaded ? styles.imageLoaded : ""}`}
          src={breed.image}
          alt={breed.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}

      <span className={styles.number}>{breed.number}</span>
    </div>
  );
}

export default function Breeds() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const listTopRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const pendingScrollRef = useRef(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useScrollReveal(sectionRef);

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!pendingScrollRef.current) return;

    pendingScrollRef.current = false;

    requestAnimationFrame(() => {
      const element = listTopRef.current;

      if (!element) return;

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    });
  }, [currentPage]);

  const filteredBreeds = useMemo(() => {
    const query = normalizeText(search);

    return breeds.filter((breed) =>
      [
        breed.name,
        breed.origin,
        breed.personality,
        breed.sex,
        breed.age,
      ].some((value) => normalizeText(value).includes(query))
    );
  }, [search]);

  const totalPages = Math.ceil(filteredBreeds.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const visibleBreeds = filteredBreeds.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function handleSearch(value) {
    clearTimeout(searchTimeoutRef.current);

    setSearch(value);
    setCurrentPage(1);
    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, 300);
  }

  function changePage(page) {
    if (page < 1 || page > totalPages) return;

    if (page === currentPage) {
      const element = listTopRef.current;

      if (element) {
        const top =
          element.getBoundingClientRect().top +
          window.scrollY -
          100;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }

      return;
    }

    pendingScrollRef.current = true;
    setCurrentPage(page);
  }

  return (
    <section className={styles.breeds} id="racas" ref={sectionRef}>
      <div className={`${styles.heading} reveal`}>
        <div>
          <p className={styles.eyebrow}>
            <span />
            Gatos disponíveis para adoção
          </p>

          <h2>
            Cada gato,
            <br />
            um jeito de <em className={styles.hand}>ser.</em>
          </h2>
        </div>

        <p className={styles.introduction}>
          Pelagens, temperamentos e idades diferentes fazem parte da
          diversidade felina. Conheça os gatos e descubra qual combina
          com você. Cada um tem sua própria personalidade.
        </p>
      </div>

      <div className={`${styles.catalogControls} reveal`}>
        <label className={styles.searchBox}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.2 4.2" />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Pesquisar gato, origem, idade..."
            aria-label="Pesquisar gatos por nome, origem, personalidade, sexo ou idade"
          />

          {search && (
            <button
              className={styles.clearSearch}
              type="button"
              onClick={() => handleSearch("")}
              aria-label="Limpar pesquisa"
            >
              ×
            </button>
          )}
        </label>

        <p className={styles.resultCount} aria-live="polite">
          {filteredBreeds.length}{" "}
          {filteredBreeds.length === 1
            ? "gato encontrado"
            : "gatos encontrados"}
        </p>
      </div>

      <div ref={listTopRef} className={styles.listAnchor} />

      {isSearching && (
        <div
          className={styles.searchLoader}
          role="status"
          aria-live="polite"
        >
          <span className={styles.spinner} />
          <span>Buscando gatos...</span>
        </div>
      )}

      {!isSearching && visibleBreeds.length > 0 && (
        <div
          className={styles.grid}
          ref={gridRef}
          aria-live="polite"
        >
          {visibleBreeds.map((breed) => (
            <article
              className={`${styles.card} reveal`}
              key={breed.name}
            >
              <BreedImage breed={breed} />

              <div className={styles.cardContent}>
                <span className={styles.origin}>{breed.origin}</span>
                <h3>{breed.name}</h3>
                <p>{breed.personality}</p>

                <div className={styles.cardDetails}>
                  <span className={styles.sex}>
                    {breed.sex === "Macho" ? "♂" : "♀"} {breed.sex}
                  </span>

                  <span className={styles.age}>
                    {breed.age}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!isSearching && visibleBreeds.length === 0 && (
        <div className={styles.emptyState}>
          <span aria-hidden="true">⌕</span>
          <h3>Nenhum gato encontrado</h3>
          <p>
            Tente pesquisar por outro nome, origem, personalidade,
            sexo ou idade.
          </p>
          <button type="button" onClick={() => handleSearch("")}>
            Ver todos os gatos
          </button>
        </div>
      )}

      {!isSearching && totalPages > 1 && (
        <nav
          className={styles.pagination}
          aria-label="Paginação dos gatos"
        >
          <button
            className={styles.pageArrow}
            type="button"
            onClick={() => changePage(safePage - 1)}
            disabled={safePage === 1}
            aria-label="Página anterior"
          >
            ←
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              className={`${styles.pageNumber} ${
                safePage === page ? styles.activePage : ""
              }`}
              type="button"
              key={page}
              onClick={() => changePage(page)}
              aria-label={`Página ${page}`}
              aria-current={safePage === page ? "page" : undefined}
            >
              {String(page).padStart(2, "0")}
            </button>
          ))}

          <button
            className={styles.pageArrow}
            type="button"
            onClick={() => changePage(safePage + 1)}
            disabled={safePage === totalPages}
            aria-label="Próxima página"
          >
            →
          </button>
        </nav>
      )}

      <div className={`${styles.note} reveal`}>
        <span aria-hidden="true">✳</span>
        <p>
          Raça não define tudo. Gatos sem raça definida também têm
          histórias, características e personalidades extraordinárias.
        </p>
      </div>
    </section>
  );
}
