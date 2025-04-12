import { SYSTEM_PROMPT } from '@/lib/prompt'
import { NextRequest } from 'next/server'

// Use Node.js runtime for full environment variable support.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { moreContent } = await req.json()

  // Use the correctly-named environment variable from .env.local.
  const deepseek = process.env.DEEPSEEK_API_KEY
  const system_prompt = SYSTEM_PROMPT as string
  const content = `${moreContent}`

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch('https://cloud.olakrutrim.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${deepseek}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'DeepSeek-R1',
          stream: true,
          messages: [
            {
              role: 'system',
              content: system_prompt,
            },
            {
              role: 'user',
              content: content,
            },
          ],
        }),
      })

      if (!response.body) {
        controller.close()
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        const chunks = buffer.split('\n\n')
        buffer = chunks.pop() ?? ''

        for (const chunk of chunks) {
          const line = chunk.trim()
          if (!line || !line.startsWith('data:')) continue

          const jsonPart = line.replace(/^data:\s*/, '')
          if (jsonPart === '[DONE]') {
            controller.close()
            return
          }

          try {
            const parsed = JSON.parse(jsonPart)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) {
              controller.enqueue(encoder.encode(content))
            }
          } catch (err) {
            console.error('Failed to parse chunk:', err)
          }
        }
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}
