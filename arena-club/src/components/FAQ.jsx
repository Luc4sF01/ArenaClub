import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const faqs = [
  {
    q: 'Quando o Arena Club abre?',
    a: 'Estamos em fase final de preparação e a inauguração está prevista para o segundo semestre de 2026. Cadastre-se para receber a data exata em primeira mão.',
  },
  {
    q: 'Quais modalidades estão incluídas no plano?',
    a: 'Tênis, Beach Tennis, Futevôlei, Pickleball, Pilates e Academia estão incluídos nos planos de sócio. O serviço de massagem é avulso, mediante agendamento e disponibilidade.',
  },
  {
    q: 'Preciso ter experiência prévia para me associar?',
    a: 'Não! O Arena Club é para todos os níveis. Temos professores e instrutores para iniciantes e aulas avançadas para quem já pratica.',
  },
  {
    q: 'Como funciona o agendamento das quadras?',
    a: 'Após a inauguração, você poderá agendar horários diretamente pelo nosso aplicativo ou site, com visualização de disponibilidade em tempo real.',
  },
  {
    q: 'Haverá planos para família?',
    a: 'Sim! Estamos preparando planos família com condições especiais. Cadastre-se para ser avisado sobre os pacotes e preços de lançamento.',
  },
  {
    q: 'O clube tem estacionamento?',
    a: 'Sim, o Arena Club contará com estacionamento amplo e gratuito para todos os sócios durante o período de uso das instalações.',
  },
  {
    q: 'Posso cancelar minha associação a qualquer momento?',
    a: 'Ofereceremos planos flexíveis, incluindo opções mensais sem fidelidade. Os detalhes dos contratos serão divulgados próximo à inauguração.',
  },
]

function FAQ() {
  const ref = useSectionReveal()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section ref={ref} id="faq" className="py-24 md:py-32 bg-[#84cc16] relative overflow-hidden">

      {/* palavra decorativa editorial — contraste sutil no verde */}
      <span
        aria-hidden="true"
        className="absolute right-[-3%] top-1/2 -translate-y-1/2 text-[18vw] font-extrabold text-[#1a3a2a]/[0.07] leading-none select-none pointer-events-none uppercase tracking-tighter"
      >
        FAQ
      </span>

      {/* linhas diagonais de textura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 28px, rgba(26,58,42,0.04) 28px, rgba(26,58,42,0.04) 29px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* coluna esquerda — 40% */}
          <div className="fade-in-section lg:col-span-2">
            {/* linha decorativa — eyebrow — linha */}
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-6 h-px bg-[#1a3a2a]" />
              <span className="font-body text-[11px] font-semibold text-[#1a3a2a] uppercase tracking-[5px]">
                Dúvidas frequentes
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[#1a3a2a] text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-6">
              Tudo que você <span className="italic">precisa saber</span>
            </h2>
            <p className="font-body text-[#1a3a2a]/70 text-lg leading-relaxed mb-9">
              Reunimos as principais dúvidas sobre o Arena Club. Não encontrou o que procura? Fale diretamente com a gente.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#1a3a2a] hover:bg-[#0f2218] active:scale-95
                         text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-xl
                         transition-all duration-300 hover:shadow-xl hover:shadow-[#1a3a2a]/30"
            >
              <MessageCircle size={17} strokeWidth={2} />
              Falar pelo WhatsApp
            </a>
          </div>

          {/* coluna direita — 60% com accordions */}
          <div className="fade-in-section delay-200 lg:col-span-3">
            <div className="divide-y divide-[#1a3a2a]/15">
              {faqs.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.q}
                  answer={item.a}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="py-5">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-[#1a3a2a] group-hover:text-[#0f2218] text-base leading-snug transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-[#1a3a2a]' : 'text-[#1a3a2a]/40'
          }`}
        />
      </button>

      <div className={`faq-body ${isOpen ? 'open' : ''}`}>
        <p className="font-body text-[#1a3a2a]/65 text-sm leading-relaxed pt-3 pr-8">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default FAQ
