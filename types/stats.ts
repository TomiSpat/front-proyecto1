export interface IMCRecord {
  id: string
  peso: number
  altura: number
  imc: number
  categoria: string
  fecha: string
}

export interface ChartData {
  fecha: string
  peso: number
  imc: number
  fechaCorta: string
}

export interface MetricasAgregadas {
  totalRegistros: number
  imcPromedio: number
  pesoPromedio: number
  tendenciaIMC: "subiendo" | "bajando" | "estable"
  cambioIMC: number
  ultimoIMC: number
  categoriaActual: string
}
