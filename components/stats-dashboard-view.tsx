import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { ChartData, IMCRecord } from "@/types/stats"

interface StatsDashboardViewProps {
  records: IMCRecord[]
  chartData: ChartData[]
  metricas: null // Removed frontend calculated metrics
}

export function StatsDashboardView({ records, chartData }: StatsDashboardViewProps) {
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
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              className="h-[300px]"
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
              className="h-[300px]"
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
    </div>
  )
}
