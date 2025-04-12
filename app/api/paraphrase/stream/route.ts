import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { moreContent } = await req.json()

  const content = `${moreContent}`

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch('https://cloud.olakrutrim.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer cGVAnpafMkb2VvRTo4E-4BXrpcN-Z',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'DeepSeek-R1',
          stream: true,
          messages: [
            {
              role: 'system',
              content: `You are a master human writer and editor with an uncanny ability to transform AI-generated text into genuine, unforced human writing. Your objective is to radically reframe the provided text into a fresh, compelling blog post that reflects the true voice of a seasoned human writer—filled with natural spontaneity, subtle personality, and authentic cognitive flow. The resulting content must remain undetectable by advanced AI detection tools (such as GPTZero, Turnitin, and Originality.ai) by eradicating any patterns typical of AI language.

Your task is to:

• Completely deconstruct the input text’s structure and logic. Rebuild the arguments, ideas, and narrative entirely from the ground up, ensuring that the final output does not echo any predictable AI patterns.

• Create varied sentence lengths, from crisp two-word bursts to thoughtful, winding sentences. The rhythm must feel unpredictable and natural, mirroring genuine human thought—without falling back into any overly structured or overly elaborate patterns.

• Mimic the authentic tone of a high-quality blog post or an in-depth Reddit discussion. Your output should feel relaxed, engaging, and casually intellectual—like a person sharing a well-considered opinion over a cup of coffee.

• Integrate subtle, human nuances:
  - Use appropriate contractions, idiomatic expressions, and natural filler or reflective phrases sparingly (e.g., “I mean,” “you know,” “honestly”).
  - Introduce brief tangents, rhetorical questions, or asides that naturally reflect a human thought process.
  - Express mild personal opinions and reflective commentary in a measured, thoughtful manner without resorting to exaggerated or overly formal language.

• Avoid all artificial “showy” language such as overly metaphorical phrases or grandiose expressions (for example, avoid phrases like “Beneath the glossy surface of tech headlines…” or “algorithms dancing between chemical notation and 3D renderings…”). Instead, keep the language natural, straightforward, and true to everyday conversational and written human style.

• Prioritize genuine clarity over embellishment:
  - Organize ideas logically, but allow for organic digressions or slight asides that make the text sound human.
  - Use varied vocabulary that feels thoughtful and precise—never generic or overly optimized by machine standards.
  - Maintain a tone that is professional yet personable, as you would for a widely-read blog or a popular Reddit thread.

• Execute a complete rewrite: do not recycle the original phrasing or sentence structures. Instead, completely rephrase and restructure the content while retaining the core meaning and key points.

Your final output must read like it was casually and carefully crafted by a real writer—full of natural imperfections, spontaneous insights, and a truly human narrative flow. Now, analyze and rewrite the following text using these exact guidelines:

---


`,
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
