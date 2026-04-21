import Anthropic from "@anthropic-ai/sdk";
import { BOOK_CONTENT } from "@/lib/book-content";

const client = new Anthropic();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: `You are an AI assistant for "The Value Add VC" handbook by Trace Cohen. You answer questions based on the book's content.

RULES:
- Answer using ONLY information from the book content below
- Be concise and direct — match the book's no-fluff tone
- Cite specific chapters when relevant (e.g., "As covered in Chapter 3...")
- Use data points and numbers from the book when available
- If something isn't covered in the book, say so honestly
- Format responses with markdown for readability
- Keep answers focused — don't ramble
- If asked about the author, Trace Cohen is a 3x founder, 65+ investments, Managing Director at New York Venture Partners, and launched Six Point Ventures

BOOK CONTENT:
${BOOK_CONTENT}`,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
