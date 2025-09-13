import React, { useState } from "react";
import { calcularImc } from "../services/imcService";
import type { ImcResult, ImcRecord } from "../types/imc";
import NumberInput from "./NumberInput";
import ImcResultView from "./ImcResult";
import ErrorMessage from "./ErrorMessage";

type Props = {
  onCalculated?: (record: ImcRecord) => void;
};

export default function ImcForm({ onCalculated }: Props) {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<ImcResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    if (isNaN(alturaNum) || isNaN(pesoNum) || alturaNum <= 0 || pesoNum <= 0) {
      setError("Por favor, ingresa valores válidos (positivos y numéricos).");
      setResultado(null);
      return;
    }

    try {
      const data = await calcularImc(alturaNum, pesoNum);
      setResultado(data);
      setError("");

      if (onCalculated) {
        const now = new Date();
        const record: ImcRecord = {
          id: String(now.getTime()),
          fecha: now.toISOString(),
          peso: pesoNum,
          altura: alturaNum,
          imc: data.imc,
          categoria: data.categoria,
        };
        onCalculated(record);
      }
    } catch (err) {
      setError("Error al calcular el IMC. Verifica si el backend está corriendo.");
      setResultado(null);
    }
  };

  return (
    <section className="card card-gray">
      <h1 className="section-title text-center">Calculadora de IMC</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <NumberInput
          label="Altura (m):"
          value={altura}
          onChange={setAltura}
          step={0.01}
          min={0.1}
        />
        <NumberInput
          label="Peso (kg):"
          value={peso}
          onChange={setPeso}
          min={1}
        />
        <div className="actions flex justify-center">
          <button type="submit" className="btn primary shadow-md hover:scale-105 transition-transform">
            Calcular
          </button>
        </div>
      </form>

      <ImcResultView result={resultado} />
      <ErrorMessage message={error} />
    </section>
  );
}
