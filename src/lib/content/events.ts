/** Hoạt động & sự kiện — nội dung trang /events */
import type { AcademicActivity, TermEvent, TermEventGalleryItem } from "./types";

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

export const upcomingWorkshops = [
  {
    id: "e1",
    title: "Git & GitHub cho người mới",
    date: "2025-04-05T14:00:00",
    location: "Phòng lab (cập nhật)",
    description: "Làm quen branch, PR và làm việc nhóm.",
    isSample: true,
  },
  {
    id: "e2",
    title: "Buổi chia sẻ Frontend cơ bản",
    date: "2025-04-12T14:00:00",
    location: "Trực tuyến / tại trường (sẽ thông báo)",
    description: "HTML/CSS/JS và giới thiệu React.",
    isSample: true,
  },
];

export const weeklyAcademicIntroShort =
  "Học tập, chia sẻ và thực hành chuyên môn qua các buổi học thuật định kỳ hằng tuần.";

/** Bản đầy đủ — dùng khi mở rộng (tùy chọn) */
export const weeklyAcademicIntro =
  "Các hoạt động học thuật được tổ chức định kỳ hằng tuần nhằm tạo môi trường học tập, chia sẻ và phát triển kiến thức cho thành viên câu lạc bộ. Đây là nơi các bạn có thể cùng nhau học hỏi, trao đổi kinh nghiệm, thực hành kỹ năng và xây dựng nền tảng chuyên môn thông qua những nội dung mang tính ứng dụng và thực tiễn.";

export const academicActivities: AcademicActivity[] = [
  {
    id: "fe",
    icon: "web",
    title: "Chuyên môn FE",
    summary: "Xây dựng giao diện và trải nghiệm người dùng với công nghệ Front-end phổ biến.",
    description:
      "Nhóm chuyên môn Front-end tập trung vào việc xây dựng giao diện và trải nghiệm người dùng cho website và ứng dụng. Thành viên sẽ được học tập, thực hành các công nghệ Front-end phổ biến, phát triển tư duy thiết kế giao diện và nâng cao khả năng xây dựng các sản phẩm trực quan, hiện đại và thân thiện với người dùng.",
    tags: ["Front-end", "Hằng tuần"],
    accent: "violet",
  },
  {
    id: "be",
    icon: "dns",
    title: "Chuyên môn BE",
    summary: "Hệ thống, API và cơ sở dữ liệu phía máy chủ qua học tập và dự án thực tế.",
    description:
      "Nhóm chuyên môn Back-end tập trung vào xử lý hệ thống, cơ sở dữ liệu và logic vận hành phía máy chủ. Thông qua các hoạt động học tập và dự án thực tế, thành viên sẽ được tiếp cận với quy trình xây dựng hệ thống, API, quản lý dữ liệu và các kiến thức nền tảng quan trọng trong phát triển phần mềm.",
    tags: ["Back-end", "Hằng tuần"],
    accent: "blue",
  },
  {
    id: "ai-data",
    icon: "psychology",
    title: "Chuyên môn AI & Data",
    summary: "Dữ liệu, phân tích và Machine Learning - ứng dụng AI vào thực tế.",
    description:
      "Nhóm chuyên môn AI & Data hướng đến việc tìm hiểu và ứng dụng các công nghệ liên quan đến dữ liệu và trí tuệ nhân tạo. Thành viên sẽ được tiếp cận với các kiến thức về xử lý dữ liệu, phân tích dữ liệu, Machine Learning và các xu hướng công nghệ mới, từ đó phát triển tư duy nghiên cứu và khả năng ứng dụng AI vào thực tế.",
    tags: ["AI & Data", "Hằng tuần"],
    accent: "emerald",
  },
  {
    id: "cslt-csdl",
    icon: "database",
    title: "Khóa chia sẻ hướng dẫn CSLT và CSDL",
    summary: "Hỗ trợ sinh viên củng cố CSLT & CSDL qua buổi chia sẻ thực hành.",
    description:
      "Chuỗi hoạt động học thuật được tổ chức nhằm hỗ trợ sinh viên tiếp cận và củng cố kiến thức về Cơ sở lập trình (CSLT) và Cơ sở dữ liệu (CSDL). Nội dung được xây dựng theo hướng dễ hiểu, thực tiễn và bám sát quá trình học tập, giúp các bạn phát triển tư duy lập trình, kỹ năng xử lý dữ liệu và xây dựng nền tảng cần thiết cho các định hướng chuyên sâu trong lĩnh vực công nghệ thông tin.",
    tags: ["Học thuật", "Hằng tuần"],
    accent: "cyan",
  },
  {
    id: "product-team",
    icon: "groups",
    title: "Báo cáo đội dự án - Product Team",
    summary: "Báo cáo tiến độ đội dự án, góp ý chuyên môn và rèn kỹ năng thuyết trình.",
    description:
      "Hoạt động báo cáo của Product Team được tổ chức định kỳ nhằm cập nhật tiến độ, kết quả thực hiện và quá trình phát triển của các đội dự án trong câu lạc bộ. Đây là cơ hội để các thành viên trình bày ý tưởng, chia sẻ quá trình xây dựng sản phẩm, nhận góp ý chuyên môn và cải thiện kỹ năng làm việc nhóm, tư duy sản phẩm cũng như khả năng thuyết trình. Thông qua các buổi báo cáo, thành viên không chỉ được học hỏi từ trải nghiệm thực tế mà còn từng bước tiếp cận môi trường làm việc và quy trình phát triển sản phẩm chuyên nghiệp.",
    tags: ["Product Team", "Báo cáo"],
    accent: "amber",
    colSpan: "wide",
  },
];

