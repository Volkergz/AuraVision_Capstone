import { CHAT_BACKEND } from "../constants/chat";
import { ChatApiResponse, ChatMessage, ChatMessageInput } from "../types/chat";

function toMessagePayload(messages: ChatMessage[]): ChatMessageInput[] {
  return messages.map(({ role, text }) => ({ role, text }));
}

export async function sendChatMessage(
  messages: ChatMessage[],
): Promise<string> {
  if (!CHAT_BACKEND.apiUrl) {
    throw new Error(
      "Configura CHAT_BACKEND.apiUrl para conectar un backend de chat real.",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    CHAT_BACKEND.requestTimeoutMs,
  );

  try {
    const response = await fetch(CHAT_BACKEND.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: toMessagePayload(messages) }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Chat backend responded with status ${response.status}.`);
    }

    const payload = (await response.json()) as ChatApiResponse;
    const reply = payload.reply ?? payload.message ?? payload.text;

    if (typeof reply !== "string" || reply.trim().length === 0) {
      throw new Error("El backend no devolvio una respuesta valida.");
    }

    return reply.trim();
  } finally {
    clearTimeout(timeout);
  }
}
