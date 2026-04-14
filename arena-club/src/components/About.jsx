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
    <section ref={ref} id="sobre" className="py-24 md:py-32 bg-white relative overflow-hidden">

      {/* toque editorial: palavra atrás do conteúdo */}
      <span
        aria-hidden="true"
        className="absolute left-[-4%] top-1/2 -translate-y-1/2 text-[18vw] font-extrabold text-gray-900/[0.03] leading-none select-none pointer-events-none uppercase tracking-tighter"
      >
        CLUBE
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* coluna de texto */}
          <div className="fade-in-section order-2 lg:order-1">
            <span className="inline-block font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px] mb-4">
              Sobre nós
            </span>
            <h2 className="font-heading font-bold text-[#1a3a2a] text-3xl sm:text-4xl md:text-5xl leading-tight mb-7">
              Mais que um clube,{' '}
              <span className="text-[#84cc16]">uma comunidade</span>
            </h2>

            <div className="space-y-4 font-body text-gray-600 text-base md:text-lg leading-relaxed">
              <p>
                O Arena Club nasceu para reunir em um único espaço o melhor do esporte, bem-estar e convivência.
                Um ambiente onde atletas experientes e iniciantes se encontram, evoluem e constroem laços duradouros.
              </p>
              <p>
                Nossas instalações seguem padrão de excelência — quadras profissionais, academia completa,
                estúdio de pilates e área de recuperação integrados em um espaço moderno e acolhedor.
              </p>
              <p>
                Mais do que praticar esporte, no Arena Club você faz parte de uma comunidade apaixonada
                por movimento, saúde e qualidade de vida.
              </p>
            </div>
          </div>

          {/* coluna de imagem — leve rotação para dinamismo */}
          <div className="fade-in-section delay-200 order-1 lg:order-2 relative">
            {/* retângulo de acento verde atrás da imagem */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#84cc16]/15 rounded-2xl rotate-[-2deg]" />
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
              alt="Instalações do Arena Club"
              className="relative w-full h-72 sm:h-96 lg:h-[500px] object-cover rounded-2xl rotate-[-2deg]
                         shadow-2xl shadow-[#1a3a2a]/20"
              loading="lazy"
            />
          </div>
        </div>

        {/* cards de estatísticas com número como decoração visual */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
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

  // contador via requestAnimationFrame — não depende do GSAP
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
                 hover:bg-[#2a5a3f] transition-colors duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
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