export const happyHourCopy = {
  title: "Sinh hoạt hằng tháng Happy Hour",
  backgroundImage:
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1783912491/happy-hours_cfgc5y.jpg",
  backgroundImageAlt: "Thành viên TechTonic trong buổi sinh hoạt Happy Hour.",
  summary: "Sinh hoạt tháng - giao lưu, chia sẻ và gắn kết đội ngũ sau giờ học và làm việc.",
  description:
    "Happy Hour là hoạt động sinh hoạt hằng tháng nhằm tạo không gian kết nối, giao lưu và gắn kết giữa các thành viên trong câu lạc bộ. Đây là dịp để mọi người cùng nhìn lại hành trình hoạt động, chia sẻ những câu chuyện, trải nghiệm và thư giãn sau khoảng thời gian học tập, làm việc. Không chỉ mang đến bầu không khí thoải mái và gần gũi, Happy Hour còn góp phần xây dựng tinh thần đồng đội và tạo nên những kỷ niệm đáng nhớ trong hành trình đồng hành cùng câu lạc bộ.",
};

export const termEvents: TermEvent[] = [
  {
    id: "mentor-mentee",
    order: 1,
    label: "Sự kiện mở đầu",
    title: "Mentor - Mentee",
    summary: "From Us To You - định hướng sinh viên và giới thiệu TechTonic.",
    tagline:
      "From Us To You - Giúp định hướng phát triển cho sinh viên và giới thiệu câu lạc bộ TechTonic.",
    description:
      "From Us To You - Giúp định hướng phát triển cho sinh viên và giới thiệu câu lạc bộ TechTonic.",
    detailSections: [
      {
        id: "mentor-goals",
        title: "🎯 Mục tiêu",
        items: [
          "📍 Nâng cao hình ảnh CLB đối với tân sinh viên nói riêng và với sinh viên Trường Đại học Kinh Tế - Đại học Đà Nẵng nói chung.",
          "📍Hỗ trợ sinh viên Trường Đại học Kinh Tế - Đại học Đà Nẵng có một định hướng phát triển cá nhân tốt hơn trong môi trường đại học, đặc biệt tân sinh viên và sinh viên các ngành liên quan đến CNTT.",
          "📍Giúp sinh viên biết đến câu lạc bộ TechTonic trước khi tổ chức chương trình tuyển thành viên.",
        ],
      },
      {
        id: "mentor-audience",
        title: "👥 Đối tượng",
        items: [
          "📍 Sinh viên năm 1 và năm 2 Trường Đại học Kinh Tế - Đại học Đà Nẵng, ưu tiên sinh viên các ngành có yếu tố CNTT.",
        ],
      },
      {
        id: "mentor-content",
        title: "📚 Nội dung",
        items: [
          "📍 Chuỗi chương trình mang tính chất chào đón tân sinh viên ngắn nhưng tập trung vào giá trị thật.",
          "📍 Các nội dung tổ chức phải gần gũi và tạo điều kiện để sinh viên ngoài CLB và thành viên CLB tham gia cùng nhau.",
          "📍 Nội dung chương trình phải đẩy được tinh thần tuổi trẻ, muốn trải nghiệm, muốn khám phá của sinh viên.",
          "📍 Nâng cao hình ảnh câu lạc bộ.",
        ],
      },
    ],
    side: "left",
    accent: "blue",
    imageSrc:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1783912658/Mentor-mentee_jfrjen.jpg",
    imageAlt: "Chương trình Mentor - Mentee, From Us To You.",
  },
  {
    id: "techxplore",
    order: 2,
    label: "Tuyển thành viên",
    title: "TechXplore",
    summary: "Tuyển thành viên tự do & Ban Chủ Nhiệm qua các vòng đơn, PV, training.",
    tagline:
      "Giúp tuyển thành viên câu lạc bộ TechTonic (Tự do và Ban Chủ Nhiệm) cho mỗi nhiệm kỳ, bao gồm tuyển chọn và đào tạo qua các vòng.",
    description:
      "Giúp tuyển thành viên câu lạc bộ TechTonic (Tự do và Ban Chủ Nhiệm) cho mỗi nhiệm kỳ, bao gồm tuyển chọn và đào tạo qua các vòng.",
    detailSections: [
      {
        id: "techxplore-free",
        title: "📌 Thành viên tự do",
        items: [
          "🎯 Mục tiêu: Xây dựng đội ngũ thành viên cho câu lạc bộ.",
          "👥 Định hướng đối tượng tham gia: Sinh viên năm 1 và năm 2 Trường Đại học Kinh Tế - Đại học Đà Nẵng, ưu tiên sinh viên các ngành có yếu tố CNTT.",
          "📚 Nội dung: Vòng đơn và vòng phỏng vấn.",
        ],
      },
      {
        id: "techxplore-bcn",
        title: "📌 Thành viên Ban Chủ Nhiệm",
        items: [
          "🎯 Mục tiêu: Xây dựng đội ngũ thành viên BCN câu lạc bộ.",
          "👥 Đối tượng tham gia: Sinh viên năm 1 và năm 2 Trường Đại học Kinh Tế - Đại học Đà Nẵng, ưu tiên sinh viên các ngành có yếu tố CNTT (có thể là thành viên hoặc chưa là thành viên CLB).",
          "📚 Nội dung: Vòng đơn, vòng phỏng vấn, vòng training và vòng thực tập.",
        ],
        note: "Tuyển thành viên tự do và thành viên Ban Chủ Nhiệm phải được tuyển cùng lúc để tận dụng tối đa nguồn sinh viên của trường Đại học Kinh Tế - Đại học Đà Nẵng. Nên tuyển trước các câu lạc bộ, liên chi đoàn có cùng tệp thành viên mục tiêu như CLB I-Design, LCĐ Khoa Thương Mại Điện Tử, LCĐ Khoa Thống kê - Tin học.",
      },
    ],
    side: "right",
    accent: "emerald",
    imageSrc:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1783912656/Tech-X-plore_fionvu.jpg",
    imageAlt: "Chương trình tuyển thành viên TechXplore.",
  },
  {
    id: "tech-threads",
    order: 3,
    label: "Kết nối nội bộ 1",
    title: "Tech Threads",
    summary: "Chào đón tân thành viên - kết nối nội bộ lần 1.",
    tagline: "Chào đón thành viên mới - hoạt động kết nối nội bộ lần 1.",
    description: "Chào đón thành viên mới - hoạt động kết nối nội bộ lần 1.",
    detailSections: [
      {
        id: "threads-goals",
        title: "🎯 Mục tiêu",
        items: ["📍 Kết nối thành viên câu lạc bộ, được xem là hoạt động kết nối nội bộ lần 1."],
      },
      {
        id: "threads-audience",
        title: "👥 Đối tượng tham gia",
        items: ["Thành viên câu lạc bộ.", "Trọng tâm đặt vào tân thành viên."],
      },
      {
        id: "threads-content",
        title: "📚 Nội dung",
        items: [
          "📍 Các thành viên CLB có chương trình đầu tiên tham gia cùng nhau sau khi trở thành thành viên câu lạc bộ.",
        ],
      },
    ],
    side: "left",
    accent: "amber",
    imageSrc:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1783912655/Tech-threads_qv0ivk.jpg",
    imageAlt: "Chương trình Tech Threads chào đón thành viên mới.",
  },
  {
    id: "volunteer",
    order: 4,
    label: "Kết nối nội bộ 2",
    title: "Tình nguyện Đông - Xuân",
    summary: "Thiện nguyện và gắn kết sâu - kết nối nội bộ lần 2.",
    tagline:
      "Chương trình kết nối thành viên câu lạc bộ TechTonic thông qua hoạt động thiện nguyện.",
    description:
      "Chương trình kết nối thành viên câu lạc bộ TechTonic thông qua hoạt động thiện nguyện.",
    detailSections: [
      {
        id: "volunteer-goals",
        title: "🎯 Mục tiêu",
        items: [
          '📍 Tiếp bước tinh thần thanh niên, "Nơi cần thanh niên có, nơi khó có thanh niên".',
          '📍 Giữ vững truyền thống tốt đẹp "Lá lành đùm lá rách" của dân tộc.',
          "📍 Chương trình kết nối thành viên có chiều sâu nhất, được xem là hoạt động kết nối nội bộ lần 2.",
        ],
      },
      {
        id: "volunteer-audience",
        title: "👥 Đối tượng tham gia",
        items: [
          "📍 Ưu tiên thành viên câu lạc bộ TechTonic.",
          "📍 Sinh viên trường Đại học Kinh Tế - Đại học Đà Nẵng.",
        ],
      },
      {
        id: "volunteer-content",
        title: "📚 Nội dung",
        items: [
          "📍 Gây quỹ (thuộc hoạt động gây quỹ).",
          "📍 Đóng quân tại địa phương tổ chức thiện nguyện.",
        ],
      },
    ],
    side: "right",
    accent: "pink",
    imageSrc:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1783912657/Dem-hoi-trang-ram_qjc0za.jpg",
    imageAlt: "Chương trình thiện nguyện Đông - Xuân.",
  },
  {
    id: "techware",
    order: 5,
    label: "Kết nối nội bộ 3",
    title: "Team Bonding - TechWare",
    summary: "Team Bonding ganh đua trực tiếp - kết nối nội bộ lần 3.",
    tagline: "Chương trình Team Bonding gắn kết gần gũi giữa các thành viên câu lạc bộ TechTonic.",
    description:
      "Chương trình Team Bonding gắn kết gần gũi giữa các thành viên câu lạc bộ TechTonic.",
    detailSections: [
      {
        id: "techware-goals",
        title: "🎯 Mục tiêu",
        items: ["📍 Kết nối thành viên câu lạc bộ, được xem là hoạt động kết nối nội bộ lần 3."],
      },
      {
        id: "techware-audience",
        title: "👥 Đối tượng tham gia",
        items: ["📍 Thành viên câu lạc bộ.", "📍 Cựu thành viên trước một nhiệm kỳ."],
      },
      {
        id: "techware-content",
        title: "📚 Nội dung",
        items: [
          "📍 Các thành viên CLB phải có khoảng thời gian đủ dài tham gia hoạt động cùng nhau và các hoạt động phải có tính chất ganh đua trực tiếp để tạo sự gắn kết giữa các thành viên.",
        ],
      },
    ],
    side: "left",
    accent: "violet",
    imageSrc: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1783912657/Tech-ware_kqa8rx.jpg",
    imageAlt: "Hoạt động Team Bonding TechWare.",
  },
  {
    id: "closing",
    order: 6,
    label: "Tổng kết",
    title: "Kiện toàn Câu lạc bộ TechTonic",
    summary: "Tổng kết nhiệm kỳ và công bố Ban Chủ Nhiệm mới.",
    tagline: "Chương trình công bố Ban Chủ Nhiệm nhiệm kỳ mới.",
    description: "Chương trình công bố Ban Chủ Nhiệm nhiệm kỳ mới.",
    detailSections: [
      {
        id: "closing-goals",
        title: "🎯 Mục tiêu",
        items: ["📍 Tổng kết nhiệm kỳ.", "📍 Công bố Ban Chủ Nhiệm nhiệm kỳ mới của câu lạc bộ."],
      },
      {
        id: "closing-audience",
        title: "👥 Đối tượng tham gia",
        items: ["📍 Toàn thể thành viên Ban Chủ Nhiệm.", "📍 Đại diện hội sinh viên."],
      },
      {
        id: "closing-content",
        title: "📚 Nội dung",
        items: [
          "📍 Tổng kết nhiệm kỳ - những gì đã làm tốt và những gì chưa tốt.",
          "📍 Chọn ra Ban Chủ Nhiệm nhiệm kỳ mới của câu lạc bộ.",
        ],
      },
    ],
    side: "right",
    accent: "orange",
    imageSrc:
      "https://res.cloudinary.com/dggsvq2tw/image/upload/v1780167010/KI%E1%BB%86N_TO%C3%80N_xloz9y.jpg",
    imageAlt: "Lễ kiện toàn câu lạc bộ TechTonic.",
  },
];

