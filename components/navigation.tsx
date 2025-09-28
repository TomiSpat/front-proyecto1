"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BarChart3, History } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Calculadora",
    href: "/",
    icon: Activity,
  },
  {
    name: "Estadísticas",
    href: "/estadisticas",
    icon: BarChart3,
  },
  {
    name: "Historial",
    href: "/historial",
    icon: History,
  },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">IMC App</span>
          </Link>

          <div className="flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
