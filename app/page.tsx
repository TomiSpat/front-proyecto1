"use client"
import ImcForm from "../components/imc-form"
import Navigation from "../components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calculadora de IMC</h1>
          <p className="text-muted-foreground">
            Calcula tu Índice de Masa Corporal y mantén un seguimiento de tu salud
          </p>
        </div>

        <ImcForm />
      </main>
    </div>
  )
}
