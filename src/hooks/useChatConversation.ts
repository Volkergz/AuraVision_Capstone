import { useRef, useState } from "react";
import { sendChatMessage } from "../services/chatService";
import { ChatMessage } from "../types/chat";

export function useChatConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const lastAssistantTextRef = useRef<string | null>(null);

  const appendAssistantMessage = (text: string) => {
    const clean = text.trim();
    if (!clean || lastAssistantTextRef.current === clean) {
      return;
    }

    lastAssistantTextRef.current = clean;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: clean,
        createdAt: Date.now(),
      },
    ]);
  };

  const canSend = input.trim().length > 0 && !isSending;

  const sendMessage = async () => {
    const clean = input.trim();
    if (!clean || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: clean,
      createdAt: Date.now(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setErrorText(null);

    try {
      const replyText = await sendChatMessage(nextMessages);
      appendAssistantMessage(replyText);
    } catch (error) {
      setErrorText(
        error instanceof Error
          ? error.message
          : "No se pudo enviar el mensaje.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isSending,
    canSend,
    errorText,
    sendMessage,
    appendAssistantMessage,
  };
}
