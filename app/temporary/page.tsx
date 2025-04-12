"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatInterface from "@/components/chat-interface"
import EditorInterface from "@/components/editor-interface"
// import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    // <ThemeProvider attribute="class" defaultTheme="dark">
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-14 items-center">
          <h1 className="text-xl font-semibold">AI Writer</h1>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </main>

      <Toaster />
    </div>
    // </ThemeProvider>
  )
}
