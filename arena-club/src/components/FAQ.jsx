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
    <section ref={ref} id="faq" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* coluna esquerda — 40% */}
          <div className="fade-in-section lg:col-span-2">
            <span className="inline-block font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px] mb-4">
              Dúvidas frequentes
            </span>
            <h2 className="font-heading font-bold text-[#1a3a2a] text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Tudo que você precisa saber
            </h2>
            <p className="font-body text-gray-500 text-base leading-relaxed mb-9">
              Reunimos as principais dúvidas sobre o Arena Club. Não encontrou o que procura? Fale diretamente com a gente.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#1a3a2a] hover:bg-[#2a5a3f] active:scale-95
                         text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-xl
                         transition-all duration-300 hover:shadow-lg hover:shadow-[#1a3a2a]/20"
            >
              <MessageCircle size={17} strokeWidth={2} />
              Falar pelo WhatsApp
            </a>
          </div>

          {/* coluna direita — 60% com accordions */}
          <div className="fade-in-section delay-200 lg:col-span-3">
            <div className="divide-y divide-gray-100">
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
        <span className="font-heading font-semibold text-[#1a3a2a] group-hover:text-[#2a5a3f] text-base leading-snug transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-[#84cc16]' : 'text-gray-400'
          }`}
        />
      </button>

      <div className={`faq-body ${isOpen ? 'open' : ''}`}>
        <p className="font-body text-gray-500 text-sm leading-relaxed pt-3 pr-8">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default FAQ