/** Ảnh riêng cho section Thư viện ảnh — không dùng chung `imageSrc` timeline */
const termEventGalleryMedia: Record<
  TermEvent["id"],
  Pick<TermEventGalleryItem, "imageSrc" | "imageAlt">
> = {
  "mentor-mentee": {
    imageSrc:
      "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/547500289_122184880988523479_6073714068090239004_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHsbCHC0iV0KXQxhaz_eGu_zEj7Tx7waOLMSPtPHvBo4oLex1xPizKptBR5c_tXiwLzhhPptogamulr_MSE17xu&_nc_ohc=gq9FDXjLwfcQ7kNvwEPhv5U&_nc_oc=AdoN1T2Df5yuCxdlANZ994t0rdFinE3O-w15iZD06qp6SqA3w72Xlhc78GSOl30UBAUtgLul8u-XUGGTuGIIpN9L&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=ZxUNShLRSmg0vYk4xAjKpw&_nc_ss=7b2a8&oh=00_Af7Os9n-tTT5kzNXb2ppkeJA8VPxrQ_cuGss9gJypG4fqA&oe=6A20EF19",
    imageAlt: "Khoảnh khắc chương trình Mentor - Mentee.",
  },
  techxplore: {
    imageSrc:
      "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/561178800_122191134416523479_84984601107235912_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFB84sW57cHAK9wdlJxzZnNcGEpvg7vDhlwYSm-Du8OGdWaeZPyOWBo6SBitkspAvxS3B1zcumgSJ-FkAmLZBws&_nc_ohc=PCf4XDfZVDcQ7kNvwGRZOy3&_nc_oc=AdrUGQBP5_bk8NDhtf0uaFj53qCPifMR4SQ3pcywoLV3wRvgGqKosNqxy-bdhawgtIee4yl9AbTwdGVghSEr3pQj&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=sAXf8-XILgyr_1cnPXtwtg&_nc_ss=7b2a8&oh=00_Af4BhK3kQDXuOiIAPRKPxJMOu8C1XiHJo6fmKoimyycpcA&oe=6A20ED9F",
    imageAlt: "Hoạt động tuyển thành viên TechXplore.",
  },
  "tech-threads": {
    imageSrc:
      "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/608972096_122207047274523479_3685682196447257985_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFuIHJmBr-o18dTO7531sMvmuKZZ0I_wtSa4plnQj_C1GbSDGk8cEk2jgOAa_6N88j-eTorlwq6CEv3zCZWhCIb&_nc_ohc=0D-ganUmyHoQ7kNvwEnGO83&_nc_oc=Adorzosn2l3RkwohVBFDvn6riGaZ5bBHDsOKKbYeApiUOudw-ppZtfjX0vDEPC6DuNr-tfcDlNAGmQWy58OOad38&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=3Qh_BYy1iTomFjj9b9Rmug&_nc_ss=7b2a8&oh=00_Af7iH3TOlMTBMvvjUHdLVHBtoLkZIyXnqYmQ0WLs9fWy0A&oe=6A20FF33",
    imageAlt: "Tech Threads - chào đón thành viên mới.",
  },
  volunteer: {
    imageSrc:
      "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/558159593_122190077282523479_5187171086897198994_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEwOB4HtZtgZvtzBu0OQkHrknW7sPhCeWOSdbuw-EJ5Y-rLRs7uX4-opyJTotw0LuetVECLiEzYF3gwBvWN_lPF&_nc_ohc=lWZegAqSaZ8Q7kNvwGnjpre&_nc_oc=Adrv_grEBPOxYO-waJyAqZX6wZTERJKMcWmnSoaBpIbYXMgERB_P2im7KX1rILKpyEJ7DafOgzFVl8R8Q8mvwRXP&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Yg5pceVJ4bdpeGqyVyasKg&_nc_ss=7b2a8&oh=00_Af4lkEWXJtx7JdiuK4cvFT6uajeYmHlPob1lMkCuacGa2A&oe=6A21157C",
    imageAlt: "Tình nguyện Đông - Xuân - kết nối thành viên.",
  },
  techware: {
    imageSrc:
      "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/670732084_122223599762523479_8261431714282277834_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHzq21ndwfk1-UxwqnkANnq0lH0JH44DFzSUfQkfjgMXJsh8kEdDIh272_3cNYC4Jb46E1mwisAYLuqwp-3wle0&_nc_ohc=vUvtkNSGk3UQ7kNvwEXn2HL&_nc_oc=AdoXQdwgJMhVnsHE_uBIx4fogwaNfdTsyEaKFUBXzAYtViyUn76kU0Wc6jXfCjGcdxhNLYwx5ufNPB58eaDesy8b&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=buPHUs4F7v8zK870AOxFCA&_nc_ss=7b2a8&oh=00_Af5xHpRCcO0oWfX9D99PyjGx53CjIrVbyXJ0GJLTJJeU2g&oe=6A20ED49",
    imageAlt: "Team Bonding TechWare.",
  },
  closing: {
    imageSrc: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1780167022/DSC07863_lhevse.jpg",
    imageAlt: "Lễ kiện toàn câu lạc bộ TechTonic.",
  },
};

