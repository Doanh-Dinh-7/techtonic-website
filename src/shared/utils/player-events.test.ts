/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from "vitest";
import { PLAYER_EVENTS } from "@/types/player-events";
import { emitPlayerEvent, subscribePlayerEvent } from "./player-events";

describe("player events", () => {
  it("delivers UI signals only to active subscribers of that event", () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const unsubscribeOpen = subscribePlayerEvent(PLAYER_EVENTS.UI_OPEN, onOpen);
    const unsubscribeClose = subscribePlayerEvent(PLAYER_EVENTS.UI_CLOSE, onClose);

    try {
      emitPlayerEvent(PLAYER_EVENTS.UI_OPEN);
      expect(onOpen).toHaveBeenCalledOnce();
      expect(onClose).not.toHaveBeenCalled();

      unsubscribeOpen();
      emitPlayerEvent(PLAYER_EVENTS.UI_OPEN);
      emitPlayerEvent(PLAYER_EVENTS.UI_CLOSE);
      expect(onOpen).toHaveBeenCalledOnce();
      expect(onClose).toHaveBeenCalledOnce();
    } finally {
      unsubscribeOpen();
      unsubscribeClose();
    }
  });
});
