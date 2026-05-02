"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LeadState } from "@/components/chat-widget/types";

type ChatLeadCardProps = {
  lead: LeadState;
  onChange: (updater: (prev: LeadState) => LeadState) => void;
  onSubmit: () => void;
};

export function ChatLeadCard({ lead, onChange, onSubmit }: ChatLeadCardProps) {
  return (
    <div className="mt-4 rounded-lg border bg-background/80 p-3">
      <div className="text-sm font-medium">Nhận thêm thông tin?</div>
      <div className="mt-1 text-xs text-muted-foreground">
        TechTonic chỉ dùng để liên hệ về yêu cầu này, không spam và không chia sẻ
        bên thứ ba.
      </div>

      <div className="mt-3 grid gap-2">
        <Input
          placeholder="Email (tuỳ chọn)"
          value={lead.email}
          onChange={(event) =>
            onChange((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <Input
          placeholder="Facebook (link/username, tuỳ chọn)"
          value={lead.facebook}
          onChange={(event) =>
            onChange((prev) => ({ ...prev, facebook: event.target.value }))
          }
        />
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={lead.consent}
            onChange={(event) =>
              onChange((prev) => ({ ...prev, consent: event.target.checked }))
            }
          />
          Mình đồng ý để TechTonic lưu thông tin để liên hệ về yêu cầu này.
        </label>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={onSubmit}
            disabled={!lead.consent || (!lead.email.trim() && !lead.facebook.trim())}
          >
            Gửi thông tin
          </Button>
          <Button
            variant="outline"
            onClick={() => onChange((prev) => ({ ...prev, asked: true }))}
          >
            Bỏ qua
          </Button>
        </div>
      </div>
    </div>
  );
}
