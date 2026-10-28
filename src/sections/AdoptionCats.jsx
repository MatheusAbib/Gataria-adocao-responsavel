import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SmartImage from "../components/SmartImage/SmartImage";
import BreedModal from "../components/BreedModal/BreedModal";
import { cats } from "../data/cats";
import styles from "./AdoptionCats.module.css";

const ITEMS_PER_PAGE = 8;

const sexOptions = [
  { label: "Todos", value: "all" },
  { label: "Macho", value: "Macho" },
  { label: "Fêmea", value: "Fêmea" },
];

const ageOptions = [
  { label: "Todas", value: "all" },
  { label: "Filhote", value: "filhote" },
  { label: "Adulto", value: "adulto" },
  { label: "Idoso", value: "idoso" },
];

const sizeOptions = [
  { label: "Todos", value: "all" },
  { label: "Pequeno", value: "Pequeno" },
  { label: "Médio", value: "Médio" },
  { label: "Grande", value: "Grande" },
];

const statusOptions = [
  { label: "Todos", value: "all" },
  { label: "Disponível", value: "Disponível" },
  { label: "Em processo", value: "Em processo de adoção" },
  { label: "Adotado", value: "Adotado" },
];

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function statusClass(status) {
  return status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function matchesAge(ageMonths, filter) {
  if (filter === "all") return true;
  if (filter === "filhote") return ageMonths <= 12;
  if (filter === "adulto") return ageMonths > 12 && ageMonths <= 96;
  if (filter === "idoso") return ageMonths > 96;
  return true;
}

function getInitialFilters() {
  if (typeof window === "undefined") {
    return {
      search: "",
      sex: "all",
      age: "all",
      size: "all",
      status: "Disponível",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    search: params.get("busca") || "",
    sex: params.get("sexo") || "all",
    age: params.get("idade") || "all",
    size: params.get("porte") || "all",
    status: params.get("status") || "Disponível",
  };
}

const buttonLabel = {
  Disponível: "Conhecer",
  "Em processo de adoção": "Aguardando confirmação",
  Adotado: "Adotado",
};

const buttonLabelMobile = {
  Disponível: "Conhecer",
  "Em processo de adoção": "Aguardando",
  Adotado: "Adotado",
};

const statusLabelMobile = {
  Disponível: "Disponível",
  "Em processo de adoção": "Aguardando",
  Adotado: "Adotado",
};

export default function AdoptionCats() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const listTopRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const pendingScrollRef = useRef(false);

  const initial = useMemo(getInitialFilters, []);

  const [search, setSearch] = useState(initial.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [activeBreed, setActiveBreed] = useState(null);

  const [sexFilter, setSexFilter] = useState(initial.sex);
  const [ageFilter, setAgeFilter] = useState(initial.age);
  const [sizeFilter, setSizeFilter] = useState(initial.size);
  const [statusFilter, setStatusFilter] = useState(initial.status);

  useScrollReveal(sectionRef);

  const hasActiveFilters =
    sexFilter !== "all" ||
    ageFilter !== "all" ||
    sizeFilter !== "all" ||
    statusFilter !== "Disponível";

  function clearFilters() {
    setSexFilter("all");
    setAgeFilter("all");
    setSizeFilter("all");
    setStatusFilter("Disponível");
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    if (search) params.set("busca", search);
    if (sexFilter !== "all") params.set("sexo", sexFilter);
    if (ageFilter !== "all") params.set("idade", ageFilter);
    if (sizeFilter !== "all") params.set("porte", sizeFilter);
    if (statusFilter !== "Disponível") params.set("status", statusFilter);

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}${window.location.hash}`
      : `${window.location.pathname}${window.location.hash}`;

    window.history.replaceState({}, "", newUrl);
  }, [search, sexFilter, ageFilter, sizeFilter, statusFilter]);

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

  const filteredCats = useMemo(() => {
    const query = normalizeText(search);

    return cats.filter((cat) => {
      const matchesQuery =
        query === "" ||
        [
          cat.name,
          cat.origin,
          cat.personality,
          cat.sex,
          cat.age,
        ].some((value) => normalizeText(value).includes(query));

      const matchesSex = sexFilter === "all" || cat.sex === sexFilter;
      const matchesSize = sizeFilter === "all" || cat.size === sizeFilter;
      const matchesStatus =
        statusFilter === "all" || cat.status === statusFilter;
      const matchesAgeValue = matchesAge(cat.ageMonths, ageFilter);

      return (
        matchesQuery &&
        matchesSex &&
        matchesSize &&
        matchesStatus &&
        matchesAgeValue
      );
    });
  }, [search, sexFilter, ageFilter, sizeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredCats.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const visibleCats = filteredCats.slice(
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

  function renderFilterGroup(label, options, activeValue, onChange) {
    return (
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>{label}</span>
        <div className={styles.filterOptions}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.filterChip} ${
                activeValue === option.value ? styles.filterChipActive : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setCurrentPage(1);
              }}
              aria-pressed={activeValue === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={styles.adoption} id="adocao" ref={sectionRef}>
      <div className={`${styles.heading} reveal`}>
        <div>
          <p className="eyebrow">
            <span />
            Cada gato, um jeito de ser
          </p>

          <h2 className="section-title">
            Gatos disponíveis
            <br />
            para <em className="hand">adoção.</em>
          </h2>
        </div>

        <div>
          <p className={styles.introduction}>
            Pelagens, temperamentos e idades diferentes fazem parte da
            diversidade felina. Conheça os gatos disponíveis para adoção da
            Gataria e descubra qual combina com você.
          </p>
        </div>
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
          {filteredCats.length}{" "}
          {filteredCats.length === 1
            ? "gato encontrado"
            : "gatos encontrados"}
        </p>
      </div>

      <div className={`${styles.filters} reveal`}>
        {renderFilterGroup("Sexo", sexOptions, sexFilter, setSexFilter)}
        {renderFilterGroup("Idade", ageOptions, ageFilter, setAgeFilter)}
        {renderFilterGroup("Porte", sizeOptions, sizeFilter, setSizeFilter)}
        {renderFilterGroup("Status", statusOptions, statusFilter, setStatusFilter)}

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => {
              clearFilters();
              setCurrentPage(1);
            }}
          >
            Limpar filtros
          </button>
        )}
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

      {!isSearching && visibleCats.length > 0 && (
        <div
          className={styles.grid}
          ref={gridRef}
          aria-live="polite"
        >
          {visibleCats.map((cat) => {
            const isAvailable = cat.status === "Disponível";
            const isAdopted = cat.status === "Adotado";

            return (
              <article
                className={`${styles.card} ${
                  isAvailable ? "" : styles.cardBlocked
                } reveal`}
                key={cat.name}
              >
                <div className={styles.imageWrapper}>
                  <SmartImage
                    className={styles.imageFrame}
                    src={`${import.meta.env.BASE_URL}${cat.image.replace(/^\//, "")}`}
                    alt={cat.alt}
                  />
                  <span className={styles.number}>{cat.number}</span>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[`status${statusClass(cat.status)}`]
                    }`}
                  >
                    <span className={styles.statusDesktop}>{cat.status}</span>
                    <span className={styles.statusMobile}>
                      {statusLabelMobile[cat.status]}
                    </span>
                  </span>
                  {isAdopted && <span className={styles.adoptedOverlay} />}
                  <span
                    className={`${styles.openButton} ${
                      isAvailable ? "" : styles.openButtonBlocked
                    } ${
                      isAdopted ? styles.openButtonAdopted : ""
                    }`}
                    aria-hidden="true"
                  >
                    <span className={styles.openButtonDesktop}>
                      {buttonLabel[cat.status]}
                    </span>
                    <span className={styles.openButtonMobile}>
                      {buttonLabelMobile[cat.status]}
                    </span>
                    {isAvailable && (
                      <span className={styles.openArrow}>↗</span>
                    )}
                  </span>
                </div>

                {isAvailable ? (
                  <button
                    type="button"
                    className={styles.cardLink}
                    onClick={() => setActiveBreed(cat)}
                    aria-label={`Conhecer ${cat.name}`}
                  />
                ) : (
                  <span
                    className={styles.cardLinkDisabled}
                    aria-label={`${cat.name} — ${buttonLabel[cat.status]}`}
                  />
                )}
              </article>
            );
          })}
        </div>
      )}

      {!isSearching && visibleCats.length === 0 && (
        <div className={styles.emptyState}>
          <span aria-hidden="true">⌕</span>
          <h3>Nenhum gato encontrado</h3>
          <p>
            Tente ajustar a busca ou os filtros para encontrar outros gatos.
          </p>
          <button
            type="button"
            onClick={() => {
              handleSearch("");
              clearFilters();
              setCurrentPage(1);
            }}
          >
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

      <div className={`notice ${styles.note} reveal`}>
        <span aria-hidden="true">{"\u2733\uFE0E"}</span>
        <p>
          Raça não define tudo. Gatos sem raça definida também têm
          histórias, características e personalidades extraordinárias.
        </p>
      </div>

      {activeBreed && (
        <BreedModal
          breed={activeBreed}
          onClose={() => setActiveBreed(null)}
        />
      )}
    </section>
  );
}