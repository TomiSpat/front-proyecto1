export interface ImcResult {
  imc: number;
  categoria: string;
}

export interface ImcRecord {
  id: string;
  fecha: string; // ISO string
  peso: number;
  altura: number;
  imc: number;
  categoria: string;
}