export const termEventGallery: TermEventGalleryItem[] = termEvents.map((event, index) => {
  const media = termEventGalleryMedia[event.id];
  return {
    id: event.id,
    order: event.order,
    title: event.title,
    imageSrc: media.imageSrc,
    imageAlt: media.imageAlt,
    glow: index % 2 === 0 ? "cyan" : "purple",
    imageClassName:
      index === 1 ? "h-[500px]" : index === 2 ? "h-[350px]" : index === 3 ? "h-[400px]" : undefined,
  };
});

/** Masonry layout: 3 columns from term events */
export const termEventGalleryColumns: TermEventGalleryItem[][] = [
  [termEventGallery[0], termEventGallery[3]],
  [termEventGallery[1], termEventGallery[4]],
  [termEventGallery[2], termEventGallery[5]],
];

export const eventsHeroCopy = {
  badge: "Hệ sinh thái TechTonic",
  title: "Hoạt động",
  description: "Học thuật hằng tuần, Happy Hour và 6 sự kiện cố định mỗi nhiệm kỳ.",
  ctaSchedule: "Khám phá lịch trình",
  ctaTimeline: "Chuỗi sự kiện nhiệm kỳ",
};

export const termGallerySectionCopy = {
  title: "Thư viện ảnh",
  description: "Khoảnh khắc từ các chương trình - ảnh gallery độc lập với timeline phía trên.",
  cta: "Xem timeline đầy đủ",
};

