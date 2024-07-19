import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// this enables Edge Functions in Vercel
// see https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
// and updated here: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const runtime = "edge";

export type ChatRequestBody = {
    assistantId: string;
    threadId: string | null;
    content: string;
    code: string | null;
};

// post a new message and stream OpenAI Assistant response
export async function POST(request: NextRequest) {
    // parse message from post
    const newMessage: ChatRequestBody = await request.json();

    // create OpenAI client
    const openai = new OpenAI();

    // if no thread id then create a new openai thread
    if (newMessage.threadId == null) {
        const thread = await openai.beta.threads.create();
        newMessage.threadId = thread.id;
    }

    // add new message to thread
    await openai.beta.threads.messages.create(newMessage.threadId, {
        role: "user",
        content: newMessage.content,
    });

    if (newMessage.code) {
        await openai.beta.threads.messages.create(newMessage.threadId, {
            role: "user",
            content: `Here is my most up-to-date code from the inline code-editor.
                ${newMessage.code}`,
        });
    }

    // create a run
    const stream = await openai.beta.threads.runs.create(newMessage.threadId, {
        assistant_id: newMessage.assistantId,
        stream: true,
    });

    return new Response(stream.toReadableStream());
}
