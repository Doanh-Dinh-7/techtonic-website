"use client";

import { motion } from "framer-motion";

import { TeamOrgChart } from "@/features/about/components/team-org-chart";
import { useAboutTeamTabs } from "@/features/about/hooks/use-about-team-tabs";
import { aboutTeamSectionCopy } from "@/lib/content/about";
import { SectionShell } from "@/shared/ui-v2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { cn } from "@/shared/utils";

export function Team() {
  const { terms, termId, boardId, activeTerm, activeBoard, selectTerm, selectBoard } =
    useAboutTeamTabs();

  return (
    <SectionShell
      id="about-team"
      tone="dark"
      align="center"
      className="border-t border-border bg-transparent py-16 lg:py-24 dark:border-white/10"
      contentClassName="max-w-7xl"
      title={aboutTeamSectionCopy.title}
      description={aboutTeamSectionCopy.description}
    >
      <Tabs value={termId} onValueChange={selectTerm} className="w-full">
        <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-center gap-2 border-b border-border bg-transparent pb-4 dark:border-white/10">
          {terms.map((term) => (
            <TabsTrigger
              key={term.id}
              value={term.id}
              className={cn(
                "rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 text-muted-foreground shadow-none dark:text-white/60",
                "data-[state=active]:border-cyan-700 data-[state=active]:bg-transparent data-[state=active]:text-cyan-700",
                "dark:data-[state=active]:border-neon-cyan dark:data-[state=active]:text-neon-cyan"
              )}
            >
              {term.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {terms.map((term) => (
          <TabsContent key={term.id} value={term.id} className="mt-0">
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {term.boards.map((board) => (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => selectBoard(board.id)}
                  aria-pressed={termId === term.id && boardId === board.id}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-sm transition-all",
                    termId === term.id && boardId === board.id
                      ? "border-cyan-700/60 bg-cyan-700/10 text-cyan-800 shadow-[0_0_15px_rgba(14,116,144,0.16)] dark:border-neon-cyan/50 dark:bg-neon-cyan/10 dark:text-neon-cyan dark:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                      : "border-border bg-card/80 text-muted-foreground hover:border-primary/20 hover:text-foreground dark:border-white/10 dark:bg-white/[0.06] dark:text-white/60 dark:hover:border-white/20 dark:hover:text-white/80"
                  )}
                >
                  {board.label}
                </button>
              ))}
            </div>

            {term.boards.map((board) => (
              <div
                key={board.id}
                hidden={!(termId === term.id && boardId === board.id)}
                className={termId === term.id && boardId === board.id ? "block" : "hidden"}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <TeamOrgChart hierarchy={board.hierarchy} />
                </motion.div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {activeTerm && activeBoard && (
        <p className="sr-only">
          Đang xem {activeBoard.label} - {activeTerm.label}
        </p>
      )}
    </SectionShell>
  );
}
