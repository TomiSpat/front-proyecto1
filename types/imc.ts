export interface ImcResult {
  imc: number
  categoria: string
}

export interface ImcRecord {
  id: string
  fecha: string
  peso: number
  altura: number
  imc: number
  categoria: string
}

export interface HistorialFilters {
  skip?: number
  take?: number
  order?: "ASC" | "DESC"
  categoria?: string
  from?: Date
  to?: Date
}