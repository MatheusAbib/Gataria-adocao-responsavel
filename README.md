
# 🐈 Gataria

**Um espaço dedicado à descoberta, à adoção responsável e à valorização da diversidade felina.**

Gataria é um projeto web desenvolvido para apresentar gatos de maneira acolhedora, moderna e visualmente refinada. A proposta combina uma interface editorial com uma experiência de navegação intuitiva, valorizando as características individuais de cada gato e incentivando a adoção responsável.

O projeto utiliza uma identidade visual leve, tipografia expressiva, imagens em destaque e animações sutis para criar uma experiência agradável tanto em dispositivos desktop quanto em dispositivos móveis.

> 🔗 **Acesse o projeto online:** (https://matheusabib.github.io/Gataria-adote/)
---

## ✨ Funcionalidades

### 🐱 Catálogo de gatos

- Apresentação de gatos em cards com imagens e informações individuais.
- Exibição de nomes, origens, características comportamentais e sexo.
- Organização visual em uma grade responsiva.
- Indicadores numéricos para identificação dos cards.
- Carregamento de imagens com indicador visual.
- Tratamento de falhas no carregamento de imagens.

### 🔎 Pesquisa inteligente

- Pesquisa por nome, raça, origem, personalidade e sexo.
- Busca que ignora diferenças entre letras maiúsculas e minúsculas.
- Pesquisa sem distinção entre letras acentuadas e não acentuadas.
- Indicador de carregamento durante a pesquisa.
- Mensagem personalizada quando nenhum resultado é encontrado.
- Opção para limpar a pesquisa e visualizar novamente todos os gatos.

### 📄 Paginação

- Exibição de até oito gatos por página.
- Navegação entre páginas por botões numéricos e setas.
- Indicação visual da página selecionada.
- Rolagem automática para o início do catálogo após a troca de página.
- Desativação dos controles de navegação quando não há páginas anteriores ou seguintes.

### 🎨 Interface e experiência

- Layout responsivo para diferentes tamanhos de tela.
- Identidade visual com estética editorial e minimalista.
- Tipografia e hierarquia visual cuidadosamente organizadas.
- Animações de entrada e transições suaves.
- Efeitos visuais aplicados às imagens dos gatos.
- Estados de carregamento e mensagens de erro.
- Elementos acessíveis com rótulos e atributos semânticos.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| React | Construção da interface por meio de componentes reutilizáveis. |
| JavaScript (ES6+) | Implementação da lógica, dos eventos e das funcionalidades. |
| Vite | Ambiente de desenvolvimento e ferramenta de build. |
| CSS3 | Estilização, responsividade e animações visuais. |
| GSAP | Criação e controle de animações. |
| ScrollTrigger | Controle de animações associado à rolagem da página. |
| Lenis | Implementação de rolagem suave. |
| React Hooks | Gerenciamento de estado, referências, efeitos e cálculos derivados. |

## 🧠 Destaques técnicos

### Componentização com React

A interface é organizada em componentes reutilizáveis, separando responsabilidades e facilitando a manutenção do código.

O componente de imagem dos gatos, por exemplo, gerencia individualmente os estados de carregamento e falha, enquanto o componente principal controla a pesquisa, a filtragem e a paginação.

### Pesquisa com normalização de texto

A pesquisa utiliza normalização Unicode com `normalize("NFD")` e expressões regulares para remover marcas diacríticas.

Isso permite que termos como `femea` e `fêmea` sejam considerados equivalentes, melhorando a experiência de pesquisa.

### Filtragem e paginação com estado reativo

A filtragem é calculada com `useMemo`, evitando recalcular os resultados quando o termo de pesquisa não muda.

A paginação utiliza o estado do React para determinar os registros exibidos, mantendo a interface sincronizada com os resultados da pesquisa.

### Gerenciamento do ciclo de vida

Os hooks `useEffect`, `useRef` e `useState` são utilizados para controlar estados de interface, referências de elementos, temporizadores e a rolagem após a navegação entre páginas.

### Estilização modular

O uso de CSS Modules permite manter os estilos associados aos respectivos componentes, reduzindo conflitos de nomes e facilitando a evolução da interface.

### Experiência visual

O projeto combina animações, transições, carregamento visual de imagens e rolagem suave para criar uma navegação mais fluida, sem comprometer a organização do conteúdo.


## 📱 Responsividade

A interface adapta a disposição dos cards e dos elementos de navegação de acordo com a largura da tela.

O layout contempla:

- Desktop: grade com múltiplas colunas.
- Tablets: grade adaptada para telas intermediárias.
- Smartphones: disposição otimizada para telas menores.

## ♿ Acessibilidade

O projeto utiliza recursos que contribuem para uma navegação mais acessível, incluindo:

- Elementos HTML semânticos.
- Textos alternativos para imagens.
- Rótulos acessíveis nos campos de pesquisa e nos controles de paginação.
- Atributos ARIA para indicar estados e atualizações de conteúdo.
- Indicadores visuais de carregamento.
- Estados desabilitados para controles indisponíveis.

## 🎯 Objetivos do projeto

O desenvolvimento do Gataria busca aplicar conceitos de desenvolvimento front-end em uma aplicação com identidade visual própria, priorizando:

- Arquitetura baseada em componentes.
- Reutilização e organização de código.
- Manipulação de estado com React.
- Filtragem e paginação de dados.
- Responsividade e acessibilidade.
- Animações e microinterações.
- Qualidade visual e experiência do usuário.
- Organização e manutenção de estilos com CSS Modules.

