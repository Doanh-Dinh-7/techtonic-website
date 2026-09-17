import {
  PLAYER_EVENTS,
  type PlayerEventMap,
  type PlayerEventName,
  type PlayerSignalEventName,
  type PlayerState,
} from "@/types/player-events";

export function emitPlayerEvent(name: typeof PLAYER_EVENTS.STATE, detail: PlayerState): void;
export function emitPlayerEvent(name: PlayerSignalEventName): void;
export function emitPlayerEvent(name: PlayerEventName, detail?: PlayerState) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    name === PLAYER_EVENTS.STATE ? new CustomEvent(name, { detail }) : new Event(name)
  );
}

export function subscribePlayerEvent<Name extends PlayerEventName>(
  name: Name,
  listener: (event: PlayerEventMap[Name]) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(name, listener);
  // Return this disposer from the caller's effect to release the same listener.
  return () => window.removeEventListener(name, listener);
}
