"use client"

import api from "@/services/api"
import { getImcHistory } from "@/services/imcService"
import { ChartData, IMCRecord, MetricasAgregadas } from "@/types/stats"
import { useState, useEffect } from "react"

export function useStatsDashboard() {
    const [records, setRecords] = useState<IMCRecord[]>([])
    const [chartData, setChartData] = useState<ChartData[]>([])
    const [metricas, setMetricas] = useState<MetricasAgregadas | null>(null)

    useEffect(() => {
        const fetchImcHistory = async () => {
            const savedRecords = await getImcHistory()
            if (savedRecords.length === 0) {
                throw new Error('Error fetching IMC history')
            }
            if (savedRecords) {
                const parsedRecords: IMCRecord[] = savedRecords
                setRecords(parsedRecords)
            }
        }
        fetchImcHistory()
    }, [])

    useEffect(() => {
        // const fetchImcHistory = async () => {
        //     const savedRecords = await getImcHistory()
        //     if (savedRecords.length === 0) {
        //         throw new Error('Error fetching IMC history')
        //     }
        //     if (savedRecords) {
        //         const parsedRecords: IMCRecord[] = savedRecords
        //         setRecords(parsedRecords)
        //     }
        // }
        // fetchImcHistory()
        if (records) {
            //   const parsedRecords: IMCRecord[] = savedRecords
            //   setRecords(parsedRecords)

            // Preparar datos para gráficos
            const chartDataFormatted = records
                .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
                .map((record) => ({
                    fecha: record.fecha,
                    peso: record.peso,
                    imc: Number.parseFloat(record.imc.toFixed(1)),
                    fechaCorta: new Date(record.fecha).toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                    }),
                }))
            console.log('Chart Data Formatted:', chartDataFormatted) // Verifica los datos del gráfico aquí

            setChartData(chartDataFormatted)

            // Calcular métricas agregadas
            if (records.length > 0) {
                const metricsCalculated = calcularMetricas(records)
                setMetricas(metricsCalculated)
            }
        }
    }, [records])

    const calcularMetricas = (records: IMCRecord[]): MetricasAgregadas => {
        const totalRegistros = records.length
        const imcPromedio = records.reduce((sum, record) => sum + record.imc, 0) / totalRegistros
        const pesoPromedio = records.reduce((sum, record) => sum + record.peso, 0) / totalRegistros

        // Ordenar por fecha para calcular tendencia
        const recordsOrdenados = [...records].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

        const ultimoIMC = recordsOrdenados[recordsOrdenados.length - 1].imc
        const categoriaActual = recordsOrdenados[recordsOrdenados.length - 1].categoria

        let tendenciaIMC: "subiendo" | "bajando" | "estable" = "estable"
        let cambioIMC = 0

        if (recordsOrdenados.length > 1) {
            const primerIMC = recordsOrdenados[0].imc
            cambioIMC = ultimoIMC - primerIMC

            if (Math.abs(cambioIMC) < 0.5) {
                tendenciaIMC = "estable"
            } else if (cambioIMC > 0) {
                tendenciaIMC = "subiendo"
            } else {
                tendenciaIMC = "bajando"
            }
        }

        return {
            totalRegistros,
            imcPromedio,
            pesoPromedio,
            tendenciaIMC,
            cambioIMC,
            ultimoIMC,
            categoriaActual,
        }
    }

    return {
        records,
        chartData,
        metricas,
    }
}
