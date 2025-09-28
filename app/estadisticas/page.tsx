"use client"
import Navigation from "../../components/navigation"
import { StatsDashboardView } from "@/components/stats-dashboard-view"
import { AdvancedStatsSection } from "@/components/advanced-stats-section"
import { useStatsDashboard } from "@/hooks/use-stats-dashboard"

export default function EstadisticasPage() {
  const { records, chartData, metricasPorCategoria, metricasPeso, loading, error } = useStatsDashboard()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Estadísticas de IMC</h1>
          <p className="text-muted-foreground">Análisis detallado de tus datos de salud</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando estadísticas...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Error al cargar las estadísticas: {error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* <StatsDashboardView records={records} chartData={chartData} metricas={null} /> */}
            <AdvancedStatsSection metricasPorCategoria={metricasPorCategoria} metricasPeso={metricasPeso} />
          </div>
        )}
      </main>
    </div>
  )
}
