import ProgressBar from './ProgressBar'
import './Page5Success.css'

interface Page5SuccessProps {
  fullName: string
}

export default function Page5Success({ fullName }: Page5SuccessProps) {
  return (
    <div className="employment-card page5-success">
      <ProgressBar filledCount={3} />
      <div className="success-check" aria-hidden>✓</div>
      <h2 className="success-title">Søknad mottatt!</h2>
      <p className="success-text">
        {fullName ? `Hei ${fullName}! ` : ''}Vi driver å evaluerer søknaden, og du vil få svar via mail og telefon innen de neste 3 dagene.
      </p>
    </div>
  )
}
