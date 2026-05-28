import type { Metadata } from "next";
import { EventsContent } from "@/components/events-content";

export const metadata: Metadata = {
  title: "Sự kiện & hoạt động",
  description:
    "Lịch workshop, hoạt động nội bộ và blog công nghệ TechTonic Club.",
};

export default function EventsPage() {
  return <EventsContent />;
}
