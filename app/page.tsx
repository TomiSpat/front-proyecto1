"use client"
import ImcForm from "../components/imc-form"
import HistorySection from "../components/history-section"
import { Activity, Sparkles } from "lucide-react"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Calculadora IMC
                <Sparkles className="w-5 h-5 text-accent" />
              </h1>
              <p className="text-muted-foreground">Tu herramienta para el seguimiento de salud personal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <ImcForm/>
        <HistorySection />
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">Calculadora de IMC - Mantén un seguimiento de tu salud</p>
        </div>
      </footer>
    </div>
  )
}
