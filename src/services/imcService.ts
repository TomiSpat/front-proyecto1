import type { ImcRecord, ImcResult } from "../types/imc";
import api from "./api";

export async function calcularImc(altura: number, peso: number): Promise<ImcResult> {
  const { data } = await api.post<ImcResult>("/imc/calcular", { altura, peso });
  return data;
}

export async function getImcHistory(): Promise<ImcRecord[]> {
  const { data } = await api.get<ImcRecord[]>("/imc/historial");
  return data;
}

