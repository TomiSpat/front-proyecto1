import type { HistorialFilters, ImcRecord, ImcResult } from "../types/imc"
import api from "./api"

export async function calcularImc(altura: number, peso: number): Promise<ImcResult> {
  const { data } = await api.post<ImcResult>("/imc/calcular", { altura, peso })
  return data
}



export async function getImcHistory(filters: HistorialFilters = {}): Promise<ImcRecord[]> {
  const params = new URLSearchParams()

  if (filters.skip !== undefined) params.append("skip", filters.skip.toString())
  if (filters.take !== undefined) params.append("take", filters.take.toString())
  if (filters.order) params.append("order", filters.order)
  if (filters.categoria) params.append("categoria", filters.categoria)
  if (filters.from) params.append("from", filters.from.toISOString().split("T")[0])
  if (filters.to) params.append("to", filters.to.toISOString().split("T")[0] + "T23:59:59")

  const { data } = await api.get<ImcRecord[]>(`/imc/historial?${params.toString()}`)
  return data
}
