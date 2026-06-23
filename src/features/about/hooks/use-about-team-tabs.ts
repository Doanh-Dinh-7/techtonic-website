"use client";

import { useCallback, useMemo, useState } from "react";

import {
  DEFAULT_ABOUT_TEAM_BOARD_ID,
  DEFAULT_ABOUT_TEAM_TERM_ID,
  aboutTeamTerms,
} from "@/lib/content/about-team";
import type { AboutTeamBoard, AboutTeamTerm } from "@/lib/content/types";

export function useAboutTeamTabs(terms: AboutTeamTerm[] = aboutTeamTerms) {
  const [termId, setTermId] = useState(DEFAULT_ABOUT_TEAM_TERM_ID);
  const [boardId, setBoardId] = useState(DEFAULT_ABOUT_TEAM_BOARD_ID);

  const activeTerm = useMemo(
    () => terms.find((term) => term.id === termId) ?? terms[0],
    [termId, terms]
  );

  const activeBoard = useMemo((): AboutTeamBoard | undefined => {
    if (!activeTerm) return undefined;
    return activeTerm.boards.find((board) => board.id === boardId) ?? activeTerm.boards[0];
  }, [activeTerm, boardId]);

  const selectTerm = useCallback(
    (nextTermId: string) => {
      setTermId(nextTermId);
      const nextTerm = terms.find((term) => term.id === nextTermId);
      const firstBoard = nextTerm?.boards[0];
      if (firstBoard) {
        setBoardId(firstBoard.id);
      }
    },
    [terms]
  );

  const selectBoard = useCallback((nextBoardId: string) => {
    setBoardId(nextBoardId);
  }, []);

  return {
    terms,
    termId,
    boardId,
    activeTerm,
    activeBoard,
    selectTerm,
    selectBoard,
  };
}
