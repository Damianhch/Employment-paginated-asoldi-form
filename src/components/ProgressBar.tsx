import './ProgressBar.css'

type FilledCount = 1 | 2 | 3

interface ProgressBarProps {
  filledCount: FilledCount
}

export default function ProgressBar({ filledCount }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`progress-dot ${i <= filledCount ? 'filled' : ''}`}
          aria-hidden
        />
      ))}
    </div>
  )
}
