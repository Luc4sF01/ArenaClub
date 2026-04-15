import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // parallax apenas — entrada é feita via CSS keyframes (seguro)
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* imagem escalonada para o parallax não expor bordas */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.18] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920)',
        }}
      />

      {/* gradiente mais opaco à esquerda, transparente à direita */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(8,22,14,0.96) 0%, rgba(26,58,42,0.88) 40%, rgba(26,58,42,0.5) 70%, rgba(26,58,42,0.15) 100%)',
        }}
      />

      {/* glow ambiente — blob radial desfocado que pulsa lentamente */}
      <div
        aria-hidden="true"
        className="absolute left-[15%] top-[25%] w-[580px] h-[380px] rounded-full pointer-events-none select-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(132,204,22,0.13) 0%, transparent 72%)',
          filter: 'blur(48px)',
          animation: 'ambientPulse 7s ease-in-out infinite',
        }}
      />

      {/* textura de grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(132,204,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(132,204,22,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* texto gigante decorativo */}
      <span
        aria-hidden="true"
        className="absolute right-[-3%] bottom-10 text-[22vw] font-extrabold text-white/[0.028] leading-none select-none pointer-events-none uppercase tracking-tighter"
      >
        ARENA
      </span>

      {/* conteúdo alinhado à esquerda */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 w-full pt-24 pb-40">
        <div className="max-w-2xl xl:max-w-3xl">
          {/* badge */}
          <div className="hero-1 inline-flex items-center gap-2.5 border border-white/25 bg-white/8 text-white/90 text-sm font-body font-medium px-4 py-2 rounded-full mb-10 backdrop-blur-sm">
            <span
              className="live-dot w-2 h-2 rounded-full bg-[#84cc16] flex-shrink-0"
              aria-hidden="true"
            />
            <Flame size={14} strokeWidth={2.5} className="text-[#84cc16]" />
            Inauguração em breve
          </div>

          {/* título com linha vertical decorativa */}
          <div className="hero-2 flex items-start gap-5 mb-7">
            <div className="w-[3px] h-20 bg-[#84cc16] mt-1 flex-shrink-0 rounded-full" />
            <h1
              className="font-heading font-extrabold leading-[1.04] tracking-tight"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
            >
              <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-[82px]">
                O seu novo
              </span>
              <span className="block text-[#84cc16] text-5xl sm:text-6xl md:text-7xl lg:text-[82px]">
                clube esportivo
              </span>
              <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-[82px]">
                favorito
              </span>
            </h1>
          </div>

          {/* subtítulo — maior em desktop para melhor leitura */}
          <p className="hero-3 font-body text-white/70 text-xl sm:text-2xl md:text-2xl lg:text-[1.4rem] leading-relaxed mb-11 max-w-xl">
            Tênis, Beach Tennis, Pilates, Academia e muito mais em um único
            lugar
          </p>

          {/* CTAs */}
          <div className="hero-4 flex flex-col sm:flex-row gap-4">
            <a
              href="#atividades"
              className="btn-ripple inline-flex justify-center items-center bg-[#84cc16] hover:bg-[#a3e635] active:scale-95
                         text-[#0f2218] font-heading font-semibold text-base px-9 py-4 rounded-xl
                         transition-all duration-300 hover:shadow-2xl hover:shadow-[#84cc16]/30 hover:-translate-y-0.5"
            >
              Conhecer atividades
            </a>
            <a
              href="#"
              className="btn-ripple inline-flex justify-center items-center border border-white/30 hover:border-white/50
                         bg-white/8 hover:bg-white/15 active:scale-95 text-white font-heading font-semibold
                         text-base px-9 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* linha de acento horizontal — elemento decorativo de corte de seção */}
      <div
        className="absolute bottom-0 inset-x-0 h-[3px] z-20"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #84cc16 30%, #84cc16 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* barra de estatísticas no rodapé do hero */}
      <div className="hero-5 absolute bottom-0 mc-auto inset-x-0 border-t border-white/10 bg-black/25 backdrop-blur-sm ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-5 flex items-center flex-wrap gap-x-10 gap-y-3 ">
          <StatChip number="500+" label="Sócios esperados" />
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <StatChip number="7" label="Modalidades" />
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <StatChip number="1000m²" label="Área esportiva" />
        </div>
      </div>

      {/* indicador de scroll animado */}
      <div className="absolute bottom-24 right-6 hidden lg:flex flex-col items-center gap-3 opacity-40">
        <div className="relative w-[1px] h-14 bg-white/20 overflow-hidden rounded-full">
          <div className="scroll-line absolute inset-x-0 top-0 h-full bg-[#84cc16] rounded-full" />
        </div>
        <span className="text-white/60 text-[9px] font-body tracking-[5px] uppercase rotate-90 origin-center translate-x-[18px]">
          scroll
        </span>
      </div>
    </section>
  );
}

function StatChip({ number, label }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-heading font-bold text-white text-xl sm:text-2xl">
        {number}
      </span>
      <span className="font-body text-white/50 text-xs sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default Hero;
