"use client";

import { AssistantStream } from "openai/lib/AssistantStream";
import { useState, useRef, useEffect } from "react";
import { AiOutlineUser, AiOutlineRobot, AiOutlineSend } from "react-icons/ai";
import Markdown from "react-markdown";
import { useEditorContext } from "./EditorProvider";
import { ChatRequestBody } from "../api/openai-assistant/route";

interface Message {
    id: string;
    role: string;
    content: string;
    createdAt: Date;
}

export default function OpenAIAssistant({
    assistantId = "",
    greeting = "I am a helpful chat assistant. How can I help you?",
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [streamingMessage, setStreamingMessage] = useState<Message>({
        id: "Thinking...",
        role: "assistant",
        content: "_Thinking..._",
        createdAt: new Date(),
    });
    const messageId = useRef(0);

    const { editor } = useEditorContext();

    // set default greeting Message
    const greetingMessage = {
        id: "greeting",
        role: "assistant",
        content: greeting,
        createdAt: new Date(),
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // clear streaming message
        setStreamingMessage({
            id: "Thinking...",
            role: "assistant",
            content: "_Thinking..._",
            createdAt: new Date(),
        });

        // add busy indicator
        setIsLoading(true);

        // add user message to list of messages
        messageId.current++;
        setMessages([
            ...messages,
            {
                id: messageId.current.toString(),
                role: "user",
                content: prompt,
                createdAt: new Date(),
            },
        ]);
        setPrompt("");

        // post new message to server and stream OpenAI Assistant response
        const response = await fetch("/api/openai-assistant", {
            method: "POST",
            body: JSON.stringify({
                assistantId: assistantId,
                threadId: threadId,
                content: prompt,
                code: editor ? editor.getValue() : null,
            } satisfies ChatRequestBody),
        });

        if (!response.body) {
            return;
        }
        const runner = AssistantStream.fromReadableStream(response.body);

        runner.on("messageCreated", (message) => {
            setThreadId(message.thread_id);
        });

        runner.on("textDelta", (_delta, contentSnapshot) => {
            const newStreamingMessage = {
                ...streamingMessage,
                content: contentSnapshot.value,
            };
            setStreamingMessage(newStreamingMessage);
        });

        runner.on("messageDone", (message) => {
            // get final message content
            const finalContent = message.content[0].type == "text" ? message.content[0].text.value : "";

            // add assistant message to list of messages
            messageId.current++;
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: messageId.current.toString(),
                    role: "assistant",
                    content: finalContent,
                    createdAt: new Date(),
                },
            ]);

            // remove busy indicator
            setIsLoading(false);
        });

        runner.on("error", (error) => {
            console.error(error);
        });
    }

    // handles changes to the prompt input field
    function handlePromptChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPrompt(e.target.value);
    }

    return (
        <>
            <div className="flex gap-4 flex-col relative overflow-y-auto">
                <OpenAIAssistantMessage message={greetingMessage} />
                {messages.map((m) => (
                    <OpenAIAssistantMessage key={m.id} message={m} />
                ))}
                {isLoading && <OpenAIAssistantMessage message={streamingMessage} />}
            </div>
            <form onSubmit={handleSubmit} className="flex relative">
                <input
                    disabled={isLoading}
                    autoFocus
                    className="rounded-full w-full py-2 px-4 placeholder:text-neutral-500 focus:uns text-[#ececec] bg-[#2f2f2f] focus:outline-none"
                    onChange={handlePromptChange}
                    value={prompt}
                    placeholder="Type a question..."
                />

                {isLoading ? (
                    <button
                        disabled
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <OpenAISpinner />
                    </button>
                ) : (
                    <button
                        disabled={prompt.length == 0}
                        className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline absolute right-1 top-1"
                    >
                        <AiOutlineSend />
                    </button>
                )}
            </form>
        </>
    );
}

export function OpenAIAssistantMessage({ message }: { message: Message }) {
    function displayRole(roleName: string) {
        switch (roleName) {
            case "user":
                return <AiOutlineUser />;
            case "assistant":
                return <AiOutlineRobot />;
        }
    }
    return (
        <div
            className={`flex rounded text-[#ececec] text-center ${
                message.role === "user" ? "flex-row-reverse" : ""
            }`}
        >
            <div
                className={`text-2xl p-2 text-black bg-white rounded-full h-fit ${
                    message.role === "user" && "hidden"
                }`}
            >
                {displayRole(message.role)}
            </div>
            <div className="text-left p-2 px-4 rounded-lg mb-2">
                <Markdown>{message.content}</Markdown>
            </div>
        </div>
    );
}

// Based on https://flowbite.com/docs/components/spinner/
function OpenAISpinner() {
    return (
        <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
            />
        </svg>
    );
}
