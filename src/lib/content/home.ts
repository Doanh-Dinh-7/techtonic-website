export type TestimonialCatVariant = "cyan" | "purple" | "magenta";

export type ClubAchievementStat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  accent: "yellow" | "blue" | "green" | "purple";
  icon: "trophy" | "users" | "code" | "calendar";
};

export const clubAchievementStats: ClubAchievementStat[] = [
  { id: "awards", label: "Giải thưởng", value: 10, suffix: "+", accent: "yellow", icon: "trophy" },
  { id: "members", label: "Thành viên", value: 100, suffix: "+", accent: "blue", icon: "users" },
  { id: "projects", label: "Dự án", value: 20, suffix: "+", accent: "green", icon: "code" },
  {
    id: "years",
    label: "Năm hoạt động",
    value: 2,
    suffix: "+",
    accent: "purple",
    icon: "calendar",
  },
];

export type HomeTestimonial = {
  id: string;
  name: string;
  role: string;
  year: number;
  text: string;
  catVariant: TestimonialCatVariant;
};

export const homeTestimonials: HomeTestimonial[] = [
  {
    id: "minh-anh",
    name: "Phan Nhật Minh Anh",
    role: "Chủ nhiệm CLB TechTonic nhiệm kỳ 2025-2026",
    year: 2024,
    text: "Điều mình luôn tin khi xây dựng TechTonic là sinh viên hoàn toàn có thể tạo ra những giá trị lớn nếu được đặt trong một môi trường phù hợp. Không cần phải là người giỏi nhất ngay từ đầu, chỉ cần luôn sẵn sàng học hỏi, dám thử và dám bước ra khỏi giới hạn của bản thân. Mình hy vọng TechTonic sẽ trở thành nơi để các bạn trẻ gặp được những người đồng hành tốt, có thêm cơ hội phát triển và lưu lại những dấu ấn thật đẹp trong quãng đời sinh viên.",
    catVariant: "purple",
  },
  {
    id: "hoang",
    name: "Nguyễn Hoàng",
    role: "Mentor Chuyên môn Frontend CLB TechTonic nhiệm kỳ 2025 - 2026",
    year: 2022,
    text: "Đối với mình, TechTonic không chỉ là nơi chia sẻ kiến thức, mà còn là nơi được đồng hành cùng các bạn trên hành trình phát triển. Với vai trò Mentor mảng Frontend, mình luôn mong muốn giúp các thành viên xây dựng nền tảng vững chắc, rèn luyện tư duy lập trình và tự tin áp dụng kiến thức vào thực tế. Điều mình trân trọng nhất không phải là những sản phẩm hoàn hảo, mà là sự tiến bộ của từng người qua mỗi buổi học và mỗi thử thách. Hy vọng những trải nghiệm tại TechTonic sẽ trở thành hành trang ý nghĩa để các bạn vững bước trên con đường công nghệ phía trước.",
    catVariant: "cyan",
  },
  {
    id: "ngoc-nhi",
    name: "Nguyễn Thị Ngọc Nhi",
    role: "Phó chủ nhiệm CLB TechTonic nhiệm kỳ 2025 - 2026",
    year: 2024,
    text: "Nhờ tham gia CLB, mình vừa học hỏi, rèn luyện kỹ năng, vừa gắn kết như một gia đình nhỏ. Ở vai trò Phó chủ nhiệm, mình tự hào đồng hành cùng mọi người tạo ra hoạt động ý nghĩa, kỷ niệm đẹp. CLB là môi trường tuyệt vời để khám phá bản thân, phát triển năng lực và lan tỏa giá trị tích cực.",
    catVariant: "magenta",
  },
];
