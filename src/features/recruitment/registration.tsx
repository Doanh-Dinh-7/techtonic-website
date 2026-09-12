"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ExternalLink, Flame, Zap } from "lucide-react";

import { useCountdown } from "@/features/recruitment/hooks/use-countdown";
import { recruitmentRegistrationCopy, recruitmentSteps } from "@/lib/content/recruitment";
import { GlassCard, NeonButton, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const FORM_URL = process.env.NEXT_PUBLIC_GG_FORM ?? "#";
const isHiringOpen = process.env.NEXT_PUBLIC_IS_HIRING === "true";

function CountdownUnit({ value, label }: { value: number | string; label: string }) {
  const displayValue = typeof value === "number" ? String(value).padStart(2, "0") : value;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-neon-cyan/25 bg-neon-cyan/5 shadow-[0_0_15px_rgba(0,240,255,0.08)] sm:h-16 sm:w-16">
        <span
          suppressHydrationWarning
          className="font-paris2024 text-2xl font-bold tabular-nums text-cyan-700 dark:text-neon-cyan sm:text-3xl"
        >
          {displayValue}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-white/40 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function CountdownSection({
  cd,
  label,
  mounted,
}: {
  cd: ReturnType<typeof useCountdown>;
  label: string;
  mounted: boolean;
}) {
  const units = [
    { v: mounted ? cd.days : "--", l: "Ngày" },
    { v: mounted ? cd.hours : "--", l: "Giờ" },
    { v: mounted ? cd.minutes : "--", l: "Phút" },
    { v: mounted ? cd.seconds : "--", l: "Giây" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-widest text-muted-foreground dark:text-white/40">
        {label}
      </p>
      <div className="flex items-end justify-center gap-2 sm:gap-3">
        {units.map((item, i) => (
          <div key={item.l} className="flex items-end gap-2 sm:gap-3">
            <CountdownUnit value={item.v} label={item.l} />
            {i < units.length - 1 && (
              <span className="mb-5 text-xl font-bold text-cyan-400/60 dark:text-neon-cyan/50 sm:text-2xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RegistrationCTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const OPEN = process.env.NEXT_PUBLIC_RECRUITMENT_OPEN;
  const CLOSE = process.env.NEXT_PUBLIC_RECRUITMENT_CLOSE;

  const openCountdown = useCountdown(OPEN);
  const closeCountdown = useCountdown(CLOSE);

  // Xác định trạng thái tuyển sinh
  const isBeforeOpen = Boolean(OPEN && !openCountdown.expired);
  const isClosed = Boolean(CLOSE && closeCountdown.expired);
  const isOpen = !isBeforeOpen && !isClosed;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard glow="cyan" className="overflow-hidden p-0">
        {/* Banner */}
        <div className="flex items-center justify-center gap-2 border-b border-neon-cyan/10 bg-gradient-to-r from-neon-cyan/15 via-neon-cyan/8 to-neon-purple/15 px-6 py-3">
          <Flame className="h-4 w-4 animate-pulse text-neon-cyan" />
          <span className="font-paris2024 uppercase text-xs tracking-widest text-neon-cyan">
            {isBeforeOpen
              ? "Tuyển thành viên TechXplore 2026 - Sắp mở"
              : isClosed
                ? "Tuyển thành viên TechXplore 2026 - Đã đóng"
                : "Tuyển thành viên TechXplore 2026 - Đang mở"}
          </span>
          <Flame className="h-4 w-4 animate-pulse text-neon-cyan" />
        </div>

        <div className="flex flex-col items-center gap-6 p-6 text-center sm:gap-8 sm:p-8 lg:p-12">
          {/* Tiêu đề thay đổi theo trạng thái */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <h3 className="font-paris2024 uppercase text-xl font-bold text-foreground dark:text-white sm:text-3xl lg:text-4xl">
              {isBeforeOpen ? (
                <>
                  Chuẩn bị{" "}
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                    sẵn sàng
                  </span>
                </>
              ) : isClosed ? (
                <>
                  Đã kết thúc đợt{" "}
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                    tuyển thành viên
                  </span>
                </>
              ) : (
                <>
                  Cơ hội chỉ có{" "}
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                    một lần
                  </span>{" "}
                  trong năm
                </>
              )}
            </h3>
            <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-muted-foreground dark:text-white/60 sm:text-base">
              {isBeforeOpen
                ? "Cổng đăng ký đang được mở khoá. TechTonic Club sắp gọi tên bạn!"
                : isClosed
                  ? "Hẹn bạn ở TechXplore mùa sau nhé!"
                  : "Gia nhập để kết nối - Đồng hành để bức phá!"}
            </p>
          </div>

          {/* Countdown trước khi mở — không có nút đăng ký */}
          {isBeforeOpen && (
            <CountdownSection cd={openCountdown} label="Đơn mở sau" mounted={mounted} />
          )}

          {/* Countdown đến khi đóng — có nút đăng ký */}
          {isOpen && (
            <>
              {CLOSE && (
                <CountdownSection
                  cd={closeCountdown}
                  label="Thời gian còn lại để nộp hồ sơ"
                  mounted={mounted}
                />
              )}
              <div className="flex flex-col items-center gap-3">
                <NeonButton
                  variant="cyan"
                  asChild
                  className="w-full px-8 py-3 text-sm sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                >
                  <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                    Đăng ký ngay
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </a>
                </NeonButton>
              </div>
            </>
          )}

          {/* Đã đóng */}
          {isClosed && (
            <p className="text-sm font-semibold text-red-500 dark:text-red-400">
              ⚠ Đã hết hạn nộp hồ sơ.
            </p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Registration() {
  return (
    <SectionShell
      id="registration"
      tone="dark"
      align="center"
      className="border-b border-white/10 bg-transparent pt-28"
      contentClassName="max-w-4xl"
    >
      <div className="mb-12 space-y-4 text-center">
        <span
          className={cn(
            "inline-block rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2",
            "font-paris2024 uppercase text-sm tracking-widest text-cyan-800",
            "dark:border-neon-cyan/10 dark:bg-neon-cyan/10 dark:text-neon-cyan"
          )}
        >
          {recruitmentRegistrationCopy.badge}
        </span>
        <h2
          className={cn(
            "font-paris2024 text-3xl font-bold tracking-tight sm:text-5xl",
            "bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent"
          )}
        >
          {recruitmentRegistrationCopy.title}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground dark:text-white/68">
          {recruitmentRegistrationCopy.description}
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {recruitmentSteps.map((item, index) => (
          <motion.div
            key={item.step}
            className="rounded-xl border border-border bg-card/90 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-cyan/10">
              <span className="font-paris2024 uppercase text-xl font-bold text-neon-cyan">
                {item.step}
              </span>
            </div>
            <h3 className="mb-2 font-paris2024 uppercase text-lg text-foreground dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/65">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {!isHiringOpen ? (
        <GlassCard glow="cyan" className="p-8 lg:p-12">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 py-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neon-cyan/10 ring-1 ring-neon-cyan/30">
              <Clock className="h-10 w-10 text-neon-cyan" />
            </div>
            <h3 className="font-paris2024 uppercase text-2xl font-bold text-foreground dark:text-white sm:text-3xl">
              Form đăng ký đang đóng!
            </h3>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground dark:text-white/65">
              Hãy chờ chương trình <span className="font-semibold text-neon-cyan">TechXplore</span>{" "}
              mùa tiếp theo để đăng ký.
            </p>
          </motion.div>
        </GlassCard>
      ) : (
        <RegistrationCTA />
      )}
    </SectionShell>
  );
}
