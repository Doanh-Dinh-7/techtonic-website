export const LIVE_PUZZLE_URL = "https://van-truong-due-mini-game-live-puzzl.vercel.app/";

export interface PlaygroundStep {
  id: string;
  stepLabel: string;
  title: string;
  description: string;
  hint: string;
  icon: "scan" | "hand" | "trophy";
  accent: "cyan" | "purple" | "magenta";
}

export interface PlaygroundFeature {
  id: string;
  label: string;
}

export interface PlaygroundLaunchCard {
  statusIdle: string;
  statusLive: string;
  brandTitle: string;
  brandSubtitle: string;
  hudLeftBadge: string;
  hudRightTitle: string;
  hudRightItems: string[];
  title: string;
  description: string;
  cameraHint: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface PlaygroundGameConfig {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  spotlightBadge: string;
  spotlightTitle: string;
  spotlightDescription: string;
  url: string;
  iframeTitle: string;
  techStack: string[];
  features: PlaygroundFeature[];
  launchCard: PlaygroundLaunchCard;
  steps: PlaygroundStep[];
  privacyNote: string;
  fallbackNote: string;
}

export const liveGesturePuzzle: PlaygroundGameConfig = {
  id: "ai-gesture-puzzle",
  badge: "TechTonic Playground · Ban Chuyên Môn",
  title: "AI Gesture Puzzle",
  subtitle:
    "Sản phẩm mini-game tương tác từ Ban Chuyên Môn TechTonic — kết hợp nhận diện bàn tay AI thời gian thực ngay trên trình duyệt, không cần cài đặt.",
  spotlightBadge: "Mini Game · Ban Chuyên Môn",
  spotlightTitle: "Ghép hình bằng cử chỉ tay AI",
  spotlightDescription:
    "Sản phẩm mini-game tương tác do Ban Chuyên Môn phát triển: nhận diện bàn tay thời gian thực bằng MediaPipe AI, chụp ảnh trực tiếp trên webcam, ghép lưới 3×3 bằng cử chỉ chụm ngón hoặc chuột và đua top trên bảng xếp hạng.",
  url: LIVE_PUZZLE_URL,
  iframeTitle: "TechTonic AI Gesture Puzzle",
  techStack: ["React", "TypeScript", "MediaPipe AI", "Canvas 2D", "Firebase"],
  features: [
    { id: "ai-hand", label: "Nhận diện 2 bàn tay qua Webcam" },
    { id: "mouse-fallback", label: "Hỗ trợ kéo thả bằng chuột" },
    { id: "live-board", label: "Bảng xếp hạng trực tiếp" },
  ],
  launchCard: {
    statusIdle: "AI GESTURE PUZZLE · SẴN SÀNG",
    statusLive: "ĐANG CHƠI · WEBCAM AI",
    brandTitle: "TECHTONIC",
    brandSubtitle: "AI Gesture Puzzle · Ban Chuyên Môn TechTonic",
    hudLeftBadge: "AI GESTURE · 3×3",
    hudRightTitle: "HƯỚNG DẪN NHANH",
    hudRightItems: [
      "1. Dùng hai tay tạo khung & chụm để CHỤP",
      "2. Chụm ngón (hoặc chuột) để ghép 3×3",
      "3. Nắm chặt tay 1.5s để chơi lại",
    ],
    title: "Thử thách ghép hình bằng cử chỉ tay!",
    description:
      "Giơ hai tay trước webcam để chụp ngay một khoảnh khắc bất kỳ, sau đó chụm ngón tay (hoặc dùng chuột) ghép hoàn chỉnh bức ảnh 3×3 nhanh nhất có thể để ghi tên lên bảng xếp hạng TechTonic.",
    cameraHint: "Nhớ chọn Cho phép Camera khi trình duyệt hỏi để bật nhận diện cử chỉ tay.",
    primaryCta: "Bắt đầu chơi ngay",
    secondaryCta: "Mở toàn màn hình",
  },
  steps: [
    {
      id: "scan",
      stepLabel: "Bước 01",
      title: "Tạo khung & Chụm chụp ảnh",
      description:
        "Đưa hai tay lên trước webcam để tạo khung hình vuông, sau đó chụm cả hai tay lại để chụp ngay bức ảnh làm đề ghép.",
      hint: "PINCH TO CAPTURE",
      icon: "scan",
      accent: "cyan",
    },
    {
      id: "solve",
      stepLabel: "Bước 02",
      title: "Chụm ngón tay để hoán đổi",
      description:
        "Chụm ngón trỏ và ngón cái (hoặc nhấn giữ chuột) vào một ô để nhấc lên, di chuyển tới vị trí khác rồi thả ra để hoán đổi ô 3×3.",
      hint: "Nắm chặt tay 1.5s để chơi lại",
      icon: "hand",
      accent: "purple",
    },
    {
      id: "rank",
      stepLabel: "Bước 03",
      title: "Hoàn thành & Lên bảng xếp hạng",
      description:
        "Khi ghép đúng toàn bộ 9 mảnh ảnh, hệ thống chốt thời gian hoàn thành để bạn lưu tên lên bảng xếp hạng trực tiếp.",
      hint: "LIVE LEADERBOARD",
      icon: "trophy",
      accent: "magenta",
    },
  ],
  privacyNote:
    "Hình ảnh webcam được xử lý trực tiếp trên trình duyệt bằng MediaPipe AI để nhận diện cử chỉ, không tải ảnh gốc của bạn lên máy chủ.",
  fallbackNote:
    'Nếu trình duyệt chặn quyền camera trong khung nhúng, bạn có thể nhấn "Mở tab mới" để chơi trực tiếp ở chế độ toàn màn hình.',
};
