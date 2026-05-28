import type { Metadata } from "next";
import { EventsPageContent } from "@/widgets/events/events-page-content";

export const metadata: Metadata = {
  title: "Sự kiện & hoạt động",
  description: "Lịch workshop, hoạt động nội bộ và blog công nghệ TechTonic Club.",
};

export default function EventsPage() {
  return <EventsPageContent />;
}
