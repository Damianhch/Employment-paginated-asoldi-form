import ProgressBar from './ProgressBar'
import './Page4Spinner.css'

export default function Page4Spinner() {
  return (
    <div className="employment-card page4-spinner">
      <ProgressBar filledCount={3} />
      <div className="spinner-wrap">
        <div className="spinner" aria-hidden />
      </div>
    </div>
  )
}
