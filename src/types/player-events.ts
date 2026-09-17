export const PLAYER_EVENTS = {
  STATE: "player:state",
  PLAY: "player:cmd:play",
  PAUSE: "player:cmd:pause",
  UI_OPEN: "player:ui:open",
  UI_CLOSE: "player:ui:close",
} as const;

export interface AudioTrack {
  src: string;
  cover?: string;
  title?: string;
}

export interface PlayerState {
  isPlaying: boolean;
  track: AudioTrack;
  progress: number;
  currentTime: number;
  duration: number;
}

export interface PlayerEventMap {
  [PLAYER_EVENTS.STATE]: CustomEvent<PlayerState>;
  [PLAYER_EVENTS.PLAY]: Event;
  [PLAYER_EVENTS.PAUSE]: Event;
  [PLAYER_EVENTS.UI_OPEN]: Event;
  [PLAYER_EVENTS.UI_CLOSE]: Event;
}

export type PlayerEventName = keyof PlayerEventMap;
export type PlayerSignalEventName = Exclude<PlayerEventName, typeof PLAYER_EVENTS.STATE>;

declare global {
  // DOM event maps require interface merging; a type alias cannot extend Window's events.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface WindowEventMap extends PlayerEventMap {}
}
