import { useState } from 'react'
import emailjs from '@emailjs/browser'
import type { FormData } from '../App'
import ProgressBar from './ProgressBar'
import './Page3Questions.css'

interface Page3QuestionsProps {
  onBack: () => void
  onSubmit: (data: Partial<FormData>) => void
  formData: FormData
}

const TO_EMAIL = 'daracha777@gmail.com'

export default function Page3Questions({ onBack, onSubmit, formData }: Page3QuestionsProps) {
  const [hasPcInternet, setHasPcInternet] = useState<'ja' | 'nei' | ''>(formData.hasPcInternet)
  const [hasSalesExperience, setHasSalesExperience] = useState<'ja' | 'nei' | ''>(formData.hasSalesExperience)
  const [hasWebExperience, setHasWebExperience] = useState<'ja' | 'nei' | ''>(formData.hasWebExperience)
  const [speaksNorwegian, setSpeaksNorwegian] = useState<'ja' | 'nei' | ''>(formData.speaksNorwegian)
  const [whyFit, setWhyFit] = useState(formData.whyFit)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!hasPcInternet) e.hasPcInternet = 'Vennligst velg et svar'
    if (!hasSalesExperience) e.hasSalesExperience = 'Vennligst velg et svar'
    if (!hasWebExperience) e.hasWebExperience = 'Vennligst velg et svar'
    if (!speaksNorwegian) e.speaksNorwegian = 'Vennligst velg et svar'
    if (!whyFit.trim()) e.whyFit = 'Vennligst fyll ut dette feltet'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    try {
      // EmailJS credentials
      const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_83hq0el'
      const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_l0zlwva'
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8FEJnnbeR9l93wSu4'
      emailjs.init(EMAILJS_PUBLIC_KEY)

      const cvName = formData.cvFile ? formData.cvFile.name : 'Ikke lastet opp'
      const phoneFull = `+47 ${formData.phone}`

      // Build message with all form data
      const message = `Søknad mottatt:

Navn: ${formData.fullName}
E-post: ${formData.email}
Telefon: ${phoneFull}
CV: ${cvName}

--- Spørsmål ---
Har tilgang til PC og internett: ${hasPcInternet === 'ja' ? 'Ja' : 'Nei'}
Har telefonsalgserfaring: ${hasSalesExperience === 'ja' ? 'Ja' : 'Nei'}
Har webutviklingserfaring: ${hasWebExperience === 'ja' ? 'Ja' : 'Nei'}
Er flytende norsktalende: ${speaksNorwegian === 'ja' ? 'Ja' : 'Nei'}

Hvorfor passer til stillingen:
${whyFit.trim()}`

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: TO_EMAIL,
        from_name: formData.fullName,
        from_email: formData.email,
        from_phone: phoneFull,
        cv_file_name: cvName,
        subject: 'Ny søknad - telefon selger',
        message,
      })

      onSubmit({ hasPcInternet, hasSalesExperience, hasWebExperience, speaksNorwegian, whyFit: whyFit.trim() })
    } catch (err) {
      console.error('Email sending failed:', err)
      alert('Kunne ikke sende søknaden. Vennligst prøv igjen.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="employment-card page3-questions">
      <ProgressBar filledCount={2} />
      <form onSubmit={handleSubmit} className="questions-form">
        <div className="form-field">
          <label htmlFor="hasPcInternet">Har du tilgang til en PC og internett? *</label>
          <select
            id="hasPcInternet"
            value={hasPcInternet}
            onChange={(e) => setHasPcInternet(e.target.value as 'ja' | 'nei' | '')}
            className={errors.hasPcInternet ? 'error' : ''}
          >
            <option value="">Velg...</option>
            <option value="ja">Ja</option>
            <option value="nei">Nei</option>
          </select>
          {errors.hasPcInternet && <span className="field-error">{errors.hasPcInternet}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="hasSalesExperience">Har du telefonsalgserfaring fra før av? *</label>
          <select
            id="hasSalesExperience"
            value={hasSalesExperience}
            onChange={(e) => setHasSalesExperience(e.target.value as 'ja' | 'nei' | '')}
            className={errors.hasSalesExperience ? 'error' : ''}
          >
            <option value="">Velg...</option>
            <option value="ja">Ja</option>
            <option value="nei">Nei</option>
          </select>
          {errors.hasSalesExperience && <span className="field-error">{errors.hasSalesExperience}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="hasWebExperience">Har du webutviklingserfaring fra før av? *</label>
          <select
            id="hasWebExperience"
            value={hasWebExperience}
            onChange={(e) => setHasWebExperience(e.target.value as 'ja' | 'nei' | '')}
            className={errors.hasWebExperience ? 'error' : ''}
          >
            <option value="">Velg...</option>
            <option value="ja">Ja</option>
            <option value="nei">Nei</option>
          </select>
          {errors.hasWebExperience && <span className="field-error">{errors.hasWebExperience}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="speaksNorwegian">Er du flytende norsktalende? *</label>
          <select
            id="speaksNorwegian"
            value={speaksNorwegian}
            onChange={(e) => setSpeaksNorwegian(e.target.value as 'ja' | 'nei' | '')}
            className={errors.speaksNorwegian ? 'error' : ''}
          >
            <option value="">Velg...</option>
            <option value="ja">Ja</option>
            <option value="nei">Nei</option>
          </select>
          {errors.speaksNorwegian && <span className="field-error">{errors.speaksNorwegian}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="whyFit">Hvorfor passer du til denne stillingen? *</label>
          <textarea
            id="whyFit"
            value={whyFit}
            onChange={(e) => setWhyFit(e.target.value)}
            placeholder="Skriv din begrunnelse her..."
            rows={4}
            className={errors.whyFit ? 'error' : ''}
          />
          {errors.whyFit && <span className="field-error">{errors.whyFit}</span>}
        </div>

        <div className="page3-actions">
          <button type="button" className="btn-secondary" onClick={onBack} disabled={sending}>
            Forrige side
          </button>
          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? 'Sender…' : 'Send søknad'}
          </button>
        </div>
      </form>
    </div>
  )
}
