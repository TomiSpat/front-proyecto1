"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Weight, TrendingUp, BarChart3 } from "lucide-react"
import type { MetricasPorCategoria, MetricasPeso} from "@/types/stats"

// Chart.js imports
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js"
import { Pie, Bar, Line } from "react-chartjs-2"
import { ImcRecord } from "@/types/imc"

// Registrar componentes de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
)

interface AdvancedStatsSectionProps {
  records: ImcRecord[]
  metricasPorCategoria: MetricasPorCategoria[]
  metricasPeso: MetricasPeso | null
}

const COLORS = {
  "Bajo peso": "#3b82f6",
  Normal: "#10b981",
  Sobrepeso: "#f59e0b",
  Obeso: "#ef4444",
}

export function AdvancedStatsSection({ records, metricasPorCategoria, metricasPeso }: AdvancedStatsSectionProps) {
  if (metricasPorCategoria.length === 0 && !metricasPeso && records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estadísticas Avanzadas
          </CardTitle>
          <CardDescription>No hay datos suficientes para mostrar estadísticas avanzadas.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Configuración gráfico de pastel
  const pieData = {
    labels: metricasPorCategoria.map((m) => m.categoria),
    datasets: [
      {
        data: metricasPorCategoria.map((m) => m.total),
        backgroundColor: metricasPorCategoria.map(
          (m) => COLORS[m.categoria as keyof typeof COLORS] || "#8884d8"
        ),
        borderWidth: 1,
      },
    ],
  }

  // Configuración gráfico de barras
  const barData = {
    labels: metricasPorCategoria.map((m) => m.categoria),
    datasets: [
      {
        label: "IMC Promedio",
        data: metricasPorCategoria.map((m) => m.promedioImc),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderRadius: 6,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 }, maxRotation: 45, minRotation: 45 },
      },
      y: {
        ticks: { font: { size: 12 } },
      },
    },
  }

  // Configuración gráfico de línea (IMC en el tiempo)
  const lineData = {
    labels: records.map((r) => new Date(r.fecha).toLocaleDateString("es-AR")),
    datasets: [
      {
        label: "IMC",
        data: records.map((r) => r.imc),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.3, // suaviza la curva
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Fecha" },
      },
      y: {
        title: { display: true, text: "IMC" },
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Estadísticas Avanzadas</h2>
      </div>

      {/* Métricas de Peso */}
      {metricasPeso && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricasPeso.total}</div>
              <p className="text-xs text-muted-foreground">mediciones totales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Promedio</CardTitle>
              <Weight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricasPeso.promedioPeso.toFixed(1)} kg</div>
              <p className="text-xs text-muted-foreground">promedio histórico</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Variación de Peso</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">±{metricasPeso.variacionPeso.toFixed(1)} kg</div>
              <p className="text-xs text-muted-foreground">desviación estándar</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Line chart - IMC en el tiempo */}
      {records.length > 0 && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolución del IMC</CardTitle>
            <CardDescription>Histórico de IMC en función de la fecha</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </CardContent>
        </Card>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metricasPorCategoria.length > 0 && (
          <>
            {/* Pie chart */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría IMC</CardTitle>
                <CardDescription>Porcentaje de registros por cada categoría</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Pie data={pieData} />
              </CardContent>
            </Card>

            {/* Bar chart */}
            <Card>
              <CardHeader>
                <CardTitle>IMC Promedio por Categoría</CardTitle>
                <CardDescription>Valor promedio de IMC en cada categoría</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Bar data={barData} options={barOptions} />
              </CardContent>
            </Card>
          </>
        )}

      </div>

      {/* Tabla */}
      {metricasPorCategoria.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles por Categoría</CardTitle>
            <CardDescription>Estadísticas detalladas de cada categoría IMC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Categoría</th>
                    <th className="text-left p-2 font-medium">Total Registros</th>
                    <th className="text-left p-2 font-medium">IMC Promedio</th>
                    <th className="text-left p-2 font-medium">Variación IMC</th>
                  </tr>
                </thead>
                <tbody>
                  {metricasPorCategoria.map((metrica, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[metrica.categoria as keyof typeof COLORS] || "#8884d8" }}
                        />
                        {metrica.categoria}
                      </td>
                      <td className="p-2 font-medium">{metrica.total}</td>
                      <td className="p-2">{metrica.promedioImc.toFixed(1)}</td>
                      <td className="p-2">±{metrica.variacionImc.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
