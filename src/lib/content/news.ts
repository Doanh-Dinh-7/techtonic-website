import { happyHourCopy, termEvents } from "./events";
import type { NewsItem } from "./types";
import { clubTimeline } from "./timeline";

const techxplore = termEvents.find((event) => event.id === "techxplore");
const clubLaunch = clubTimeline.find((entry) => entry.title === "Ra mắt chính thức");

if (!techxplore || !clubLaunch) {
  throw new Error("featuredNews: missing required content from events or timeline");
}

/** Tin nổi bật trang chủ — đồng bộ từ recruitment, events, about. */
export const featuredNews: NewsItem[] = [
  {
    id: "techxplore",
    title: techxplore.title,
    excerpt: techxplore.summary,
    date: "Tuyển thành viên",
    href: "/recruitment",
    badge: "Tuyển dụng",
    glow: "cyan",
  },
  {
    id: "happy-hour",
    title: happyHourCopy.title,
    excerpt: happyHourCopy.summary,
    date: "Hằng tháng",
    href: "/events#happy-hour",
    badge: "Sự kiện",
    glow: "purple",
  },
  {
    id: "club-launch",
    title: clubLaunch.title,
    excerpt: clubLaunch.description,
    date: clubLaunch.dateLabel,
    href: "/about#about-timeline",
    badge: "Thông báo",
    glow: "magenta",
  },
];
