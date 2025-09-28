"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Users, Weight, TrendingUp, BarChart3 } from "lucide-react"
import type { MetricasPorCategoria, MetricasPeso } from "@/types/stats"

interface AdvancedStatsSectionProps {
  metricasPorCategoria: MetricasPorCategoria[]
  metricasPeso: MetricasPeso | null
}

const COLORS = {
  "Bajo peso": "#3b82f6",
  Normal: "#10b981",
  Sobrepeso: "#f59e0b",
  Obeso: "#ef4444",
}

export function AdvancedStatsSection({ metricasPorCategoria, metricasPeso }: AdvancedStatsSectionProps) {
  if (metricasPorCategoria.length === 0 && !metricasPeso) {
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

      {/* Gráficos de Métricas por Categoría */}
      {metricasPorCategoria.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Pastel - Distribución por Categoría */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categoría IMC</CardTitle>
              <CardDescription>Porcentaje de registros por cada categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total: {
                    label: "Total",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metricasPorCategoria}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="total"
                    >
                      {metricasPorCategoria.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.categoria as keyof typeof COLORS] || "#8884d8"}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Barras - IMC Promedio por Categoría */}
          <Card>
            <CardHeader>
              <CardTitle>IMC Promedio por Categoría</CardTitle>
              <CardDescription>Valor promedio de IMC en cada categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  promedioImc: {
                    label: "IMC Promedio",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricasPorCategoria}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="categoria"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="promedioImc" fill="var(--color-promedioImc)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabla de Detalles por Categoría */}
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
