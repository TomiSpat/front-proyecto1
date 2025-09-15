"use client"

import { HistorialFilters } from "@/types/imc"
import { Calendar, Filter, ArrowUpDown, Tag, List } from "lucide-react"

type Props = {
  from?: Date
  to?: Date
  categoria?: string
  order?: "ASC" | "DESC"
  take?: number
  onChange: (filters: Omit<HistorialFilters, "skip">) => void
}

export default function HistoryFilter({ from, to, categoria, order, take, onChange }: Props) {
  const updateFilter = (updates: Partial<Omit<HistorialFilters, "skip">>) => {
    onChange({
      from,
      to,
      categoria: categoria || "",
      order: order || "DESC",
      take: take || 10,
      ...updates,
    })
  }

  const fromString = from ? from.toISOString().split("T")[0] : ""
  const toString = to ? to.toISOString().split("T")[0] : ""

  return (
    <div className="bg-muted/50 p-4 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-medium text-foreground">Filtros avanzados</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Desde
          </label>
          <input
            type="date"
            value={fromString}
            onChange={(e) => updateFilter({ from: e.target.value ? new Date(e.target.value) : undefined })}
            className="w-full px-3 py-2 bg-background border border-border rounded-md
                     text-sm text-foreground focus:outline-none focus:ring-2 
                     focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Hasta
          </label>
          <input
            type="date"
            value={toString}
            onChange={(e) => updateFilter({ to: e.target.value ? new Date(e.target.value) : undefined })}
            className="w-full px-3 py-2 bg-background border border-border rounded-md
             text-sm text-foreground focus:outline-none focus:ring-2 
             focus:ring-primary/20 focus:border-primary transition-colors"
          />

        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Categoría
          </label>
          <select
            value={categoria || ""}
            onChange={(e) => updateFilter({ categoria: e.target.value || undefined })}
            className="w-full px-3 py-2 bg-background border border-border rounded-md
                     text-sm text-foreground focus:outline-none focus:ring-2 
                     focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Todas las categorías</option>
            <option value="Bajo peso">Bajo peso</option>
            <option value="Normal">Normal</option>
            <option value="Sobrepeso">Sobrepeso</option>
            <option value="Obeso">Obeso</option>
            {/* <option value="Obesidad II">Obesidad II</option>
            <option value="Obesidad III">Obesidad III</option> */}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            Orden
          </label>
          <select
            value={order || "DESC"}
            onChange={(e) => updateFilter({ order: e.target.value as "ASC" | "DESC" })}
            className="w-full px-3 py-2 bg-background border border-border rounded-md
                     text-sm text-foreground focus:outline-none focus:ring-2 
                     focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="DESC">Más reciente primero</option>
            <option value="ASC">Más antiguo primero</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <List className="w-3 h-3" />
            Mostrar
          </label>
          <select
            value={take || 10}
            onChange={(e) => updateFilter({ take: Number.parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-background border border-border rounded-md
                     text-sm text-foreground focus:outline-none focus:ring-2 
                     focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value={10}>10 registros</option>
            <option value={25}>25 registros</option>
            <option value={50}>50 registros</option>
            <option value={100}>100 registros</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground opacity-0">Acciones</label>
          <button
            onClick={() =>
              updateFilter({
                from: undefined,
                to: undefined,
                categoria: undefined,
                order: "DESC",
                take: 10,
              })
            }
            className="w-full px-3 py-2 bg-muted hover:bg-muted/80 border border-border 
                     rounded-md text-sm text-foreground transition-colors
                     focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