export type StellarGalleryCard = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
};

export const stellarGallerySectionCopy = {
  badge: "Trải nghiệm 3D",
  title: "Thư viện ảnh không gian",
  description: "Khám phá khoảnh khắc TechTonic trong không gian 3D",
  hint: "Kéo để xoay • Ctrl + Cuộn để zoom • Bấm thẻ để xem chi tiết",
};

export const stellarGalleryCards: StellarGalleryCard[] = [
  {
    id: "1",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206576/CSLT7_1_e6mce3.webp",
    alt: "CSLT 1",
    title: "CSLT",
  },
  {
    id: "2",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206580/tx1_ukiv2f.webp",
    alt: "TechXplore 1",
    title: "TechXplore",
  },
  {
    id: "3",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206559/CSLT3_3_al7vxr.webp",
    alt: "CSLT 2",
    title: "CSLT",
  },
  {
    id: "4",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206575/tx2_mtobag.webp",
    alt: "TechXplore 2",
    title: "TechXplore",
  },
  {
    id: "5",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206559/CSLT3_1_wlf7dl.webp",
    alt: "CSLT 3",
    title: "CSLT",
  },
  {
    id: "6",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206576/tx3_fcyobt.webp",
    alt: "TechXplore 3",
    title: "TechXplore",
  },
  {
    id: "7",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206556/CSLT7_3_voldl1.webp",
    alt: "CSLT 4",
    title: "CSLT",
  },
  {
    id: "8",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206560/tx4_vgbytt.webp",
    alt: "TechXplore 4",
    title: "TechXplore",
  },
  {
    id: "9",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206560/mm1_bk4o4u.webp",
    alt: "Mentor - Mentee 1",
    title: "Mentor - Mentee",
  },
  {
    id: "10",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206577/mm2_gewykm.webp",
    alt: "Mentor - Mentee 2",
    title: "Mentor - Mentee",
  },
  {
    id: "11",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206578/mm6_nvs60b.webp",
    alt: "Mentor - Mentee 3",
    title: "Mentor - Mentee",
  },
  {
    id: "12",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206574/ntnm1_p4uehk.webp",
    alt: "Người trong ngành MIS 1",
    title: "Người trong ngành MIS",
  },
  {
    id: "13",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206580/ntnm2_pj15jw.webp",
    alt: "Người trong ngành MIS 2",
    title: "Người trong ngành MIS",
  },
  {
    id: "14",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206578/tw1_egckia.webp",
    alt: "TechWare 1",
    title: "TechWare",
  },
  {
    id: "15",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206561/tw2_plxjv3.webp",
    alt: "TechWare 2",
    title: "TechWare",
  },
  {
    id: "16",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206581/tw3_vjo45k.webp",
    alt: "TechWare 3",
    title: "TechWare",
  },
  {
    id: "17",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206585/tw4_edkcqy.webp",
    alt: "TechWare 4",
    title: "TechWare",
  },
  {
    id: "18",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206582/tw5_wceecw.webp",
    alt: "TechWare 5",
    title: "TechWare",
  },
  {
    id: "19",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206583/tw6_mjz94x.webp",
    alt: "TechWare 6",
    title: "TechWare",
  },
  {
    id: "20",
    imageUrl: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206581/tw10_e2pf3b.webp",
    alt: "TechWare 7",
    title: "TechWare",
  },
];
