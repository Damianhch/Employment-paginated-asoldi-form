import { useState, useRef } from 'react'
import type { FormData } from '../App'
import ProgressBar from './ProgressBar'
import './Page2.css'

interface Page2Props {
  onBack: () => void
  onNext: (data: Partial<FormData>) => void
  formData: FormData
}

export default function Page2({ onBack, onNext, formData }: Page2Props) {
  const [fullName, setFullName] = useState(formData.fullName)
  const [email, setEmail] = useState(formData.email)
  const [phone, setPhone] = useState(formData.phone)
  const [cvFile, setCvFile] = useState<File | null>(formData.cvFile)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!fullName.trim()) e.fullName = 'Ditt fulle navn er påkrevd'
    if (!email.trim()) e.email = 'Din email er påkrevd'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Ugyldig e-postadresse'
    const digits = (phone || '').replace(/\D/g, '')
    if (digits.length < 8) e.phone = 'Et gyldig norsk telefonnummer er påkrevd'
    // CV is now optional - no validation
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onNext({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), cvFile })
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
          <label>Last opp CVen din (valgfritt)</label>
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
          <button type="button" className="btn-secondary" onClick={onBack}>
            Forrige side
          </button>
          <button type="submit" className="btn-primary">
            Neste
          </button>
        </div>
      </form>
    </div>
  )
}
