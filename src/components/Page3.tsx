import ProgressBar from './ProgressBar'
import './Page3.css'

export default function Page3() {
  return (
    <div className="employment-card page3">
      <ProgressBar filledCount={2} />
      <div className="page3-spinner-wrap">
        <div className="page3-spinner" aria-hidden />
      </div>
    </div>
  )
}
