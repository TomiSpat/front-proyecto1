
import { useState } from 'react'
import ImcForm from './components/ImcForm'
import HistorySection from './components/HistorySection'
import type { ImcRecord } from './types/imc'

function App() {
  const [records, setRecords] = useState<ImcRecord[]>([])

  return (
    <>
      <div>
        <ImcForm onCalculated={(r) => setRecords((prev) => [r, ...prev])} />
        <HistorySection records={records} />
      </div>
    </>
  )
}

export default App
