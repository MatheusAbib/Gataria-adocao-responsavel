import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import SmartImage from "../SmartImage/SmartImage";
import styles from "./BreedModal.module.css";

const whatsappNumber = "SEUNUMERO";

const moradiaOptions = [
  { label: "Apartamento", value: "Apartamento" },
  { label: "Casa", value: "Casa" },
  { label: "Casa com quintal", value: "Casa com quintal" },
];

const teladaOptions = [
  { label: "Sim", value: "Sim" },
  { label: "Não", value: "Não" },
  { label: "Parcialmente", value: "Parcialmente" },
];

const outrosAnimaisOptions = [
  { label: "Sim", value: "Sim" },
  { label: "Não", value: "Não" },
];

const emptyForm = {
  nome: "",
  email: "",
  whatsapp: "",
  cidade: "",
  idade: "",
  moradia: null,
  telada: null,
  outrosAnimais: null,
  outrosAnimaisDetalhe: "",
  motivo: "",
};

const emptyErrors = {};

function formatWhatsapp(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildWhatsappUrl(breed, form) {
  const message = `Olá! Tenho interesse em adotar ${breed.name}.

Nome: ${form.nome}
E-mail: ${form.email}
WhatsApp: ${form.whatsapp}
Cidade: ${form.cidade}
Idade: ${form.idade}
Moradia: ${form.moradia}
Telada: ${form.telada}
Outros animais: ${form.outrosAnimais}${
    form.outrosAnimais === "Sim" && form.outrosAnimaisDetalhe
      ? ` (${form.outrosAnimaisDetalhe})`
      : ""
  }
Motivo: ${form.motivo}`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function BreedModal({ breed, onClose }) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const toastRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState(emptyErrors);

  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showForm) {
          setShowForm(false);
        } else {
          onClose();
        }
      }

      if (event.key === "Tab") {
        const activeModal = showForm
          ? document.getElementById("breed-form-modal")
          : modalRef.current;

        if (!activeModal) return;

        const focusable = activeModal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (!showForm) {
      closeButtonRef.current?.focus();
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, showForm]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate() {
    const nextErrors = {};

    if (!form.nome.trim()) nextErrors.nome = "Informe seu nome";
    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "E-mail inválido";
    }
    if (!form.whatsapp.trim()) {
      nextErrors.whatsapp = "Informe seu WhatsApp";
    } else if (form.whatsapp.replace(/\D/g, "").length < 10) {
      nextErrors.whatsapp = "WhatsApp incompleto";
    }
    if (!form.cidade.trim()) nextErrors.cidade = "Informe sua cidade";
    if (!form.idade.trim()) {
      nextErrors.idade = "Informe sua idade";
    } else if (Number(form.idade) < 18) {
      nextErrors.idade = "É preciso ter 18 anos ou mais";
    }
    if (!form.moradia) nextErrors.moradia = "Selecione o tipo de moradia";
    if (!form.telada) nextErrors.telada = "Informe se a moradia é telada";
    if (!form.outrosAnimais)
      nextErrors.outrosAnimais = "Informe se tem outros animais";
    if (!form.motivo.trim()) nextErrors.motivo = "Conte o motivo do interesse";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      toastRef.current?.show({
        severity: "error",
        summary: "Campos obrigatórios",
        detail: "Revise os campos destacados antes de enviar.",
        life: 3500,
      });
      return;
    }

    window.open(buildWhatsappUrl(breed, form), "_blank", "noopener,noreferrer");

    toastRef.current?.show({
      severity: "success",
      summary: "Interesse registrado",
      detail: `Abrimos o WhatsApp com sua mensagem sobre ${breed.name}.`,
      life: 3500,
    });

    setShowForm(false);
    setForm(emptyForm);
    setErrors(emptyErrors);
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      if (showForm) {
        setShowForm(false);
      } else {
        onClose();
      }
    }
  }

  return (
    <>
      <Toast ref={toastRef} position="top-right" />

      <div className={styles.backdrop} onClick={handleBackdropClick}>
        <div
          className={styles.modal}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="breed-modal-title"
          aria-describedby="breed-modal-story"
        >
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label="Fechar detalhes"
            onClick={onClose}
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

          <div className={styles.imageColumn}>
            <SmartImage
              className={styles.imageFrame}
              src={`${import.meta.env.BASE_URL}${breed.image.replace(/^\//, "")}`}
              alt={breed.alt}
            />
          </div>

          <div className={styles.content}>
            <span className={styles.statusBadge}>{breed.status}</span>

            <h2 id="breed-modal-title" className={styles.title}>
              {breed.name}
            </h2>

            <p className={styles.meta}>
              <span>{breed.origin}</span>
              <span aria-hidden="true">·</span>
              <span>{breed.sex}</span>
              <span aria-hidden="true">·</span>
              <span>{breed.age}</span>
              <span aria-hidden="true">·</span>
              <span>Porte {breed.size.toLowerCase()}</span>
            </p>

            <div className={styles.badges}>
              <span className={styles.badge}>
                <span aria-hidden="true">✓</span>
                {breed.castrated ? "Castrado" : "Não castrado"}
              </span>
              <span className={styles.badge}>
                <span aria-hidden="true">✓</span>
                {breed.vaccinated ? "Vacinado" : "Vacinação pendente"}
              </span>
            </div>

            <p id="breed-modal-story" className={styles.story}>
              {breed.story}
            </p>

            <div className={styles.temperament}>
              <span className={styles.temperamentLabel}>Temperamento</span>
              <div className={styles.chips}>
                {breed.temperament.map((tag) => (
                  <span key={tag} className={styles.chip}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Button
              label="Tenho interesse em adotar"
              iconPos="right"
              className={styles.action}
              onClick={() => setShowForm(true)}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div
          className={styles.formBackdrop}
          onClick={handleBackdropClick}
        >
          <div
            id="breed-form-modal"
            className={styles.formModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="breed-form-title"
          >
            <button
              type="button"
              className={styles.close}
              aria-label="Voltar para os detalhes"
              onClick={() => setShowForm(false)}
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

            <div className={styles.formSide}>
              <SmartImage
                className={styles.formSideImage}
                src={`${import.meta.env.BASE_URL}${breed.image.replace(/^\//, "")}`}
                alt={breed.alt}
              />
              <div className={styles.formSideInfo}>
                <span className={styles.statusBadge}>{breed.status}</span>
                <h3 className={styles.formSideTitle}>{breed.name}</h3>
                <p className={styles.formSideMeta}>
                  {breed.origin} · {breed.sex} · {breed.age}
                </p>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <h2 id="breed-form-title" className={styles.formTitle}>
                Formulário de interesse
              </h2>
              <p className={styles.formIntro}>
                Preencha os dados abaixo para conversarmos sobre a adoção de{" "}
                {breed.name}.
              </p>

              <div className={styles.field}>
                <label htmlFor="field-nome">Nome completo</label>
                <InputText
                  id="field-nome"
                  value={form.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                  placeholder="Ex: Maria Silva"
                  className={errors.nome ? "p-invalid" : ""}
                />
                {errors.nome && (
                  <small className={styles.error}>{errors.nome}</small>
                )}
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="field-email">E-mail</label>
                  <InputText
                    id="field-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="voce@email.com"
                    className={errors.email ? "p-invalid" : ""}
                  />
                  {errors.email && (
                    <small className={styles.error}>{errors.email}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="field-whatsapp">WhatsApp</label>
                  <InputText
                    id="field-whatsapp"
                    value={form.whatsapp}
                    onChange={(e) =>
                      updateField("whatsapp", formatWhatsapp(e.target.value))
                    }
                    placeholder="(11) 99999-9999"
                    className={errors.whatsapp ? "p-invalid" : ""}
                  />
                  {errors.whatsapp && (
                    <small className={styles.error}>{errors.whatsapp}</small>
                  )}
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="field-cidade">Cidade</label>
                  <InputText
                    id="field-cidade"
                    value={form.cidade}
                    onChange={(e) => updateField("cidade", e.target.value)}
                    placeholder="Ex: São Paulo"
                    className={errors.cidade ? "p-invalid" : ""}
                  />
                  {errors.cidade && (
                    <small className={styles.error}>{errors.cidade}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="field-idade">Idade</label>
                  <InputText
                    id="field-idade"
                    type="number"
                    value={form.idade}
                    onChange={(e) => updateField("idade", e.target.value)}
                    placeholder="Ex: 28"
                    className={errors.idade ? "p-invalid" : ""}
                  />
                  {errors.idade && (
                    <small className={styles.error}>{errors.idade}</small>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="field-moradia">Tipo de moradia</label>
                <Dropdown
                  inputId="field-moradia"
                  value={form.moradia}
                  onChange={(e) => updateField("moradia", e.value)}
                  options={moradiaOptions}
                  placeholder="Selecione"
                  appendTo="self"
                  panelClassName="moradia-dropdown-panel"
                  className={errors.moradia ? "p-invalid" : ""}
                />
                {errors.moradia && (
                  <small className={styles.error}>{errors.moradia}</small>
                )}
              </div>

              <div className={styles.field}>
                <span className={styles.radioLabel}>A moradia é telada?</span>
                <div className={styles.radioGroup}>
                  {teladaOptions.map((option) => (
                    <label
                      key={option.value}
                      className={styles.radioOption}
                      htmlFor={`telada-${option.value}`}
                    >
                      <RadioButton
                        inputId={`telada-${option.value}`}
                        name="telada"
                        value={option.value}
                        onChange={(e) => updateField("telada", e.value)}
                        checked={form.telada === option.value}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.telada && (
                  <small className={styles.error}>{errors.telada}</small>
                )}
              </div>

              <div className={styles.field}>
                <span className={styles.radioLabel}>
                  Já tem outros animais em casa?
                </span>
                <div className={styles.radioGroup}>
                  {outrosAnimaisOptions.map((option) => (
                    <label
                      key={option.value}
                      className={styles.radioOption}
                      htmlFor={`outros-${option.value}`}
                    >
                      <RadioButton
                        inputId={`outros-${option.value}`}
                        name="outrosAnimais"
                        value={option.value}
                        onChange={(e) => updateField("outrosAnimais", e.value)}
                        checked={form.outrosAnimais === option.value}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.outrosAnimais && (
                  <small className={styles.error}>{errors.outrosAnimais}</small>
                )}
              </div>

              {form.outrosAnimais === "Sim" && (
                <div className={styles.field}>
                  <label htmlFor="field-outros-detalhe">
                    Quais animais?
                  </label>
                  <InputText
                    id="field-outros-detalhe"
                    value={form.outrosAnimaisDetalhe}
                    onChange={(e) =>
                      updateField("outrosAnimaisDetalhe", e.target.value)
                    }
                    placeholder="Ex: Um cachorro e dois gatos"
                  />
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="field-motivo">
                  Por que quer adotar {breed.name}?
                </label>
                <InputTextarea
                  id="field-motivo"
                  value={form.motivo}
                  onChange={(e) => updateField("motivo", e.target.value)}
                  rows={4}
                  autoResize
                  placeholder="Conte um pouco sobre você e por que quer adotar"
                  className={errors.motivo ? "p-invalid" : ""}
                />
                {errors.motivo && (
                  <small className={styles.error}>{errors.motivo}</small>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  type="button"
                  label="Voltar"
                  severity="secondary"
                  outlined
                  onClick={() => setShowForm(false)}
                />
                <Button type="submit" label="Enviar interesse" icon="pi pi-send" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}