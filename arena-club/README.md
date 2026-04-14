# Arena Club — Landing Page

Landing page completa para o **Arena Club**, um clube esportivo premium com Tênis, Beach Tennis, Pilates, Academia e mais.

## Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02)
![Lucide](https://img.shields.io/badge/Lucide-React-F56565)

## Como rodar

```bash
npm install
npm run dev
```

Disponível em `http://localhost:5173`.

## Estrutura

```
src/
├── hooks/
│   └── useSectionReveal.js   # Intersection Observer p/ animações de scroll
├── components/
│   ├── Header.jsx             # Header fixo, blur → sólido ao rolar, hamburguer mobile
│   ├── Hero.jsx               # Fundo parallax (GSAP), entrada CSS, stats bar
│   ├── Activities.jsx         # Grid de 7 modalidades, hover com linha animada
│   ├── Quiz.jsx               # Quiz interativo com resultado personalizado
│   ├── About.jsx              # Imagem rotacionada, contador via requestAnimationFrame
│   ├── Testimonials.jsx       # Depoimentos em fundo escuro
│   ├── FAQ.jsx                # Accordion, layout duas colunas
│   ├── Contact.jsx            # Formulário com validação, layout duas colunas
│   └── Footer.jsx             # Links, redes sociais, copyright
├── App.jsx
├── main.jsx
└── index.css                  # Keyframes CSS, fade-in-section, faq-body, quiz-step
```

## Decisões técnicas

**Componentização por seção** — cada seção é independente para facilitar manutenção e leitura.

**CSS puro para animações de entrada** — as classes `.hero-1~5` usam `@keyframes` com `animation-delay`. Isso garante que os elementos entram mesmo se o GSAP não inicializar.

**GSAP exclusivamente para parallax** — `gsap.to(bgRef, { yPercent })` com `ScrollTrigger.scrub` no Hero. Sem `gsap.from({ opacity: 0 })` em lugar nenhum — elimina o risco de elementos ficarem invisíveis.

**`useSectionReveal` hook** — encapsula o `IntersectionObserver` reutilizável. Cada seção chama `const ref = useSectionReveal()` e marca seus filhos com `.fade-in-section` + classes `.delay-*` para escalonamento.

**Contador com `requestAnimationFrame`** — a animação dos números em About não depende do GSAP. Usa `performance.now()` + easing cúbico manual.

**Quiz com `useState` puro** — 4 estados simples (`step`, `selected`, `answers`, resultado calculado). O resultado usa um algoritmo de maioria com desempate baseado na resposta da pergunta 3.

**FAQ accordion em CSS** — `max-height: 0 → 300px` com `transition`. Controlado por uma classe `.open` adicionada via `useState`. Zero JS para a animação em si.

**Toques de design editorial** — palavras gigantes em opacidade baixa (`text-[20vw] opacity-[0.03]`) atrás das seções, imagem rotacionada `-2deg` com acento colorido por baixo, linha decorativa vertical no Hero, barra de stats no rodapé do Hero.

**Mobile first** — todos os layouts usam breakpoints `sm:`, `md:`, `lg:` do Tailwind. Activities tem scroll horizontal com snap no mobile.
