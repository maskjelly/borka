"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Send,
  Copy,
  RefreshCcw,
  Trash2,
} from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function ParaphraseApp() {
  const [inputContent, setInputContent] = useState("")
  const [outputContent, setOutputContent] = useState("")
  const [loading, setLoading] = useState(false)

  function clearContent() {
    setInputContent("")
    setOutputContent("")
  }

  async function paraphraseContent() {
    if (!inputContent.trim()) {
      toast.error("Input is empty!")
      return
    }

    setLoading(true)
    setOutputContent("")

    try {
      const response = await fetch('/api/paraphrase/stream', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moreContent: inputContent }),
      })

      if (!response.ok) {
        toast.error("Failed to paraphrase.")
        setLoading(false)
        return
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder("utf-8")

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        const chunk = decoder.decode(value)
        setOutputContent((prev) => prev + chunk)
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-4">
      {/* Left side - Input */}
      <div className="flex-1">
        <CardContent className="flex-grow p-0 flex flex-col">
          <Textarea
            className="w-full h-full min-h-[500px] resize-none p-4 border rounded-md focus-visible:ring-1"
            placeholder="Write your content here..."
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          <div className="p-4 bg-muted/30 flex justify-between items-center mt-2 rounded-md">
            <Button variant="outline" size="sm" onClick={clearContent}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button onClick={paraphraseContent} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Paraphrase
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </div>

      {/* Right side - Output */}
      <div className="flex-1">
        <CardContent className="h-full p-0">
          <div className="min-h-[500px] p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">
            {outputContent || "Paraphrased content will appear here..."}
          </div>
          {outputContent && (
            <div className="p-4 bg-muted/30 flex justify-end mt-2 rounded-md">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  navigator.clipboard.writeText(outputContent);
                  toast.success("Copied to clipboard!");
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  )
}
