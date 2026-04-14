import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const modalidades = [
  'Tênis', 'Beach Tennis', 'Futevôlei',
  'Pickleball', 'Pilates', 'Academia', 'Massagem',
]

const checklist = [
  'Sem taxa de adesão no lançamento',
  'Acesso a todas as modalidades',
  'Suporte personalizado',
]

const empty = { nome: '', email: '', telefone: '', modalidade: '', mensagem: '' }

function Contact() {
  const ref = useSectionReveal()

  const [form,     setForm]     = useState(empty)
  const [erros,    setErros]    = useState({})
  const [enviado,  setEnviado]  = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }))
    if (erros[name]) setErros((p) => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.nome.trim())     e.nome     = 'Nome é obrigatório'
    if (!form.email.trim())    e.email    = 'E-mail é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.telefone.trim()) e.telefone = 'Telefone é obrigatório'
    if (!form.modalidade)      e.modalidade = 'Selecione uma modalidade'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length) { setErros(found); return }
    setEnviado(true)
    setForm(empty)
    setErros({})
  }

  const base = 'w-full font-body text-sm text-gray-800 bg-white/10 border rounded-xl px-4 py-3 outline-none placeholder:text-white/30 text-white transition-all duration-200 focus:bg-white/15 focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20'

  return (
    <section ref={ref} id="contato" className="py-24 md:py-32 bg-[#1a3a2a] relative overflow-hidden">

      {/* toque editorial: palavra atrás do formulário */}
      <span
        aria-hidden="true"
        className="absolute right-[-4%] bottom-[-5%] text-[20vw] font-extrabold text-white/[0.025] leading-none select-none pointer-events-none uppercase tracking-tighter"
      >
        CLUB
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* coluna esquerda — informações */}
          <div className="fade-in-section">
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-6 h-px bg-[#84cc16]" />
              <span className="font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px]">
                Entre em contato
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-6">
              Pronto para fazer parte <span className="text-[#84cc16] italic">do clube?</span>
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-10">
              Preencha o formulário e seja um dos primeiros a saber quando abrirmos as portas do Arena Club.
            </p>
            <div className="flex flex-col gap-4">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#84cc16] flex-shrink-0" strokeWidth={2} />
                  <span className="font-body text-white/75 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* coluna direita — card branco com formulário */}
          <div className="fade-in-section delay-200 bg-white rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20">

            {enviado ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 bg-[#84cc16]/12 rounded-2xl flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#84cc16]" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-bold text-[#1a3a2a] text-xl">Mensagem enviada!</h3>
                <p className="font-body text-gray-500 text-sm max-w-xs">
                  Entraremos em contato em breve. Fique de olho no seu e-mail e WhatsApp.
                </p>
                <button
                  onClick={() => setEnviado(false)}
                  className="mt-2 font-body text-sm text-[#84cc16] hover:text-[#65a30d] transition-colors duration-200"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <Field label="Nome completo" required error={erros.nome}>
                  <input
                    id="nome" name="nome" type="text"
                    value={form.nome} onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={`w-full font-body text-sm text-gray-800 bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 ${erros.nome ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  />
                </Field>

                <Field label="E-mail" required error={erros.email}>
                  <input
                    id="email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`w-full font-body text-sm text-gray-800 bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 ${erros.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  />
                </Field>

                <Field label="Telefone / WhatsApp" required error={erros.telefone}>
                  <input
                    id="telefone" name="telefone" type="tel"
                    value={form.telefone} onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className={`w-full font-body text-sm text-gray-800 bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 ${erros.telefone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  />
                </Field>

                <Field label="Modalidade de interesse" required error={erros.modalidade}>
                  <select
                    id="modalidade" name="modalidade"
                    value={form.modalidade} onChange={handleChange}
                    className={`w-full font-body text-sm bg-gray-50 border rounded-xl px-4 py-3 outline-none transition-all duration-200 cursor-pointer focus:bg-white focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 ${form.modalidade ? 'text-gray-800' : 'text-gray-400'} ${erros.modalidade ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  >
                    <option value="" disabled>Selecione uma modalidade</option>
                    {modalidades.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>

                <Field label="Mensagem" sublabel="(opcional)">
                  <textarea
                    id="mensagem" name="mensagem"
                    value={form.mensagem} onChange={handleChange}
                    rows={3} placeholder="Escreva sua dúvida ou sugestão..."
                    className="w-full font-body text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none transition-all duration-200 focus:bg-white focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20"
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] active:scale-[0.98]
                             text-[#0f2218] font-heading font-semibold text-base py-4 rounded-xl
                             transition-all duration-300 hover:shadow-lg hover:shadow-[#84cc16]/30 mt-1"
                >
                  Enviar mensagem
                  <Send size={16} strokeWidth={2} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, sublabel, required, error, children }) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-[#1a3a2a] mb-1.5">
        {label}
        {required  && <span className="text-red-400 ml-0.5">*</span>}
        {sublabel  && <span className="text-gray-400 font-normal ml-1">{sublabel}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 font-body text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default Contact
