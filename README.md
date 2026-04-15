# Arena Club — Landing Page

Landing page completa para o **Arena Club**, um clube esportivo com Tênis, Beach Tennis, Futevôlei, Pickleball, Pilates, Academia e Massagem.

## Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02)
![Lucide](https://img.shields.io/badge/Lucide-React-F56565)

## Como rodar

**Pré-requisitos:** Node.js 18 ou superior.

```bash
# 1. Entrar na pasta do projeto
cd arena-club

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Estrutura

```
arena-club/
├── src/
│   ├── hooks/
│   │   └── useSectionReveal.js    # IntersectionObserver reutilizável p/ scroll reveal
│   ├── components/
│   │   ├── Header.jsx             # Nav fixo, scroll progress bar, active link
│   │   ├── Hero.jsx               # Parallax GSAP, ambient glow, stats bar, badge
│   │   ├── Activities.jsx         # 7 cards com 3D tilt e snap scroll mobile
│   │   ├── Quiz.jsx               # Quiz interativo, 7 resultados, localStorage
│   │   ├── About.jsx              # Efeito texto-atrás-da-imagem, counter RAF
│   │   ├── Testimonials.jsx       # Auto-cycling com dot indicators
│   │   ├── FAQ.jsx                # Accordion CSS, fundo verde limão
│   │   ├── Contact.jsx            # Formulário com validação por campo
│   │   └── Footer.jsx             # Links, redes sociais, copyright
│   ├── App.jsx                    # IntroScreen + MarqueeBand
│   ├── main.jsx
│   └── index.css                  # Keyframes, animações, utilitários CSS
├── tailwind.config.js
└── index.html
```

## Seções

| Seção            | Destaques                                                                             |
| ---------------- | ------------------------------------------------------------------------------------- |
| **Intro Screen** | Splash de carregamento com barra de progresso, fade de saída com scale                |
| **Header**       | Blur → sólido no scroll, progress bar de leitura, active nav via IntersectionObserver |
| **Marquee Band** | Faixa de esportes com scroll infinito CSS, pausa no hover                             |
| **Hero**         | Parallax GSAP, ambient glow pulsante, grid texture, live pulse dot, scroll indicator  |
| **Activities**   | 3D perspective tilt no hover, shimmer sweep, watermark numérico por card              |
| **Quiz**         | 4 perguntas, 7 resultados, algoritmo de maioria, Web Share API, localStorage          |
| **About**        | Foto com palavra "ARENA" em z-index atrás, heading emergindo do gradiente             |
| **Testimonials** | Auto-cycling a cada 3.5s, pausa no hover, pill dots, WCAG 2.2.2                       |
| **FAQ**          | Fundo verde limão, accordion via `max-height` CSS, zero JS na animação                |
| **Contact**      | Validação por campo, estado de sucesso, layout duas colunas                           |
| **Footer**       | Links de navegação, redes sociais                                                     |

## Decisões técnicas

O projeto prioriza três pilares: **performance** (animações via GPU, sem reflow), **segurança de renderização** (CSS garante visibilidade mesmo se JS falhar) e **acessibilidade** (WCAG, semântica, `prefers-reduced-motion`). Abaixo as principais escolhas e suas justificativas.

**Tela de introdução com 3 estados** — `'visible'` → `'hiding'` → `'gone'`. Dois `setTimeout` no `useEffect` controlam as transições. Barra de progresso usa `transform: scaleX()` em vez de `width` para evitar reflow. Elemento removido do DOM após o fade.

**GSAP exclusivamente para parallax** — `gsap.to(bgRef, { yPercent: 22, scrub: 1.5 })` no Hero. Nenhum `gsap.from({ opacity: 0 })` em lugar nenhum, eliminando o risco de elementos ficarem invisíveis caso a biblioteca não inicialize.

**CSS puro para animações de entrada** — `.hero-1~5` usam `@keyframes heroFadeUp` com `animation-fill-mode: both`. Funciona independente do GSAP.

**`useSectionReveal` hook** — encapsula `IntersectionObserver`. Cada seção chama `const ref = useSectionReveal()` e marca filhos com `.fade-in-section`. Adiciona `.visible` ao entrar na viewport e para de observar o elemento (`unobserve`).

**Active nav link** — segundo `IntersectionObserver` com `rootMargin: '-40% 0px -40% 0px'`. Detecta qual seção ocupa o centro da viewport e atualiza o link ativo com underline animado.

**3D tilt nos cards** — `onMouseMove` calcula a posição relativa do mouse dentro do card (`clientX - rect.left) / width - 0.5`) e aplica `perspective(700px) rotateX() rotateY()`. Reset suave no `onMouseLeave` com `transition: 0.45s`. `will-change: transform` para compositing na GPU.

**Efeito texto-atrás-da-imagem** — palavra decorativa "ARENA" em `z-[1]`, foto em `z-[2]` cobrindo o centro, heading real em `z-[5]` com `-mt-20` emergindo do gradiente da base da foto.

**Contador com `requestAnimationFrame`** — animação dos números em About usa `performance.now()` + easing cúbico manual `1 - Math.pow(1 - progress, 3)`. Ativado por `IntersectionObserver` no elemento do número.

**Quiz com localStorage** — lazy initializer no `useState` lê o storage no mount. Se há resultado salvo, inicializa em `step: 4` direto. `try/catch` protege contra contextos com storage bloqueado.

**Web Share API** — `navigator.share()` no resultado do quiz com feature detection (`typeof navigator.share === 'function'`). Abre o sheet nativo de compartilhamento do SO. Zero dependências.

**FAQ accordion em CSS** — `max-height: 0 → 300px` com `transition`. Controlado por classe `.open` via `useState`. Zero JS para a animação em si.

**Separação de layers nos Testimonials** — wrapper `.fade-in-section` separado do div interativo. Evita conflito entre `transform: translateY()` do reveal CSS e o `translate-y-1` do estado ativo.

**Marquee CSS** — `@keyframes marquee` com `translateX(-50%)`. Itens duplicados para loop seamless. `animation-play-state: paused` no hover via `.marquee-wrap:hover .marquee-track`.

**`prefers-reduced-motion`** — desativa todas as animações CSS para usuários com "Reduzir movimento" ativo no sistema. WCAG 2.1 SC 2.3.3.

**`scroll-margin-top: 78px`** — offset do header fixo em todas as `section[id]`. Sem isso as seções ficam escondidas atrás do nav ao clicar nos links de navegação.

**`::selection` customizada** — `background: #84cc16; color: #0f2218`. Branding que chega até a seleção nativa de texto do browser.

**`will-change: transform`** — aplicado nos elementos com animação contínua para alocar layer na GPU e evitar jank.

**Mobile first** — todos os layouts usam breakpoints `sm:`, `md:`, `lg:` do Tailwind. Activities tem scroll horizontal com `snap-x snap-mandatory` no mobile.
