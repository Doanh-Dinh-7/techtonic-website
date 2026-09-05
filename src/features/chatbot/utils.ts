export function uid() {
  return Math.random().toString(36).substring(2, 9);
}

export const STORAGE_KEY = "techtonic_chat_state_v2";

export function shouldAskLead(messages: { role: string }[]) {
  const userCount = messages.filter((m) => m.role === "user").length;
  return userCount >= 3;
}

// --- Rate Limit ---

const RATE_LIMIT_KEY = "techtonic_chat_rate_limit";
const MAX_QUESTIONS = 7;
const ANON_COOLDOWN_MS = 3 * 60 * 60 * 1000; // 3 giờ
const LEAD_COOLDOWN_MS = 1 * 60 * 60 * 1000; // 1 giờ

export type RateLimitState = {
  questionCount: number;
  firstQuestionAt: number; // timestamp ms
  hasLead: boolean;
};

function getDefaultRateLimit(): RateLimitState {
  return { questionCount: 0, firstQuestionAt: 0, hasLead: false };
}

export function loadRateLimit(): RateLimitState {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return getDefaultRateLimit();
    const data = JSON.parse(raw) as RateLimitState;
    // Auto-reset if cooldown has passed
    if (data.firstQuestionAt > 0) {
      const cooldown = data.hasLead ? LEAD_COOLDOWN_MS : ANON_COOLDOWN_MS;
      if (Date.now() - data.firstQuestionAt >= cooldown) {
        const reset: RateLimitState = {
          questionCount: 0,
          firstQuestionAt: 0,
          hasLead: data.hasLead,
        };
        saveRateLimit(reset);
        return reset;
      }
    }
    return data;
  } catch {
    return getDefaultRateLimit();
  }
}

export function saveRateLimit(state: RateLimitState) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function incrementQuestion(current: RateLimitState): RateLimitState {
  const updated: RateLimitState = {
    ...current,
    questionCount: current.questionCount + 1,
    firstQuestionAt: current.firstQuestionAt || Date.now(),
  };
  saveRateLimit(updated);
  return updated;
}

export function markHasLead(): RateLimitState {
  // Khi người dùng để lại lead, reset counter và cho thêm 7 câu
  const updated: RateLimitState = {
    questionCount: 0,
    firstQuestionAt: 0,
    hasLead: true,
  };
  saveRateLimit(updated);
  return updated;
}

export function isRateLimited(state: RateLimitState): boolean {
  return state.questionCount >= MAX_QUESTIONS;
}

export function getRemainingQuestions(state: RateLimitState): number {
  return Math.max(0, MAX_QUESTIONS - state.questionCount);
}

/** Tính thời gian còn lại trước khi reset (phút) */
export function getCooldownMinutes(state: RateLimitState): number {
  if (state.firstQuestionAt <= 0) return 0;
  const cooldown = state.hasLead ? LEAD_COOLDOWN_MS : ANON_COOLDOWN_MS;
  const elapsed = Date.now() - state.firstQuestionAt;
  const remaining = cooldown - elapsed;
  return remaining > 0 ? Math.ceil(remaining / 60_000) : 0;
}
