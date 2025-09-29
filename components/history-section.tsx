"use client"

import { useEffect, useState, useMemo } from "react"
import type { HistorialFilters, ImcRecord } from "../types/imc"
import HistoryFilter from "./history-filter"
import HistoryTable from "./history-table"
import { History, TrendingUp, Loader2 } from "lucide-react"
import { getImcHistory } from "@/services/imcService"

export default function HistorySection() {
  const [records, setRecords] = useState<ImcRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const [filters, setFilters] = useState<HistorialFilters>({
    from: undefined,
    to: undefined,
    categoria: "",
    order: "DESC",
    take: 10,
    skip: 0,
  })

  const currentPage = useMemo(
    () => Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
    [filters]
  )
  const totalPages = useMemo(
    () => Math.ceil(totalRecords / (filters.take || 10)),
    [totalRecords, filters.take]
  )

  const fetchHistorial = async (currentFilters: HistorialFilters) => {
    setLoading(true)
    try {
      const res = await getImcHistory(currentFilters)
      if (Array.isArray(res.data)) {
        setRecords(res.data)
        setTotalRecords(res.total)
      } else {
        setRecords((res.data as any).records || res.data)
        setTotalRecords((res.data as any).total || (res.data as any).length || 0)
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

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      skip: (page - 1) * (prev.take || 10),
    }))
  }

  // Calcular rango de páginas visibles
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

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

        {!loading && records.length > 0 && totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            {/* Botón Anterior */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 rounded-lg border bg-background text-foreground 
                        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              «
            </button>

            {/* Primera página si no está en rango */}
            {start > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-1 rounded-lg border bg-background hover:bg-muted"
                >
                  1
                </button>
                {start > 2 && <span className="px-2">...</span>}
              </>
            )}

            {/* Páginas visibles */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg border transition-colors 
                ${page === currentPage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground hover:bg-muted"}`}
              >
                {page}
              </button>
            ))}

            {/* Última página si no está en rango */}
            {end < totalPages && (
              <>
                {end < totalPages - 1 && <span className="px-2">...</span>}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-1 rounded-lg border bg-background hover:bg-muted"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Botón Siguiente */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 rounded-lg border bg-background text-foreground 
                        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              »
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
