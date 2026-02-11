import { useState } from 'react'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3Questions from './components/Page3Questions'
import Page4Spinner from './components/Page4Spinner'
import Page5Success from './components/Page5Success'
import './App.css'

export type FormData = {
  fullName: string
  email: string
  phone: string
  cvFile: File | null
  // Questions page
  hasPcInternet: 'ja' | 'nei' | ''
  hasSalesExperience: 'ja' | 'nei' | ''
  hasWebExperience: 'ja' | 'nei' | ''
  speaksNorwegian: 'ja' | 'nei' | ''
  whyFit: string
}

function App() {
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    cvFile: null,
    hasPcInternet: '',
    hasSalesExperience: '',
    hasWebExperience: '',
    speaksNorwegian: '',
    whyFit: '',
  })

  const goToPage1 = () => setPage(1)
  const goToPage2 = () => setPage(2)
  const goToPage3 = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setPage(3)
  }
  const submitForm = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setPage(4)
    // Show spinner, then success
    setTimeout(() => setPage(5), 1500)
  }

  return (
    <div className="app-container">
      {page === 1 && <Page1 onNext={goToPage2} />}
      {page === 2 && <Page2 onBack={goToPage1} onNext={goToPage3} formData={formData} />}
      {page === 3 && <Page3Questions onBack={() => setPage(2)} onSubmit={submitForm} formData={formData} />}
      {page === 4 && <Page4Spinner />}
      {page === 5 && <Page5Success fullName={formData.fullName} />}
    </div>
  )
}

export default App
