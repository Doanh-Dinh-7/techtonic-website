export type HomeActivityAccent = "cyan" | "purple" | "magenta" | "blue" | "amber";

export type HomeActivity = {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: HomeActivityAccent;
  tags: string[];
  position?: string;
};

export const homeActivitiesSectionCopy = {
  badge: "Hoạt động",
  title: "Các hoạt động nổi bật",
  description:
    "Khám phá những chương trình học thuật, kết nối và trải nghiệm thực tế giúp thành viên TechTonic cùng nhau phát triển.",
};

export const homeActivities: HomeActivity[] = [
  {
    id: "chia-se-huong-dan",
    title: "Chia sẻ - Hướng dẫn",
    summary: "Lớp học nội bộ củng cố nền tảng và thực hành cùng nhau.",
    description:
      "TechTonic tổ chức các buổi chia sẻ về Python, BA, cơ sở dữ liệu và lập trình web để thành viên có thêm nền tảng thực tế.",
    image: "/activity/cshd.webp",
    imageAlt: "Hoạt động chia sẻ và hướng dẫn học thuật của TechTonic",
    accent: "cyan",
    tags: ["Python", "BA", "Database", "Web"],
    position: "center",
  },
  {
    id: "mentor-mentee",
    title: "Mentor-Mentee",
    summary: "Không gian kết nối giữa sinh viên mới và anh chị có kinh nghiệm.",
    description:
      "From Us To You giúp mentee được đồng hành trong học tập, kỹ năng, hoạt động ngoại khóa và đời sống sinh viên.",
    image: "/activity/mentor_mentee.webp",
    imageAlt: "Hoạt động Mentor-Mentee From Us To You của TechTonic",
    accent: "purple",
    tags: ["Mentor", "Mentee", "Kỹ năng", "Định hướng"],
    position: "center",
  },
  {
    id: "icpc-olp-nckh",
    title: "ICPC-OLP, NCKH",
    summary: "Sân chơi học thuật thử thách tư duy và tinh thần đồng đội.",
    description:
      "Thành viên tham gia ICPC-OLP, nghiên cứu khoa học và hackathon để rèn tư duy giải quyết vấn đề qua trải nghiệm thực chiến.",
    image: "/activity/olp_icpc.webp",
    imageAlt: "Hoạt động ICPC OLP và nghiên cứu khoa học của TechTonic",
    accent: "blue",
    tags: ["ICPC", "OLP", "NCKH", "Hackathon"],
    position: "top center",
  },
  {
    id: "techware",
    title: "TechWare",
    summary: "Chương trình nội bộ nơi các đội vượt thử thách sáng tạo.",
    description:
      "TechWare đưa Dev, BA, Tester, UX và IT Support vào những thử thách chung để hiểu nhau hơn và xây dựng cộng đồng bền vững.",
    image: "/activity/techware.webp",
    imageAlt: "Hoạt động Team Bonding TechWare của TechTonic",
    accent: "magenta",
    tags: ["Team bonding", "Challenge", "Community", "Creative"],
    position: "center",
  },
  {
    id: "nguoi-trong-nganh-mis",
    title: "Người trong ngành MIS",
    summary: "Buổi trò chuyện kết nối sinh viên với anh chị đi trước.",
    description:
      "Khách mời chia sẻ góc nhìn về AI, chatbot, dữ liệu, lập trình và kiểm thử, giúp sinh viên hiểu hơn về nghề nghiệp tương lai.",
    image: "/activity/ntn_mis.webp",
    imageAlt: "Hoạt động Người trong ngành MIS của TechTonic",
    accent: "amber",
    tags: ["MIS", "Career", "AI", "Testing"],
    position: "bottom center",
  },
];
