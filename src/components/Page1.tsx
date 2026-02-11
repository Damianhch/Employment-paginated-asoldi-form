import './Page1.css'

interface Page1Props {
  onNext: () => void
}

export default function Page1({ onNext }: Page1Props) {
  return (
    <div className="employment-card page1">
      <h2 className="page1-title">Telefon selger</h2>
      <p className="page1-pay">400 kr/møte booket</p>
      <p className="page1-pitch">
        Vi trenger engasjerte selgere som liker å jobbe over telefon og får booket møter med kalde leads.
      </p>
      <ul className="page1-benefits">
        <li>Fleksible arbeidstider</li>
        <li>God Provisionell lønn</li>
        <li>tilgang til våre systemer og ekspertise</li>
        <li>Opplæring og oppfølging</li>
      </ul>
      <button type="button" className="btn-primary" onClick={onNext}>
        Søk Nå
      </button>
    </div>
  )
}
