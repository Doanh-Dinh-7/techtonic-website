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
  image: string;
};

export const homeTestimonials: HomeTestimonial[] = [
  {
    id: "doanh-dinh",
    name: "Đinh Sỹ Quốc Doanh",
    role: "Co-Fouder của CLB TechTonic, Trưởng Ban Chuyên Môn nhiệm kỳ 2024-2025, Mentor của Chuyên Môn BE mùa đầu tiên.",
    year: 2022,
    text: "TechTonic được hình thành với mong muốn tạo ra một môi trường nơi sinh viên yêu công nghệ có thể cùng học hỏi, cùng thử sức và cùng phát triển. Điều mình trân trọng nhất không chỉ là những hoạt động hay dự án đã thực hiện, mà là cách các thế hệ thành viên luôn sẵn sàng hỗ trợ và truyền cảm hứng cho nhau. Mình hy vọng TechTonic sẽ tiếp tục là nơi mỗi thành viên tìm thấy cơ hội, định hướng và những người đồng hành trên hành trình phát triển của mình.",
    catVariant: "magenta",
    image:
      "https://res.cloudinary.com/jb6ttotp/image/upload/v1789326684/602338018_1624614182038760_1447728319155963626_n.jpg",
  },
  {
    id: "minh-anh",
    name: "Phan Nhật Minh Anh",
    role: "Chủ nhiệm CLB TechTonic nhiệm kỳ 2025-2026",
    year: 2023,
    text: "Điều mình luôn tin khi xây dựng TechTonic là sinh viên hoàn toàn có thể tạo ra những giá trị lớn nếu được đặt trong một môi trường phù hợp. Không cần phải là người giỏi nhất ngay từ đầu, chỉ cần luôn sẵn sàng học hỏi, dám thử và dám bước ra khỏi giới hạn của bản thân. Mình hy vọng TechTonic sẽ trở thành nơi để các bạn trẻ gặp được những người đồng hành tốt, có thêm cơ hội phát triển và lưu lại những dấu ấn thật đẹp trong quãng đời sinh viên.",
    catVariant: "purple",
    image:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785766691/Phan_Nh%E1%BA%ADt_Minh_Anh_q7otkn.png",
  },
  {
    id: "hoang",
    name: "Nguyễn Hoàng",
    role: "Mentor Chuyên môn Frontend CLB TechTonic nhiệm kỳ 2025 - 2026",
    year: 2022,
    text: "Đối với mình, TechTonic không chỉ là nơi chia sẻ kiến thức, mà còn là nơi được đồng hành cùng các bạn trên hành trình phát triển. Với vai trò Mentor mảng Frontend, mình luôn mong muốn giúp các thành viên xây dựng nền tảng vững chắc, rèn luyện tư duy lập trình và tự tin áp dụng kiến thức vào thực tế. Điều mình trân trọng nhất không phải là những sản phẩm hoàn hảo, mà là sự tiến bộ của từng người qua mỗi buổi học và mỗi thử thách. Hy vọng những trải nghiệm tại TechTonic sẽ trở thành hành trang ý nghĩa để các bạn vững bước trên con đường công nghệ phía trước.",
    catVariant: "cyan",
    image:
      "https://res.cloudinary.com/jb6ttotp/image/upload/v1789325014/537537916_1452852722432313_6044311279688375103_n.jpg",
  },
  {
    id: "van-truong",
    name: "Hồ Văn Trường",
    role: "Trưởng Ban Chuyên Môn CLB TechTonic nhiệm kỳ 2026 - 2027",
    year: 2024,
    text: "TechTonic không chỉ là một CLB học thuật ở DUE, mà là nơi mình trở về mỗi khi mệt mỏi và sau nhiều tiết học khô khan. Ở đây có những con người mà tôi tìm mãi không bao giờ thấy ở cuộc sống hằng ngày, họ có sự nhiệt huyết, năng nổ, tiềm năng và sự đột phá trong từng công việc. Tôi yêu nơi đây và tôi YÊU BAN CHUYÊN MÔN. Tôi mong rằng trong tương lai TechTonic sẽ vươn xa hơn và đạt đến mục tiêu là CLB học thuật số 1 DUE.",
    catVariant: "magenta",
    image:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785817600/H%E1%BB%93_V%C4%83n_Tr%C6%B0%E1%BB%9Dng_nlrxqc.png",
  },
  {
    id: "ngoc-nhi",
    name: "Nguyễn Thị Ngọc Nhi",
    role: "Cựu thành viên Ban Sự Kiện CLB TechTonic nhiệm kỳ 2025 - 2026",
    year: 2024,
    text: "Nhờ tham gia CLB, mình vừa học hỏi, rèn luyện kỹ năng, vừa gắn kết như một gia đình nhỏ. Ở vai trò Phó chủ nhiệm, mình tự hào đồng hành cùng mọi người tạo ra hoạt động ý nghĩa, kỷ niệm đẹp. CLB là môi trường tuyệt vời để khám phá bản thân, phát triển năng lực và lan tỏa giá trị tích cực.",
    catVariant: "magenta",
    image:
      "https://res.cloudinary.com/jb6ttotp/image/upload/v1789325930/Screenshot_2026-09-14_015833.png",
  },
];

export const homePlaylist = [
  {
    title: "Đang Yêu",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582997/ang_Yu_-_OSAD_Tit_mc_solo_Anh_Trai_Vt_Ngn_Chng_Gai_2026.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789583849/images.jpg",
  },
  {
    title: "Move On",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789583008/ATVNCG2026_Move_on.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789583851/images_1.jpg",
  },
  {
    title: "Giữ Anh Cho Ngày Hôm Qua",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582961/HONG_DNG_-_GI_ANH_CHO_NGY_HM_QUA.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789584094/images_9.jpg",
  },
  {
    title: "Laviai",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582989/LAVIAI_REMIX_ft_HIEUTHUHAI_2PILLZ.mp3",
    cover:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Thế Giới Của Anh (Anh Trai Vượt Ngàn Chông Gai)",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582949/TH_GII_CA_ANH_feat_Dng_Domic_WEAN_buitruonglinh_CONGB.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789584033/images_7.jpg",
  },
  {
    title: "Thế Giới Của Anh (DangTangTo)",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582944/th_gii_ca_anh_Prod_DONAL_Lespace.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789584032/images_8.jpg",
  },
  {
    title: "Xe Đạp",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582995/XE_AP_Thuy_Chi_Ft_Hoang_Dung_At_CONCERT_25.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789583978/images_4.jpg",
  },
  {
    title: "Mưa Cứ Rơi",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582971/Ma_c_ri_-_MR_A_ft_WRXDIE_low_quality.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789583995/images_5.jpg",
  },
  {
    title: "Haru Haru",
    src: "https://res.cloudinary.com/jb6ttotp/video/upload/v1789582992/Haru_Haru.mp3",
    cover: "https://res.cloudinary.com/jb6ttotp/image/upload/v1789583975/images_2.jpg",
  },
];
