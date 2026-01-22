import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import type { FormData } from '../App'
import ProgressBar from './ProgressBar'
import './Page2.css'

interface Page2Props {
  onBack: () => void
  onSubmit: (data: FormData) => void
}

const TO_EMAIL = 'daracha777@gmail.com'

export default function Page2({ onBack, onSubmit }: Page2Props) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!fullName.trim()) e.fullName = 'Ditt fulle navn er påkrevd'
    if (!email.trim()) e.email = 'Din email er påkrevd'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Ugyldig e-postadresse'
    const digits = (phone || '').replace(/\D/g, '')
    if (digits.length < 8) e.phone = 'Et gyldig norsk telefonnummer er påkrevd'
    if (!cvFile) e.cvFile = 'Last opp CV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const data: FormData = { fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), cvFile }
    setSending(true)
    try {
      // EmailJS – paste your credentials here (same as referral form). Vercel env vars optional.
      const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_83hq0el'
      const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_l0zlwva'
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8FEJnnbeR9l93wSu4'
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)

      const cvName = cvFile ? cvFile.name : 'Ikke lastet opp'
      const phoneFull = `+47 ${phone.trim()}`
      
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
        to_email: TO_EMAIL,
        from_name: data.fullName,
        from_email: data.email,
        from_phone: phoneFull,
        cv_file_name: cvName,
        subject: 'Ny søknad - telefon selger',
        message: `Søknad mottatt:\n\nNavn: ${data.fullName}\nE-post: ${data.email}\nTelefon: ${phoneFull}\nCV: ${cvName}`,
      })
      onSubmit(data)
    } catch (err) {
      console.error('Email sending failed:', err)
      alert('Kunne ikke sende søknaden. Vennligst prøv igjen.')
    } finally {
      setSending(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) setCvFile(f)
  }
  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  return (
    <div className="employment-card page2">
      <ProgressBar filledCount={1} />
      <p className="page2-intro">
        Ikke alle har det som trengs for å bli telefon selger, men hvis du tror du har det som kreves skriv ned din data nedenfor.
      </p>
      <form onSubmit={handleSubmit} className="page2-form">
        <div className="form-field">
          <label htmlFor="fullName">Ditt fulle navn *</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="fornavn og etternavn"
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Din email adresse *</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Mail@gmail.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Ditt telefon nummer *</label>
          <div className="phone-wrap">
            <span className="phone-prefix" aria-hidden>+47</span>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123 45 678"
              className={errors.phone ? 'error' : ''}
            />
          </div>
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        <div className="form-field">
          <label>Last opp CVen din *</label>
          <div
            className={`file-zone ${errors.cvFile ? 'error' : ''} ${cvFile ? 'has-file' : ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            />
            {cvFile ? cvFile.name : 'Velg en fil eller dra den hit'}
          </div>
          <button type="button" className="file-btn" onClick={() => fileInputRef.current?.click()}>
            Velg en fil
          </button>
          {errors.cvFile && <span className="field-error">{errors.cvFile}</span>}
        </div>
        <div className="page2-actions">
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
