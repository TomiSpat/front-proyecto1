"use client"

import { Calculator } from "lucide-react"

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  min?: string | number
  step?: string | number
}

export default function NumberInput({ label, value, onChange, min, step }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Calculator className="w-4 h-4 text-primary" />
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border rounded-lg 
                   text-foreground placeholder-muted-foreground
                   input-focus focus:outline-none focus:ring-2 focus:ring-primary/20 
                   focus:border-primary transition-all duration-200"
          min={min as number | undefined}
          step={step as number | undefined}
          placeholder="Ingresa el valor"
        />
      </div>
    </div>
  )
}
