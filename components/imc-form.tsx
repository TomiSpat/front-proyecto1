"use client"

import type React from "react"
import { useState } from "react"
import { calcularImc } from "../services/imcService"
import type { ImcResult, ImcRecord } from "../types/imc"
import NumberInput from "./number-input"
import ImcResultView from "./imc-result"
import ErrorMessage from "./error-message"
import { Calculator, Zap, Heart } from "lucide-react"


export default function ImcForm() {
  const [altura, setAltura] = useState("")
  const [peso, setPeso] = useState("")
  const [resultado, setResultado] = useState<ImcResult | null>(null)
  const [error, setError] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    const alturaNum = Number.parseFloat(altura)
    const pesoNum = Number.parseFloat(peso)

    if (isNaN(alturaNum) || isNaN(pesoNum) || alturaNum <= 0 || pesoNum <= 0) {
      setError("Por favor, ingresa valores válidos (positivos y numéricos).")
      setResultado(null)
      setIsCalculating(false)
      return
    }

    try {
      const data = await calcularImc(alturaNum, pesoNum)
      setResultado(data)
      setError("")

    } catch (err: any) {
      let errorMessage = "Error al calcular el IMC. Verifica si el backend está corriendo.";

      if (err.response?.data?.message) {
        // Puede ser string o array
        errorMessage = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
      }

      else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setResultado(null);
    } finally {
      setIsCalculating(false);
    }


  }

  return (
    <section className="bmi-gradient border border-border rounded-xl p-6 health-shadow">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Calculadora de IMC</h1>
        <p className="text-muted-foreground">Calcula tu Índice de Masa Corporal de forma rápida y precisa</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberInput label="Altura (metros)" value={altura} onChange={setAltura} step={0.01} min={0.1} />
          <NumberInput label="Peso (kilogramos)" value={peso} onChange={setPeso} min={1} />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isCalculating || !altura || !peso}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground
                     font-semibold rounded-lg hover:bg-primary/90 focus:outline-none 
                     focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform hover:scale-105 active:scale-95 transition-all duration-200
                     health-shadow"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Calculando...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4" />
                Calcular IMC
                <Zap className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {resultado && (
        <div className="mt-8">
          <ImcResultView result={resultado} />
        </div>
      )}
    </section>
  )
}
