import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Activity, Calendar } from "lucide-react"
import { ChartData, IMCRecord, MetricasAgregadas } from "@/types/stats"

interface StatsDashboardViewProps {
  records: IMCRecord[]
  chartData: ChartData[]
  metricas: MetricasAgregadas | null
}

export function StatsDashboardView({ records, chartData, metricas }: StatsDashboardViewProps) {
  if (records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard de Estadísticas</CardTitle>
          <CardDescription>No hay datos disponibles. Calcula tu IMC primero para ver las estadísticas.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="stats-dashboard">
      {/* Métricas Agregadas */}
      {metricas && (
        <div className="metrics-grid">
          {/* <Card>
            <CardHeader className="metric-header">
              <CardTitle className="metric-title">Total Registros</CardTitle>
              <Calendar className="metric-icon" />
            </CardHeader>
            <CardContent>
              <div className="metric-value">{metricas.totalRegistros}</div>
              <p className="metric-description">mediciones realizadas</p>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="metric-header">
              <CardTitle className="metric-title">IMC Actual</CardTitle>
              <Activity className="metric-icon" />
            </CardHeader>
            <CardContent>
              <div className="metric-value">{metricas.ultimoIMC.toFixed(1)}</div>
              <p className="metric-description">{metricas.categoriaActual}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="metric-header">
              <CardTitle className="metric-title">IMC Promedio</CardTitle>
              <Activity className="metric-icon" />
            </CardHeader>
            <CardContent>
              <div className="metric-value">{metricas.imcPromedio.toFixed(1)}</div>
              <p className="metric-description">promedio histórico</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="metric-header">
              <CardTitle className="metric-title">Tendencia</CardTitle>
              {metricas.tendenciaIMC === "subiendo" ? (
                <TrendingUp className="trend-icon trend-up" />
              ) : metricas.tendenciaIMC === "bajando" ? (
                <TrendingDown className="trend-icon trend-down" />
              ) : (
                <Activity className="trend-icon trend-stable" />
              )}
            </CardHeader>
            <CardContent>
              <div className="metric-value">
                {metricas.cambioIMC > 0 ? "+" : ""}
                {metricas.cambioIMC.toFixed(1)}
              </div>
              <p className="metric-description">cambio en IMC</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gráficos */}
      <div className="charts-grid">
        {/* Gráfico de Línea - Evolución del IMC */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución del IMC</CardTitle>
            <CardDescription>Progreso de tu Índice de Masa Corporal a lo largo del tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                imc: {
                  label: "IMC",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="chart-container"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fechaCorta" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 1", "dataMax + 1"]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="imc"
                    stroke="var(--color-imc)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-imc)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Barras - Evolución del Peso */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución del Peso</CardTitle>
            <CardDescription>Cambios en tu peso corporal registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                peso: {
                  label: "Peso (kg)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="chart-container"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fechaCorta" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 5", "dataMax + 5"]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="peso" fill="var(--color-peso)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Registros Recientes */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Registros Recientes</CardTitle>
          <CardDescription>Historial de tus últimas mediciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="records-table">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">Fecha</th>
                  <th className="table-cell">Peso (kg)</th>
                  <th className="table-cell">Altura (cm)</th>
                  <th className="table-cell">IMC</th>
                  <th className="table-cell">Categoría</th>
                </tr>
              </thead>
              <tbody>
                {records
                  .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                  .slice(0, 10)
                  .map((record) => (
                    <tr key={record.id} className="table-row">
                      <td className="table-cell">{new Date(record.fecha).toLocaleDateString("es-ES")}</td>
                      <td className="table-cell">{record.peso}</td>
                      <td className="table-cell">{record.altura}</td>
                      <td className="table-cell table-cell-bold">{record.imc.toFixed(1)}</td>
                      <td className="table-cell">
                        <span className={`category-badge ${getCategoryClass(record.categoria)}`}>
                          {record.categoria}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}

function getCategoryClass(categoria: string): string {
  switch (categoria) {
    case "Peso normal":
      return "category-normal"
    case "Sobrepeso":
      return "category-overweight"
    case "Obesidad":
      return "category-obesity"
    default:
      return "category-underweight"
  }
}
