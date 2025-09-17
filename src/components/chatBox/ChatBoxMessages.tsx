'use client'

import { useLayoutEffect, useRef } from "react";

interface Message {
    content: string;
    role: string;
    side: string;
}

interface ChatBoxMessagesProps {
    messages: Message[];
    isLoading?: boolean;
    isOpen: boolean;
}

export default function ChatBoxMessages({ messages, isOpen }: ChatBoxMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        }
    }, [messages, isOpen]);

    return (
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
                <div
                    key={i}
                    className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className="px-3 py-2 rounded-lg max-w-[70%]"
                        style={{
                            background:
                                msg.role === "user"
                                    ? "var(--authform-primary)"
                                    : "var(--muted)",
                            color:
                                msg.role === "user"
                                    ? "var(--primary-foreground)"
                                    : "var(--muted-foreground)",
                        }}
                    >
                        {msg.content === "..." ? (
                            <span className="flex gap-1">
                                <span className="dot animate-bounce">●</span>
                                <span className="dot animate-bounce delay-150">●</span>
                                <span className="dot animate-bounce delay-300">●</span>
                            </span>
                        ) : (
                            msg.content
                        )}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}
