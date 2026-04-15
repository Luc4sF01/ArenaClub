import { useSectionReveal } from '../hooks/useSectionReveal'
import {
  CircleDot, Waves, Wind, Zap,
  PersonStanding, Dumbbell, HandHeart,
} from 'lucide-react'

const activities = [
  { icon: CircleDot,      name: 'Tênis',        desc: 'Quadras profissionais com aulas para todos os níveis' },
  { icon: Waves,          name: 'Beach Tennis', desc: 'Quadras de areia com professores certificados' },
  { icon: Wind,           name: 'Futevôlei',    desc: 'Esporte que une futebol e vôlei na areia' },
  { icon: Zap,            name: 'Pickleball',   desc: 'O esporte que mais cresce no mundo' },
  { icon: PersonStanding, name: 'Pilates',      desc: 'Aulas com equipamentos modernos e instrutores especializados' },
  { icon: Dumbbell,       name: 'Academia',     desc: 'Musculação completa com equipamentos de última geração' },
  { icon: HandHeart,      name: 'Massagem',     desc: 'Sessões sob agendamento e disponibilidade', avulso: true },
]

// Calcula a inclinação 3D com base na posição do mouse dentro do card
const handleTilt = (e) => {
  const el   = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x    = (e.clientX - rect.left)  / rect.width  - 0.5  // -0.5 → 0.5
  const y    = (e.clientY - rect.top)   / rect.height - 0.5
  el.style.transform  = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.04,1.04,1.04)`
  el.style.transition = 'transform 0.08s ease'
}

const handleTiltReset = (e) => {
  const el = e.currentTarget
  el.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  el.style.transition = 'transform 0.45s ease'
}

function Activities() {
  const ref = useSectionReveal()

  return (
    <section
      ref={ref}
      id="atividades"
      className="py-24 md:py-32 bg-[#f8fafc] relative overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(26,58,42,0.022) 30px, rgba(26,58,42,0.022) 31px)',
      }}
    >

      {/* toque editorial: número gigante como decoração */}
      <span
        aria-hidden="true"
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[28vw] font-extrabold text-gray-900/[0.025] leading-none select-none pointer-events-none"
      >
        07
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="fade-in-section text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
            <span className="font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px]">
              O que oferecemos
            </span>
            <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
          </div>
          <h2 className="font-heading font-extrabold text-[#1a3a2a] text-3xl sm:text-5xl md:text-6xl tracking-tight">
            Modalidades <span className="text-[#84cc16] italic">disponíveis</span>
          </h2>
          <p className="mt-4 font-body text-gray-500 text-lg sm:text-xl max-w-xl mx-auto">
            Escolha a sua favorita ou experimente todas — no Arena Club há espaço para todo perfil.
          </p>
        </div>

        {/*
          Desktop: grid 4 colunas | Tablet: 2 colunas
          Mobile: scroll horizontal com snap para melhor UX
        */}
        <div className="fade-in-section delay-200 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-no-bar pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {activities.map((item, i) => {
            const Icon = item.icon
            const isAvulso = !!item.avulso
            return (
              <div
                key={item.name}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltReset}
                className={`activity-card group relative flex-shrink-0 w-64 snap-start sm:w-auto
                            rounded-2xl p-6 flex flex-col gap-4 overflow-hidden
                            cursor-default will-change-transform transition-shadow duration-300
                            ${isAvulso
                              ? 'bg-amber-50/60 border border-dashed border-amber-200 hover:shadow-xl hover:shadow-amber-400/15 hover:border-amber-300'
                              : 'bg-white border border-gray-100 hover:shadow-xl hover:shadow-[#84cc16]/10 hover:border-[#84cc16]/25'
                            }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {/* número sequencial como watermark editorial */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-3 font-heading font-extrabold text-[3.5rem] text-gray-900/[0.045] leading-none select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className={`p-3 rounded-xl w-fit transition-colors duration-300
                                 ${isAvulso
                                   ? 'bg-amber-100 group-hover:bg-amber-200/70'
                                   : 'bg-[#1a3a2a]/5 group-hover:bg-[#84cc16]/12'
                                 }`}>
                  <Icon
                    size={30}
                    className={isAvulso ? 'text-amber-500' : 'text-[#84cc16]'}
                    strokeWidth={1.75}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-[#1a3a2a] text-lg mb-1.5">
                    {item.name}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* badge de serviço avulso */}
                {isAvulso && (
                  <span className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold
                                   text-amber-600 bg-amber-100 border border-amber-200
                                   px-2.5 py-1 rounded-full w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" aria-hidden="true" />
                    Serviço avulso
                  </span>
                )}

                {/* linha decorativa que expande no hover */}
                <div
                  className="activity-line"
                  style={isAvulso ? { background: '#f59e0b' } : {}}
                />
              </div>
            )
          })}
        </div>

        <p className="mt-5 text-center text-gray-400 text-xs font-body sm:hidden">
          Deslize para ver todas as modalidades
        </p>
      </div>
    </section>
  )
}

export default Activities
