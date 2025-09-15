import type { ImcRecord } from "../types/imc"
import { Calendar, Weight, Ruler, Activity, Tag } from "lucide-react"

type Props = {
  records: ImcRecord[]
}

const getCategoryBadge = (categoria: string) => {
  switch (categoria.toLowerCase()) {
    case "bajo peso":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "peso normal":
      return "bg-green-100 text-green-800 border-green-200"
    case "sobrepeso":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "obeso":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function HistoryTable({ records }: Props) {
  if (!records.length) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border">
        <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">No hay registros aún</p>
        <p className="text-sm text-muted-foreground mt-1">Calcula tu primer IMC para ver el historial aquí</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Fecha
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Weight className="w-3 h-3" />
                  Peso (kg)
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Ruler className="w-3 h-3" />
                  Altura (m)
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  IMC
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Categoría
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {records.map((record, index) => (
              <tr key={record.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm text-card-foreground">
                  {new Date(record.fecha).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{record.peso}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{record.altura}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{record.imc.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryBadge(record.categoria)}`}
                  >
                    {record.categoria}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
