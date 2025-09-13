import axios from "axios";
import type { ImcResult } from "../types/imc";

export async function calcularImc(altura: number, peso: number): Promise<ImcResult> {
  const url = `${import.meta.env.VITE_API_URL}/imc/calcular`;
  const { data } = await axios.post<ImcResult>(url, { altura, peso });
  return data;
}

