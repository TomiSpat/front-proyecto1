"use client"
import Navigation from "../../components/navigation"
import HistorySection from "../../components/history-section"

export default function HistorialPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Historial de IMC</h1>
          <p className="text-muted-foreground">Revisa tu historial completo de cálculos de IMC</p>
        </div>

        <HistorySection />
      </main>
    </div>
  )
}
