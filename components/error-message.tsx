import { AlertCircle } from "lucide-react"

type Props = {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  if (!message) return null

  return (
    <div
      className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 
                    rounded-lg text-destructive animate-in slide-in-from-top-2 duration-300"
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
