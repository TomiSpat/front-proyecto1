import type { ImcResult as ImcResultType } from "../types/imc"
import { Heart, TrendingUp, Activity, AlertCircle } from "lucide-react"

type Props = {
  result: ImcResultType | null
}

const getCategoryColor = (categoria: string) => {
  switch (categoria.toLowerCase()) {
    case "bajo peso":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "peso normal":
      return "text-green-600 bg-green-50 border-green-200"
    case "sobrepeso":
      return "text-amber-600 bg-amber-50 border-amber-200"
    case "obesidad":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const getCategoryIcon = (categoria: string) => {
  switch (categoria.toLowerCase()) {
    case "bajo peso":
      return <TrendingUp className="w-5 h-5" />
    case "peso normal":
      return <Heart className="w-5 h-5" />
    case "sobrepeso":
      return <Activity className="w-5 h-5" />
    case "obesidad":
      return <AlertCircle className="w-5 h-5" />
    default:
      return <Activity className="w-5 h-5" />
  }
}

export default function ImcResult({ result }: Props) {
  if (!result) return null

  return (
    <div
      className="result-card text-white p-6 rounded-xl health-shadow 
                    animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Tu Resultado</h3>
        </div>

        <div className="space-y-2">
          <p className="text-4xl font-bold tracking-tight">{result.imc.toFixed(1)}</p>
          <p className="text-sm opacity-90">Índice de Masa Corporal</p>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border
                        ${getCategoryColor(result.categoria)} font-semibold text-sm`}
        >
          {getCategoryIcon(result.categoria)}
          {result.categoria}
        </div>
      </div>
    </div>
  )
}
