'use client';

import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import {
  Send,
  Copy,
  RefreshCcw,
  Trash2,
  ChevronDown,
  ChevronUp,
  Menu,
  User,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  timestamp?: number;
}

interface TpsDataPoint {
  time: number;
  tps: number;
}

export default function ParaphraseApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedThinking, setExpandedThinking] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [tps, setTps] = useState(0);
  const [averageResponseTime, setAverageResponseTime] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [tpsData, setTpsData] = useState<TpsDataPoint[]>([]);

  const lastThinkingTime = useRef<number>(0);
  const responseTimes = useRef<number[]>([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard');
  };

  const clearChat = () => {
    setMessages([]);
    setExpandedThinking([]);
    toast.info('Chat cleared');
    setTps(0);
    setAverageResponseTime(0);
    setMessageCount(0);
    lastThinkingTime.current = 0;
    responseTimes.current = [];
    setTpsData([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleThinking = (index: number) => {
    setExpandedThinking((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const calculateTps = (currentTime: number) => {
    if (lastThinkingTime.current > 0) {
      const timeDiff = (currentTime - lastThinkingTime.current) / 1000; // in seconds
      const calculatedTps = timeDiff > 0 ? 1 / timeDiff : 0;
      setTps(calculatedTps);

      // Update TPS data for the chart
      setTpsData((prevData) => [...prevData, { time: currentTime, tps: calculatedTps }]);
    }
    lastThinkingTime.current = currentTime;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setError(null);

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input, timestamp: Date.now() },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const startTime = Date.now();

    try {
      const res = await fetch('/api/paraphrase/stream', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      if (!res.body) {
        throw new Error('Response has no body');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantReply = '';
      let currentThinking = '';
      let isInThinkingMode = false;
      let messageIndex = newMessages.length;

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: '',
          thinking: '',
          timestamp: Date.now(),
        },
      ]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value);

          for (let i = 0; i < chunk.length; i++) {
            if (chunk.substring(i, i + 7) === '<think>' && !isInThinkingMode) {
              isInThinkingMode = true;
              i += 6;
              continue;
            }

            if (chunk.substring(i, i + 8) === '</think>' && isInThinkingMode) {
              isInThinkingMode = false;
              i += 7;
              continue;
            }

            if (isInThinkingMode) {
              const thinkingStartTime = Date.now();
              currentThinking += chunk[i];
              setMessages((prev) => {
                const updated = [...prev];
                if (updated[messageIndex]) {
                  updated[messageIndex] = {
                    ...updated[messageIndex],
                    thinking: currentThinking,
                    timestamp: Date.now(),
                  };
                }
                return updated;
              });
              calculateTps(thinkingStartTime); // Calculate TPS when thinking happens
            } else {
              assistantReply += chunk[i];
              setMessages((prev) => {
                const updated = [...prev];
                if (updated[messageIndex]) {
                  updated[messageIndex] = {
                    ...updated[messageIndex],
                    content: assistantReply,
                    thinking: currentThinking,
                    timestamp: Date.now(),
                  };
                }
                return updated;
              });
            }
          }
        }
      }

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      responseTimes.current = [...responseTimes.current, responseTime];

      const totalResponseTime = responseTimes.current.reduce(
        (sum, time) => sum + time,
        0,
      );
      const avgResponseTime =
        responseTimes.current.length > 0
          ? totalResponseTime / responseTimes.current.length
          : 0;

      setAverageResponseTime(avgResponseTime);
      setMessageCount(newMessages.length);

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, an error occurred while processing your request.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-700 border border-zinc-600 rounded-md p-2 text-sm">
          <p className="text-zinc-300">{`Time: ${new Date(
            payload[0].payload.time
          ).toLocaleTimeString()}`}</p>
          <p className="text-zinc-300">{`TPS: ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100">
      {/* Chat Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-zinc-800 border-b border-zinc-700 py-3 px-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-zinc-400" />
            </Button>
            <h1 className="text-lg font-semibold ml-2">AI Paraphraser</h1>
          </div>
          <Button variant="outline" size="sm" onClick={clearChat}>
            <Trash2 className="h-4 w-4 mr-2 text-zinc-400" />
            Clear chat
          </Button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 mt-24">
                <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <h2 className="text-2xl font-semibold mb-2">
                  How can I help you today?
                </h2>
                <p className="max-w-md mx-auto">
                  Enter text to paraphrase, and I'll transform it into
                  sophisticated human-like writing.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-3/4 w-full ${
                    message.role === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-zinc-700 text-zinc-300 flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col w-full">
                    {/* Thinking section */}
                    {message.role === 'assistant' && message.thinking && (
                      <div className="mb-2 w-full">
                        <button
                          onClick={() => toggleThinking(index)}
                          className="flex items-center text-xs text-zinc-500 hover:text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full mb-1 focus:outline-none"
                        >
                          {expandedThinking.includes(index) ? (
                            <>
                              <ChevronUp className="h-3 w-3 mr-1" />
                              Hide thinking
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              Show thinking
                            </>
                          )}
                        </button>
                        {expandedThinking.includes(index) && (
                          <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3 text-sm text-zinc-400 whitespace-pre-wrap font-mono">
                            {message.thinking}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message content */}
                    <div
                      className={`px-4 py-2 rounded-lg break-words ${
                        message.role === 'user'
                          ? 'bg-zinc-600 text-zinc-200'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {message.content}
                    </div>

                    {/* Copy button for assistant messages */}
                    {message.role === 'assistant' && message.content && (
                      <div className="mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-zinc-500 hover:text-zinc-400 p-1"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-zinc-500 text-zinc-200 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center text-sm text-zinc-500">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-zinc-700 text-zinc-300 flex items-center justify-center">
                    <Bot className="h-4 w-4 animate-spin" />
                  </div>
                </div>
                <div className="ml-3 bg-zinc-800 px-4 py-2 rounded-lg">
                  Working on your request...
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center text-sm text-red-400">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-red-900 text-red-400 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3 bg-red-900/30 px-4 py-2 rounded-lg">
                  {error}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-zinc-800 border-t border-zinc-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2">
              <Textarea
                ref={textareaRef}
                className="flex-1 resize-none min-h-[50px] max-h-[150px] bg-zinc-700 border-zinc-600 text-zinc-200 focus-visible:ring-zinc-500"
                placeholder="Enter text to paraphrase..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
              >
                {loading ? (
                  <RefreshCcw className="h-4 w-4 animate-spin text-zinc-400" />
                ) : (
                  <Send className="h-4 w-4 text-zinc-400" />
                )}
              </Button>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
        <Toaster />
      </div>

      {/* Dashboard */}
      <aside className="w-80 bg-zinc-800 border-l border-zinc-700 p-4">
        <h2 className="text-lg font-semibold mb-4">Metrics</h2>
        <div className="space-y-3">
          <div>
            <p className="text-zinc-400 text-sm">TPS (Transactions/Sec)</p>
            <p className="text-zinc-200 font-medium">{tps.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-sm">Avg. Response Time</p>
            <p className="text-zinc-200 font-medium">
              {averageResponseTime.toFixed(2)} ms
            </p>
          </div>
          <div>
            <p className="text-zinc-400 text-sm">Total Messages</p>
            <p className="text-zinc-200 font-medium">{messageCount}</p>
          </div>
          {/* TPS Chart */}
          <div className="h-40">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Thinking TPS Over Time
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Real-time transactions per second during thinking phases.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart
                    data={tpsData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) =>
                        new Date(time).toLocaleTimeString()
                      }
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#aaa', fontSize: 10 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#aaa', fontSize: 10 }}
                    />
                    <Tooltip content={renderTooltip} />
                    <Area
                      type="monotone"
                      dataKey="tps"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </div>
  );
}
