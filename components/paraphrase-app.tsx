"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Send,
  Copy,
  RefreshCcw,
  Trash2,
  Brain,
  BarChart,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Bot,
  ChevronDown,
} from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ReactMarkdown from "react-markdown"

interface Metrics {
  tokensPerSecond: number
  wordCount: number
  thinkingTime: number
  processingTime: number
  inputTokens: number
  outputTokens: number
  tpsData: Array<{
    time: number
    tps: number
  }>
}

const ThinkingState = () => (
  <div className="flex flex-col space-y-4 p-4 bg-muted/50 rounded-lg border border-border/50">
    <div className="flex items-center space-x-2">
      <Bot className="h-5 w-5 text-primary animate-pulse" />
      <span className="font-medium">AI Assistant is thinking...</span>
    </div>
    <div className="space-y-2">
      <div className="h-2 w-[60%] bg-muted-foreground/20 rounded animate-pulse" />
      <div className="h-2 w-[80%] bg-muted-foreground/20 rounded animate-pulse" />
      <div className="h-2 w-[40%] bg-muted-foreground/20 rounded animate-pulse" />
    </div>
  </div>
)

const PerformanceMetrics = ({ metrics }: { metrics: Metrics }) => (
  <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <BarChart className="h-4 w-4" />
      Performance Metrics
    </h3>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div>
        <p className="text-sm text-muted-foreground">Input Tokens</p>
        <p className="text-lg font-medium">{metrics.inputTokens}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Output Tokens</p>
        <p className="text-lg font-medium">{metrics.outputTokens}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Current TPS</p>
        <p className="text-lg font-medium">{metrics.tokensPerSecond.toFixed(2)}</p>
      </div>
    </div>
    {metrics.tpsData.length > 0 && (
      <div className="h-40 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={metrics.tpsData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="tpsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="time"
              stroke="var(--muted-foreground)"
              tickFormatter={(value) => `${value.toFixed(1)}s`}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              tickFormatter={(value) => `${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              }}
              labelFormatter={(value) => `Time: ${Number(value).toFixed(1)}s`}
              formatter={(value: any) => [`${Number(value).toFixed(2)} tok/s`, "TPS"]}
            />
            <Area
              type="monotone"
              dataKey="tps"
              stroke="var(--primary)"
              fill="url(#tpsGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
)

interface OutputContentProps {
  content: string
  thinkingContent: string
  isPreview: boolean
  onCopy: () => void
  setIsPreview: (value: boolean) => void
}

const OutputContent = ({
  content,
  thinkingContent,
  isPreview,
  onCopy,
  setIsPreview,
}: OutputContentProps) => {
  const outputRef = useRef<HTMLDivElement>(null)
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(true)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [content, thinkingContent, isPreview])

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="mb-2 flex-shrink-0">
        <ToggleGroup
          type="single"
          value={isPreview ? "preview" : "raw"}
          onValueChange={(val) => setIsPreview(val === "preview")}
        >
          <ToggleGroupItem value="raw">Raw</ToggleGroupItem>
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex-1 min-h-0 relative">
        <div
          ref={outputRef}
          className="absolute inset-0 p-4 bg-muted/50 rounded-lg border border-border/50 text-sm overflow-y-auto"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Bot className="h-5 w-5 text-primary mt-1" />
            </div>
            <div className="flex-1 space-y-2">
              {thinkingContent && (
                <div className="mb-4 bg-muted/80 border border-border/50 rounded-md overflow-hidden">
                  <button
                    onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                    className="w-full p-3 flex items-center gap-2 hover:bg-muted/50 transition-colors"
                  >
                    <Brain className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-medium text-amber-500">
                      AI Thinking Process
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 ml-auto transition-transform ${
                        isThinkingExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isThinkingExpanded && (
                    <div className="p-3 pt-0 text-muted-foreground text-sm font-mono border-t border-border/50">
                      {isPreview ? (
                        <div className="prose prose-neutral dark:prose-invert max-w-none prose-sm opacity-70">
                          <ReactMarkdown>{thinkingContent}</ReactMarkdown>
                        </div>
                      ) : (
                        thinkingContent
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="min-h-[100px]">
                {content ? (
                  isPreview ? (
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  ) : (
                    content
                  )
                ) : (
                  "Paraphrased content will appear here..."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {content && (
        <div className="p-4 bg-muted/30 flex justify-end mt-2 rounded-md flex-shrink-0">
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      )}
    </div>
  )
}

export default function ParaphraseApp() {
  const [inputContent, setInputContent] = useState("")
  const [outputContent, setOutputContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [metrics, setMetrics] = useState<Metrics>({
    tokensPerSecond: 0,
    wordCount: 0,
    thinkingTime: 0,
    processingTime: 0,
    inputTokens: 0,
    outputTokens: 0,
    tpsData: [],
  })
  const outputRef = useRef<HTMLDivElement>(null)
  const startTime = useRef<number>(0)
  const [thinkingContent, setThinkingContent] = useState("")

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [outputContent])

  const insertMarkdownSyntax = (syntax: string) => {
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = inputContent
    const before = text.substring(0, start)
    const selected = text.substring(start, end)
    const after = text.substring(end)

    const syntaxMap: Record<string, (text: string) => string> = {
      bold: (text) => `**${text}**`,
      italic: (text) => `*${text}*`,
      list: (text) => `\n- ${text}`,
      orderedList: (text) => `\n1. ${text}`,
      quote: (text) => `> ${text}`,
      code: (text) => `\`${text}\``,
    }

    const wrappedText = syntaxMap[syntax]?.(selected) || selected
    setInputContent(before + wrappedText + after)
  }

  function clearContent() {
    setInputContent("")
    setOutputContent("")
    setMetrics({
      tokensPerSecond: 0,
      wordCount: 0,
      thinkingTime: 0,
      processingTime: 0,
      inputTokens: 0,
      outputTokens: 0,
      tpsData: [],
    })
  }

  async function paraphraseContent() {
    if (!inputContent.trim()) {
      toast.error("Input is empty!")
      return
    }

    setLoading(true)
    setOutputContent("")
    setThinkingContent("")
    setIsThinking(true)
    startTime.current = Date.now()
    const startInputTokens = inputContent.split(/\s+/).length

    // Initialize metrics including tpsData
    setMetrics({
      tokensPerSecond: 0,
      wordCount: 0,
      thinkingTime: 0,
      processingTime: 0,
      inputTokens: startInputTokens, // Set initial input tokens
      outputTokens: 0,
      tpsData: [], // Start with an empty array
    })

    try {
      const response = await fetch("/api/paraphrase/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moreContent: inputContent }),
      })

      if (!response.ok) {
        toast.error("Failed to paraphrase.")
        setLoading(false)
        return
      }

      setIsThinking(false)
      const thinkingTime = (Date.now() - startTime.current) / 1000

      const reader = response.body?.getReader()
      const decoder = new TextDecoder("utf-8")
      let totalTokens = 0
      let lastUpdateTime = Date.now()
      let buffer = ""
      let inThinkingMode = false
      let currentThinking = ""
      let finalOutput = ""

      const initialProcessingStartTime = Date.now()

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        buffer += chunk
        const chunkTokens = chunk.split(/\s+/).filter(Boolean).length
        totalTokens += chunkTokens

        while (buffer.length > 0) {
          if (!inThinkingMode && buffer.includes("<think>")) {
            const parts = buffer.split("<think>", 2)
            finalOutput += parts[0]
            buffer = parts[1]
            inThinkingMode = true
            setOutputContent(finalOutput)
          } else if (inThinkingMode && buffer.includes("</think>")) {
            const parts = buffer.split("</think>", 2)
            currentThinking += parts[0]
            buffer = parts[1]
            inThinkingMode = false
            setThinkingContent(currentThinking)
          } else if (inThinkingMode) {
            currentThinking += buffer
            setThinkingContent(currentThinking)
            buffer = ""
          } else {
            finalOutput += buffer
            setOutputContent(finalOutput)
            buffer = ""
          }
        }

        const now = Date.now()
        const currentProcessingTime = (now - initialProcessingStartTime) / 1000
        const totalElapsedTime = (now - startTime.current) / 1000

        const timeSinceLastUpdate = (now - lastUpdateTime) / 1000

        const safeProcessingTime = Math.max(currentProcessingTime, 0.001)
        const currentOverallTPS = totalTokens / safeProcessingTime

        setMetrics((prev) => {
          let newTpsData = prev.tpsData
          if (timeSinceLastUpdate >= 0.5 && currentProcessingTime > 0) {
            const newDataPoint = { time: totalElapsedTime, tps: currentOverallTPS }
            newTpsData = [...prev.tpsData, newDataPoint]
            lastUpdateTime = now
          }

          return {
            ...prev,
            tokensPerSecond: currentOverallTPS,
            wordCount: finalOutput.split(/\s+/).filter(Boolean).length,
            thinkingTime: thinkingTime,
            processingTime: totalElapsedTime,
            outputTokens: totalTokens,
            tpsData: newTpsData,
          }
        })
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setIsThinking(false)
      setMetrics((prev) => ({
        ...prev,
        processingTime: (Date.now() - startTime.current) / 1000,
      }))
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col p-4 bg-background">
      <div className="flex gap-4 flex-1 h-[calc(100vh-2rem)]">
        {/* Left side - Input */}
        <div className="flex-1">
          <CardContent className="h-full p-0 flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <ToggleGroup type="multiple" className="flex flex-wrap gap-1">
                <ToggleGroupItem
                  value="bold"
                  onClick={() => insertMarkdownSyntax("bold")}
                >
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic"
                  onClick={() => insertMarkdownSyntax("italic")}
                >
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="list"
                  onClick={() => insertMarkdownSyntax("list")}
                >
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="orderedList"
                  onClick={() => insertMarkdownSyntax("orderedList")}
                >
                  <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="quote"
                  onClick={() => insertMarkdownSyntax("quote")}
                >
                  <Quote className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="code"
                  onClick={() => insertMarkdownSyntax("code")}
                >
                  <Code className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex-1 relative">
              <Textarea
                className="absolute inset-0 resize-none p-4 border rounded-md focus-visible:ring-1 font-mono"
                placeholder="Write your content here... (Markdown supported)"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
              />
            </div>
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

        {/* Right side - Output and Metrics */}
        <div className="flex-1 flex flex-col gap-4">
          {isThinking ? (
            <ThinkingState />
          ) : (
            <>
              <PerformanceMetrics metrics={metrics} />
              <OutputContent
                content={outputContent}
                thinkingContent={thinkingContent}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
                onCopy={() => {
                  navigator.clipboard.writeText(outputContent)
                  toast.success("Copied to clipboard!")
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
