import { useEffect, useRef } from 'react'
import { Users, Trophy, MapPin } from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const stats = [
  { icon: Users,  end: 500,  suffix: '+',  label: 'Sócios esperados' },
  { icon: Trophy, end: 7,    suffix: '',   label: 'Modalidades'      },
  { icon: MapPin, end: 1000, suffix: 'm²', label: 'Área esportiva'   },
]

function About() {
  const ref = useSectionReveal()

  return (
    <section ref={ref} id="sobre" className="bg-white">

      {/*
        ── Efeito texto-atrás-da-imagem ──
        A palavra "ARENA" fica em z-1 (atrás). A imagem em z-2 cobre o centro.
        O topo e a base das letras ficam visíveis ACIMA e ABAIXO da foto.
        O heading real emerge com -mt-20, saindo da base do gradiente da imagem.
      */}
      <div className="fade-in-section relative">

        {/* bloco da imagem */}
        <div className="relative h-[62vh] min-h-[380px] overflow-hidden">

          {/* palavra decorativa ATRÁS da imagem — z-1 */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-extrabold
                       uppercase leading-none tracking-tighter text-white/[0.09]
                       select-none pointer-events-none z-[1] whitespace-nowrap"
            style={{ fontSize: 'clamp(100px, 18vw, 260px)' }}
          >
            ARENA
          </span>

          {/* foto — z-2, cobre o miolo da palavra decorativa */}
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
            alt="Instalações do Arena Club"
            className="absolute inset-0 w-full h-full object-cover z-[2] scale-[1.04]"
            loading="lazy"
          />

          {/* overlay: topo escuro, base funde em branco */}
          <div
            className="absolute inset-0 z-[3] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,34,24,0.55) 0%, rgba(15,34,24,0.15) 45%, rgba(255,255,255,0.92) 100%)',
            }}
          />

          {/* eyebrow no topo da imagem */}
          <div className="absolute top-10 inset-x-0 z-[4] flex justify-center">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
              <span className="font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px]">
                Sobre nós
              </span>
              <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
            </div>
          </div>
        </div>

        {/* heading que "emerge" da base da imagem — puxa -mt-20 para dentro do gradiente */}
        <div className="relative z-[5] -mt-20 text-center px-4">
          <h2
            className="font-heading font-extrabold text-[#1a3a2a] leading-[1.05] tracking-tight
                       text-4xl sm:text-5xl md:text-6xl lg:text-[72px]"
          >
            Mais que um clube,
            <br />
            <span className="text-[#84cc16] italic">uma comunidade</span>
          </h2>
        </div>
      </div>

      {/* corpo de texto centralizado */}
      <div className="fade-in-section delay-200 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 text-center">
        <p className="font-body text-gray-500 text-lg md:text-xl leading-relaxed mb-5">
          O Arena Club nasceu para reunir em um único espaço o melhor do esporte,
          bem-estar e convivência. Um ambiente onde atletas experientes e iniciantes
          se encontram, evoluem e constroem laços duradouros.
        </p>
        <p className="font-body text-gray-500 text-lg md:text-xl leading-relaxed">
          Instalações profissionais, academia completa, estúdio de Pilates e área
          de recuperação — tudo integrado em um espaço moderno, pensado para quem
          leva a qualidade de vida a sério.
        </p>
      </div>

      {/* cards de estatísticas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              end={s.end}
              suffix={s.suffix}
              label={s.label}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, end, suffix, label, delay }) {
  const numRef = useRef(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const duration = 1800
        const start    = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased    = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.round(eased * end) + suffix
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, suffix])

  return (
    <div
      className="fade-in-section relative bg-[#1a3a2a] rounded-2xl p-8 text-center overflow-hidden
                 hover:bg-[#2a5a3f] transition-colors duration-300 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* linha de acento no topo que aparece no hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#84cc16]/0 group-hover:bg-[#84cc16] rounded-full transition-colors duration-300" />

      {/* número gigante como fundo decorativo */}
      <span
        aria-hidden="true"
        className="absolute -right-3 -bottom-3 font-extrabold text-white/[0.05] leading-none select-none text-[6rem]"
      >
        {end}
      </span>

      <Icon size={28} className="text-[#84cc16] mx-auto mb-4" strokeWidth={1.75} />
      <span
        ref={numRef}
        className="font-heading font-bold text-white text-4xl block mb-1"
      >
        0{suffix}
      </span>
      <span className="font-body text-white/50 text-sm">{label}</span>
    </div>
  )
}

export default About
