"use client"
import { getImcHistory, getMetricasPorCategoria, getMetricasPeso } from "@/services/imcService"
import { ImcRecord } from "@/types/imc"
import type { MetricasPorCategoria, MetricasPeso } from "@/types/stats"
import { useState, useEffect } from "react"

export function useStatsDashboard() {
  const [records, setRecords] = useState<ImcRecord[]>([])
//   const [chartData, setChartData] = useState<ChartData[]>([])
  const [metricasPorCategoria, setMetricasPorCategoria] = useState<MetricasPorCategoria[]>([])
  const [metricasPeso, setMetricasPeso] = useState<MetricasPeso | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [ historyData, categoriaMetrics, pesoMetrics] = await Promise.allSettled([
          getImcHistory({take:100, order: "ASC"}),
          getMetricasPorCategoria(),
          getMetricasPeso(),
        ])

        // Handle history data
        if (historyData.status === "fulfilled" && historyData.value?.data.length > 0) {
          setRecords(historyData.value.data)
        }

        //   const chartDataFormatted = historyData.value
        //     .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
        //     .map((record) => ({
        //       fecha: record.fecha,
        //       peso: record.peso,
        //       imc: Number.parseFloat(record.imc.toFixed(1)),
        //       fechaCorta: new Date(record.fecha).toLocaleDateString("es-ES", {
        //         month: "short",
        //         day: "numeric",
        //       }),
        //     }))
        //   setChartData(chartDataFormatted)
        // }

        // Handle categoria metrics
        if (categoriaMetrics.status === "fulfilled") {
          setMetricasPorCategoria(categoriaMetrics.value)
        } else {
          console.error("Error fetching categoria metrics:", categoriaMetrics.reason)
        }

        // Handle peso metrics
        if (pesoMetrics.status === "fulfilled") {
          setMetricasPeso(pesoMetrics.value)
        } else {
          console.error("Error fetching peso metrics:", pesoMetrics.reason)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  return {
    records,
    // chartData,
    metricas: null, // Removed frontend calculated metrics
    metricasPorCategoria,
    metricasPeso,
    loading,
    error,
  }
}
