export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type LeadState = {
  asked: boolean;
  consent: boolean;
  email: string;
  facebook: string;
  submitted: boolean;
};
