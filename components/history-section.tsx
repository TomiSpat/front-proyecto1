"use client"

import { useEffect, useState } from "react"
import type { HistorialFilters, ImcRecord } from "../types/imc"
import HistoryFilter from "./history-filter"
import HistoryTable from "./history-table"
import { History, TrendingUp, Loader2 } from "lucide-react"
import { getImcHistory} from "@/services/imcService"

type Props = {}

export default function HistorySection() {
  const [records, setRecords] = useState<ImcRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)


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


  const [filters, setFilters] = useState<HistorialFilters>({
    from: undefined,
    to: undefined,
    categoria: "",
    order: "DESC",
    take: 10,
    skip: 0,
  })

  const fetchHistorial = async (currentFilters: HistorialFilters) => {
    setLoading(true)
    try {
      const data = await getImcHistory(currentFilters)

      if (Array.isArray(data)) {
        setRecords(data)
        setTotalRecords(data.length)
      } else {
        setRecords((data as any).records || data)
        setTotalRecords((data as any).total || (data as any).length || 0)
      }
    } catch (error) {
      console.error("Error fetching historial:", error)
      setRecords([])
      setTotalRecords(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistorial(filters)
  }, [filters])

  const handleFiltersChange = (newFilters: Omit<HistorialFilters, "skip">) => {
    setFilters({ ...newFilters, skip: 0 })
  }

  const handleLoadMore = () => {
    setFilters((prev) => ({ ...prev, skip: (prev.skip || 0) + (prev.take || 10) }))
  }

  return (
    <section className="bg-card border border-border rounded-xl p-6 health-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <History className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Historial de IMC</h2>
          <p className="text-sm text-muted-foreground">Seguimiento de tus mediciones anteriores</p>
        </div>
        {totalRecords > 0 && (
          <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            {totalRecords} registro{totalRecords !== 1 ? "s" : ""} total
          </div>
        )}
      </div>

      <div className="space-y-6">
        <HistoryFilter
          from={filters.from}
          to={filters.to}
          categoria={filters.categoria}
          order={filters.order}
          take={filters.take}
          onChange={handleFiltersChange}
        />

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Cargando historial...</span>
          </div>
        )}

        {!loading && <HistoryTable records={records} />}

        {!loading && records.length > 0 && records.length < totalRecords && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg
                       hover:bg-primary/90 transition-colors focus:outline-none 
                       focus:ring-2 focus:ring-primary/20"
            >
              Cargar más registros ({totalRecords - records.length} restantes)
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
