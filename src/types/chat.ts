export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
};

export type ChatMessageInput = Pick<ChatMessage, "role" | "text">;

export type ChatApiResponse = {
  reply?: string;
  message?: string;
  text?: string;
};

export type YoloStreamObject = {
  label: string;
  confidence?: number;
};

export type YoloStreamPayload = {
  frame?: string;
  summary?: string;
  message?: string;
  reply?: string;
  text?: string;
  objects?: YoloStreamObject[];
};
