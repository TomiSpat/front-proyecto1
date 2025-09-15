
import { useEffect, useState } from 'react'
import ImcForm from './components/ImcForm'
import HistorySection from './components/HistorySection'
import type { ImcRecord } from './types/imc'
import { getImcHistory } from './services/imcService'

function App() {
  const [records, setRecords] = useState<ImcRecord[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getImcHistory()
      if(res.length === 0) {
        throw new Error('Error fetching IMC history')
      }
      setRecords(res)
    }
    fetchHistory()
  }, [])

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
