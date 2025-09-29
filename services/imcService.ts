import type { HistorialFilters, ImcHistoryResponse, ImcRecord, ImcResult } from "../types/imc"
import type { MetricasPorCategoria, MetricasPeso } from "../types/stats"
import api from "./api"

export async function calcularImc(altura: number, peso: number): Promise<ImcResult> {
  const { data } = await api.post<ImcResult>("/imc/calcular", { altura, peso })
  return data
}

export async function getImcHistory(filters: HistorialFilters = {}): Promise<ImcHistoryResponse> {
  const params = new URLSearchParams()

  if (filters.skip !== undefined) params.append("skip", filters.skip.toString())
  if (filters.take !== undefined) params.append("take", filters.take.toString())
  if (filters.order) params.append("order", filters.order)
  if (filters.categoria) params.append("categoria", filters.categoria)
  if (filters.from) params.append("from", filters.from.toISOString().split("T")[0])
  if (filters.to) params.append("to", filters.to.toISOString().split("T")[0] + "T23:59:59")

  const res = await api.get<ImcHistoryResponse>(`/imc/historial?${params.toString()}`)
  if (!res || !res.data || res.data.total === 0) {
    return { data: [], total: 0 }
  }
  const { data, total } = res.data
  return { data, total }
}

export async function getMetricasPorCategoria(): Promise<MetricasPorCategoria[]> {
  const { data } = await api.get<MetricasPorCategoria[]>("/imc/metricas")
  return data
}

export async function getMetricasPeso(): Promise<MetricasPeso> {
  const { data } = await api.get<MetricasPeso>("/imc/metricas/peso")
  return data
}
