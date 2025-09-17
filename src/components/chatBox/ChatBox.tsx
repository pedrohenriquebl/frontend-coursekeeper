"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useChat from "@/hooks/useChat";
import ConfirmClearModal from "./ConfirmClearModal";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxMessages from "./ChatBoxMessages";
import ChatBoxInput from "./ChatBoxInput";
import { useAuthUser } from "@/context/authUserContext";

export default function ChatBox() {
    const { messages, setMessages, addMessage } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const { user } = useAuthUser();

    if (!user) return null;
    if (user.subscriptionPlan !== "PLATINUM") return null;

    function handleSend(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;
        addMessage(input);
        setInput("");
    }

    function handleClear() {
        setShowConfirm(true);
    }

    function confirmClear() {
        setMessages([]);
        localStorage.removeItem("chat_messages");
        setShowConfirm(false);
    }

    function cancelClear() {
        setShowConfirm(false);
    }

    return (
        <>
            <ConfirmClearModal show={showConfirm} onConfirm={confirmClear} onCancel={cancelClear} />
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 p-4 rounded-full shadow-lg z-50 transition-colors"
                style={{
                    background: "var(--authform-primary)",
                    color: "var(--primary-foreground)",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--authform-primary-hover, var(--authform-primary-light))";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--authform-primary)";
                }}
            >
                {isOpen ? <span className="sr-only">Fechar chat</span> : <span className="sr-only">Abrir chat</span>}
                <MessageCircle size={24} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chatbox"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="
                            fixed bottom-16 right-4 w-80 h-96
                            md:bottom-16 md:right-4 md:h-[32rem]
                            shadow-2xl rounded-2xl flex flex-col
                            z-40
                            md:max-h-[80vh]
                            md:max-w-[90vw]
                            md:w-[28rem]
                        "
                        style={{
                            background: "var(--card)",
                            color: "var(--card-foreground)",
                        }}
                    >
                        <ChatBoxHeader onClear={handleClear} onClose={() => setIsOpen(false)} />
                        <ChatBoxMessages messages={messages} isOpen={isOpen} />
                        <ChatBoxInput input={input} setInput={setInput} onSend={handleSend} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
