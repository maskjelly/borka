"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import ParaphraseApp from "@/components/paraphrase-app"

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-14 items-center">
            <h1 className="text-xl font-semibold">AI Paraphraser</h1>
          </div>
        </header>

        <main className="container py-6">
          <ParaphraseApp />
        </main>

        <Toaster />
      </div>
    </ThemeProvider>
  )
}
