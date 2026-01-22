import { useState } from 'react'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'
import Page4 from './components/Page4'
import './App.css'

export type FormData = {
  fullName: string
  email: string
  phone: string
  cvFile: File | null
}

function App() {
  const [page, setPage] = useState<1 | 2 | 3 | 4>(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    cvFile: null,
  })

  const goToPage2 = () => setPage(2)
  const goToPage1 = () => setPage(1)
  const submitForm = (data: FormData) => {
    setFormData(data)
    setPage(3)
    // Simulate submission delay, then show success
    setTimeout(() => setPage(4), 1500)
  }

  return (
    <div className="app-container">
      {page === 1 && <Page1 onNext={goToPage2} />}
      {page === 2 && <Page2 onBack={goToPage1} onSubmit={submitForm} />}
      {page === 3 && <Page3 />}
      {page === 4 && <Page4 fullName={formData.fullName} />}
    </div>
  )
}

export default App
