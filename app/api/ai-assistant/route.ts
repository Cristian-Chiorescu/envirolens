import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, context } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
      context: unknown;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      reasoning_effort: "minimal",
      max_completion_tokens: 180,

      messages: [
        {
          role: "system",
          content: `You are an environmental compliance assistant for Calgary, Alberta.

How you should answer:
- Sound natural and human, like a helpful colleague.
- Keep answers concise: usually 2–5 short sentences.
- Focus on what the user actually asked. Don’t repeat background info they already know.
- Only mention regulations (TIER, EPEA, OBPS, NPRI) when they are clearly relevant to the question.
- When you mention a regulation, explain it briefly in plain language instead of listing every framework.
- Do NOT repeat the full list of regulations in every answer.
- You don't need to end every reply with a question. 
  Only add a gentle follow-up like “If you’d like, I can also…” when it feels genuinely helpful.

If the user asks to "simplify" or "explain in simpler terms":
- Answer with at most 3 short sentences in very plain language.

Current Calgary Air Quality Data:
${context ? JSON.stringify(context, null, 2) : "No data available"}
`,
        },
        ...messages,
      ],
    });

    // 🔍 TEMP: log to see what we actually get back
    console.log("OpenAI completion:", JSON.stringify(completion, null, 2));

    const rawContent = completion.choices[0]?.message?.content;
    const responseMessage =
      (typeof rawContent === "string" ? rawContent.trim() : "") ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
