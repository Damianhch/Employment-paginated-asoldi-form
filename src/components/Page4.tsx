import ProgressBar from './ProgressBar'
import './Page4.css'

interface Page4Props {
  fullName: string
}

export default function Page4({ fullName }: Page4Props) {
  return (
    <div className="employment-card page4">
      <ProgressBar filledCount={3} />
      <div className="page4-check" aria-hidden>✓</div>
      <h2 className="page4-title">Søknad mottatt!</h2>
      <p className="page4-text">
        {fullName ? `Hei ${fullName}! ` : ''}Vi driver å evaluerer søknaden, og du vil få svar via mail og telefon innen de neste 3 dagene.
      </p>
    </div>
  )
}
