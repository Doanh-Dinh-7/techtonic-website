import type { Department, DepartmentBookPage, OrgChartNode } from "./types";

export const departmentsHeroCopy = {
  badge: "Cơ cấu tổ chức",
  title: "Các ban",
  description:
    "Khám phá cơ cấu CLB, vai trò từng ban và tìm vị trí phù hợp để đồng hành cùng TechTonic.",
  ctaStructure: "Xem cơ cấu chung",
  ctaBook: "Đọc chi tiết các ban",
};

export const departmentsStructureCopy = {
  title: "Cơ cấu chung",
  description:
    "Sơ đồ tổ chức Câu lạc bộ TechTonic — Nhấn biểu tượng thông tin để xem giới thiệu ngắn.",
};

export const departmentsBookCopy = {
  title: "Chi tiết từng ban",
  description: "Lật từng trang để tìm hiểu mô tả, nhiệm vụ và kỹ năng cần có khi tham gia.",
};

/** Ban chủ nhiệm: 3 lãnh đạo + thành viên 4 ban */
export const executiveBoardLeadershipCount = 3;
export const executiveBoardDepartmentCounts = {
  tech: 7,
  events: 11,
  media: 9,
  hr: 10,
} as const;

export const freeMemberCount = "45+";

export const orgChartNodes: Record<string, OrgChartNode> = {
  club: {
    id: "club",
    label: "Câu lạc bộ TechTonic",
    shortDescription:
      "Câu lạc bộ học thuật về công nghệ và phân tích dữ liệu, nơi sinh viên học hỏi, chia sẻ và phát triển chuyên môn.",
  },
  executiveBoard: {
    id: "executiveBoard",
    label: "Ban chủ nhiệm",
    shortDescription:
      "Đội ngũ điều hành CLB, gồm lãnh đạo và các ban chức năng phụ trách hoạt động học thuật, sự kiện, nhân sự và truyền thông.",
    color: "purple",
  },
  president: {
    id: "president",
    label: "Chủ nhiệm",
    shortDescription: "Đại diện cao nhất, định hướng chiến lược và điều phối hoạt động toàn CLB.",
    color: "purple",
  },
  vicePresident: {
    id: "vicePresident",
    label: "Phó chủ nhiệm",
    shortDescription: "Hỗ trợ Chủ nhiệm điều hành, giám sát vận hành và phối hợp giữa các ban.",
    color: "purple",
  },
  events: {
    id: "events",
    label: "Ban Sự kiện",
    shortDescription:
      "Chuẩn bị, tổ chức và giám sát các hoạt động sự kiện — tạo kết nối và nâng cao hình ảnh CLB.",
    color: "red",
  },
  eventsHead: {
    id: "eventsHead",
    label: "TB. Sự kiện",
    shortDescription:
      "Trưởng ban Sự kiện — chịu trách nhiệm điều phối kế hoạch và triển khai chương trình.",
    color: "red",
  },
  eventsDeputy: {
    id: "eventsDeputy",
    label: "PB. Sự kiện",
    shortDescription: "Phó ban Sự kiện — hỗ trợ trưởng ban và điều phối công việc nội bộ.",
    color: "red",
  },
  eventsMembers: {
    id: "eventsMembers",
    label: "Thành viên Sự kiện",
    shortDescription:
      "Thành viên ban chủ nhiệm thuộc Ban Sự kiện — tham gia trực tiếp tổ chức chương trình.",
    color: "red",
  },
  hr: {
    id: "hr",
    label: "Ban Nhân sự",
    shortDescription:
      "Phụ trách gây quỹ, đối ngoại, nhân sự và hậu cần — đảm bảo nguồn lực tài chính và vận hành CLB.",
    color: "yellow",
  },
  hrHead: {
    id: "hrHead",
    label: "TB. Nhân sự",
    shortDescription: "Trưởng ban Nhân sự — quản lý tài chính, nhân sự và đối ngoại.",
    color: "yellow",
  },
  hrDeputy: {
    id: "hrDeputy",
    label: "PB. Nhân sự",
    shortDescription: "Phó ban Nhân sự — hỗ trợ trưởng ban trong công tác hậu cần và gây quỹ.",
    color: "yellow",
  },
  hrMembers: {
    id: "hrMembers",
    label: "Thành viên Nhân sự",
    shortDescription: "Thành viên ban chủ nhiệm thuộc Ban Nhân sự.",
    color: "yellow",
  },
  media: {
    id: "media",
    label: "Ban Truyền thông",
    shortDescription:
      "Chuẩn bị, tổ chức và giám sát hoạt động truyền thông — lan tỏa hình ảnh CLB đến đúng đối tượng.",
    color: "green",
  },
  mediaHead: {
    id: "mediaHead",
    label: "TB. Truyền thông",
    shortDescription:
      "Trưởng ban Truyền thông — định hướng chiến dịch và quản lý kênh truyền thông.",
    color: "green",
  },
  mediaDeputy: {
    id: "mediaDeputy",
    label: "PB. Truyền thông",
    shortDescription: "Phó ban Truyền thông — hỗ trợ sản xuất nội dung và điều phối chiến dịch.",
    color: "green",
  },
  mediaMembers: {
    id: "mediaMembers",
    label: "Thành viên Truyền thông",
    shortDescription: "Thành viên ban chủ nhiệm thuộc Ban Truyền thông.",
    color: "green",
  },
  tech: {
    id: "tech",
    label: "Ban Chuyên môn",
    shortDescription:
      "Chuẩn bị, tổ chức và giám sát hoạt động học thuật — tạo môi trường học tập chuyên sâu và ứng dụng.",
    color: "orange",
  },
  techHead: {
    id: "techHead",
    label: "TB. Chuyên môn",
    shortDescription: "Trưởng ban Chuyên môn — định hướng nội dung học thuật và dự án CNTT nội bộ.",
    color: "orange",
  },
  techDeputy: {
    id: "techDeputy",
    label: "PB. Chuyên môn",
    shortDescription: "Phó ban Chuyên môn — hỗ trợ triển khai khóa học, workshop và dự án.",
    color: "orange",
  },
  techMembers: {
    id: "techMembers",
    label: "Thành viên Chuyên môn",
    shortDescription: "Thành viên ban chủ nhiệm thuộc Ban Chuyên môn.",
    color: "orange",
  },
  advisors: {
    id: "advisors",
    label: "Cố vấn học thuật",
    shortDescription: "Đội ngũ cố vấn sinh viên và giảng viên hỗ trợ định hướng học thuật cho CLB.",
    color: "blue",
  },
  studentAdvisor: {
    id: "studentAdvisor",
    label: "Cố vấn sinh viên",
    shortDescription: "Anh chị đi trước hỗ trợ mentor, định hướng học tập và hoạt động ngoại khóa.",
    color: "blue",
  },
  facultyAdvisor: {
    id: "facultyAdvisor",
    label: "Cố vấn giảng viên",
    shortDescription: "Giảng viên hỗ trợ định hướng học thuật và chuyên môn cho CLB.",
    color: "blue",
  },
  freeMembers: {
    id: "freeMembers",
    label: "Thành viên tự do",
    shortDescription:
      "Dành cho bạn mong muốn phát triển sâu về học thuật và tận dụng quyền lợi tại CLB mà không thuộc ban chủ nhiệm.",
    color: "blue",
  },
  pythonDb: {
    id: "pythonDb",
    label: "Lập trình Python & CSDL",
    shortDescription:
      "Nhóm học tập Python và Cơ sở dữ liệu — tham gia khóa chuyên đề và dự án thực tế.",
    color: "blue",
  },
  backend: {
    id: "backend",
    label: "Thành viên chuyên môn Back-end",
    shortDescription: "Phát triển kỹ năng back-end qua dự án và hoạt động học thuật của CLB.",
    color: "blue",
  },
  frontend: {
    id: "frontend",
    label: "Thành viên chuyên môn Front-end",
    shortDescription: "Phát triển kỹ năng front-end qua dự án web/app nội bộ.",
    color: "blue",
  },
  dataAi: {
    id: "dataAi",
    label: "Thành viên chuyên môn Data & AI",
    shortDescription: "Khám phá phân tích dữ liệu và AI qua workshop, dự án nghiên cứu.",
    color: "blue",
  },
  product: {
    id: "product",
    label: "Product team",
    shortDescription:
      "Nhóm phát triển sản phẩm — báo cáo tiến độ, tư duy sản phẩm và làm việc nhóm.",
    color: "blue",
  },
};

export const departmentBookPages: DepartmentBookPage[] = [
  {
    id: "cover",
    title: "Câu lạc bộ TechTonic",
    subtitle: "Dream it, Code it.",
    color: "purple",
    overview: [
      "Chào mừng bạn đến với cuốn sổ giới thiệu cơ cấu CLB. Lật từng trang để tìm hiểu vai trò thành viên tự do, Ban chủ nhiệm và từng ban chức năng.",
    ],
    isCover: true,
  },
  {
    id: "free",
    title: "Thành viên tự do",
    color: "blue",
    memberCount: freeMemberCount,
    overview: [
      "Vai trò dành cho những bạn mong muốn tập trung phát triển sâu về mặt học thuật và tận dụng tối đa quyền lợi và điều kiện phát triển tại câu lạc bộ TechTonic.",
      "Có quyền tham gia các hoạt động học thuật như khóa chia sẻ, hướng dẫn, định hướng chuyên môn và các dự án học tập, nghiên cứu. Đồng thời được tham gia hoạt động sự kiện, chương trình nội bộ và cộng đồng để kết nối, giao lưu và phát triển bản thân.",
    ],
    skills: [
      "Đam mê công nghệ và học thuật, sẵn sàng tham gia hoạt động CLB.",
      "Tinh thần học hỏi, chủ động kết nối với cộng đồng.",
      "Kỹ năng làm việc nhóm và giao tiếp cơ bản.",
    ],
  },
  {
    id: "bcn",
    title: "Thành viên Ban chủ nhiệm",
    color: "purple",
    memberCount: `${executiveBoardLeadershipCount} lãnh đạo + ${Object.values(executiveBoardDepartmentCounts).reduce((a, b) => a + b, 0)} TV các ban`,
    overview: [
      "Vai trò dành cho những bạn muốn thử sức với vai trò tổ chức, quản lý và điều hành các hoạt động của câu lạc bộ từ bên trong, tạo ra giá trị sâu sắc và lâu dài cho câu lạc bộ.",
      "Chịu trách nhiệm chính cho hoạt động CLB, phân thành 4 ban: Sự kiện, Nhân sự, Truyền thông, Chuyên môn. Thành viên BCN được hưởng đầy đủ quyền lợi thành viên tự do và cơ hội rèn luyện kỹ năng mềm, quản lý, lãnh đạo.",
    ],
    skills: [
      "Tinh thần trách nhiệm cao, chủ động và sẵn sàng cống hiến.",
      "Kỹ năng tổ chức, giao tiếp và phối hợp nhóm.",
      "Khả năng quản lý thời gian và xử lý tình huống.",
    ],
  },
  {
    id: "tech",
    title: "Ban Chuyên môn",
    color: "orange",
    memberCount: `${executiveBoardDepartmentCounts.tech} thành viên`,
    overview: [
      "Ban Chuyên Môn chịu trách nhiệm chuẩn bị, tổ chức và giám sát các hoạt động học thuật của Câu lạc bộ TechTonic, nhằm tạo ra môi trường học tập có chiều sâu, bền vững và mang tính ứng dụng cao.",
      "Ban ưu tiên tính chuyên sâu và mức độ phù hợp của hoạt động hơn là sức lan tỏa truyền thông; là đầu mối đại diện tiếng nói học thuật của CLB.",
    ],
    phases: [
      {
        title: "Trước hoạt động học thuật",
        items: [
          "Lập kế hoạch chi tiết cho các hoạt động học thuật.",
          "Xây dựng lộ trình khóa học, phân công công việc cho các ban liên quan.",
          "Biên soạn tài liệu sử dụng trong khóa học, dự án.",
          "Nghiên cứu và đảm bảo chất lượng hoạt động học thuật.",
          "Khuyến khích thành viên tham gia cuộc thi học thuật liên quan.",
        ],
      },
      {
        title: "Trong hoạt động học thuật",
        items: [
          "Điều phối, giám sát triển khai hoạt động đạt mục tiêu.",
          "Quản lý dự án CNTT nội bộ (Front-end, Back-end, Data & AI).",
          "Đóng vai trò người hướng dẫn kiến thức, kỹ năng cho thành viên.",
          "Tổ chức hoạt động kết nối nhỏ trong các nhóm học.",
        ],
      },
      {
        title: "Sau hoạt động học thuật",
        items: [
          "Tổ chức họp báo cáo, đánh giá chất lượng đầu ra.",
          "Đưa ra giải pháp, kiến thức, kỹ năng cần bổ sung để cải thiện hoạt động CLB.",
        ],
      },
    ],
    skills: [
      "Đam mê Công nghệ thông tin (không yêu cầu kinh nghiệm chuyên sâu).",
      "Tinh thần học hỏi, tự nghiên cứu và sẵn sàng chia sẻ.",
      "Làm việc nhóm và giao tiếp hiệu quả trong môi trường học thuật.",
      "Chủ động, trách nhiệm trong công việc được phân công.",
      "Ưu tiên: kiến thức cơ bản lập trình/IT, kinh nghiệm dự án/cuộc thi, kỹ năng thuyết trình.",
    ],
  },
  {
    id: "events",
    title: "Ban Sự kiện",
    color: "red",
    memberCount: `${executiveBoardDepartmentCounts.events} thành viên`,
    overview: [
      "Ban Sự Kiện tập trung công tác chuẩn bị, tổ chức, giám sát các hoạt động sự kiện của câu lạc bộ TechTonic — tạo kết nối bên trong và bên ngoài CLB.",
      "Ban đề cao tính phù hợp của sự kiện với đối tượng và mục tiêu CLB, tránh chạy theo xu hướng hình thức; đại diện tiếng nói CLB khi truyền thông chương trình.",
    ],
    phases: [
      {
        title: "Trước chương trình",
        items: [
          "Đề xuất và phát triển ý tưởng sự kiện mới phù hợp mục tiêu CLB.",
          "Lập kế hoạch chi tiết, timeline, checklist, phân bổ nguồn lực, kịch bản.",
          "Khảo sát địa điểm, đối tượng và các yếu tố liên quan.",
          "Chuẩn bị, sắp xếp và kiểm tra âm thanh, ánh sáng.",
        ],
      },
      {
        title: "Trong chương trình",
        items: [
          "Điều phối mọi khâu theo kịch bản và timeline; xử lý tình huống bất ngờ.",
          "Hỗ trợ người tham gia và khách mời sự kiện.",
        ],
      },
      {
        title: "Sau chương trình",
        items: ["Tham gia họp báo cáo, đánh giá và đề xuất cải thiện sau sự kiện."],
      },
    ],
    skills: [
      "Tinh thần nhiệt huyết, yêu thích hoạt động Đoàn – Hội.",
      "Sáng tạo, chủ động đóng góp ý tưởng mới.",
      "Kỹ năng teamwork và giao tiếp.",
      "Trách nhiệm, kỷ luật và sẵn sàng học hỏi lập kế hoạch, tổ chức sự kiện.",
    ],
  },
  {
    id: "media",
    title: "Ban Truyền thông",
    color: "green",
    memberCount: `${executiveBoardDepartmentCounts.media} thành viên`,
    overview: [
      "Ban Truyền Thông tập trung công tác chuẩn bị, tổ chức, giám sát hoạt động truyền thông nhằm lan tỏa hình ảnh và tiếp cận đúng đối tượng mục tiêu.",
      "Ban không chỉ hoạt động trực tuyến mà còn thực hiện truyền thông trực tiếp; đại diện tiếng nói CLB khi truyền thông ra bên ngoài.",
    ],
    phases: [
      {
        title: "Trước chiến dịch truyền thông",
        items: [
          "Nghiên cứu, khảo sát insight đối tượng mục tiêu.",
          "Lập kế hoạch truyền thông trực tiếp và trực tuyến.",
          "Quản lý các kênh truyền thông chính thức của CLB.",
        ],
      },
      {
        title: "Trong chiến dịch truyền thông",
        items: [
          "Điều phối chiến dịch theo kế hoạch; xử lý tình huống linh hoạt.",
          "Sáng tạo nội dung và thiết kế ấn phẩm theo nhận diện CLB.",
          "Chụp ảnh, quay phim và sản xuất video recap sự kiện.",
          "Phối hợp các ban truyền thông đồng bộ; theo dõi tương tác và phản hồi.",
        ],
      },
      {
        title: "Sau chiến dịch truyền thông",
        items: ["Tham gia họp đánh giá và đề xuất cải thiện."],
      },
    ],
    skills: [
      "Tinh thần trách nhiệm, đam mê truyền thông – sáng tạo.",
      "Kỹ năng viết tốt, diễn đạt ý tưởng mạch lạc.",
      "Biết Canva, Photoshop, Illustrator và/hoặc dựng video (Premiere, CapCut) là lợi thế.",
      "Kỹ năng chụp ảnh, quay video cơ bản hoặc mong muốn học thêm.",
      "Làm việc nhóm, chủ động; cập nhật xu hướng truyền thông, trend MXH.",
    ],
  },
  {
    id: "hr",
    title: "Ban Nhân sự",
    color: "yellow",
    memberCount: `${executiveBoardDepartmentCounts.hr} thành viên`,
    overview: [
      "Ban phụ trách công tác gây quỹ, đối ngoại, nhân sự và hậu cần — đảm bảo nguồn lực tài chính và vận hành cho các hoạt động của CLB TechTonic.",
      "Ban thực hiện nhiệm vụ với tính cẩn trọng, minh bạch và rõ ràng; đại diện tiếng nói CLB trong truyền thông liên quan gây quỹ, đối ngoại, nhân sự và hậu cần.",
    ],
    phases: [
      {
        title: "Gây quỹ & đối ngoại — Trước",
        items: [
          "Khảo sát địa điểm, nguồn hàng, sản phẩm phục vụ gây quỹ.",
          "Nghiên cứu, thảo luận sản phẩm phù hợp; lập kế hoạch, phân công, timeline.",
          "Xác định danh sách nhà tài trợ tiềm năng; lập proposal, thư ngỏ, bảng danh vị.",
        ],
      },
      {
        title: "Gây quỹ & đối ngoại — Trong",
        items: [
          "Điều phối quá trình gây quỹ theo kế hoạch; xử lý tình huống phát sinh.",
          "Đàm phán với đơn vị tài trợ; tiếp đón, hỗ trợ nhà tài trợ tại chương trình.",
        ],
      },
      {
        title: "Nhân sự & hậu cần",
        items: [
          "Quản lý dữ liệu thành viên, hồ sơ nội bộ; duy trì kênh liên lạc (Facebook, Email).",
          "Lập checklist, dự trù chi phí, chuẩn bị form, đồ dùng cho hoạt động CLB.",
          "Phối hợp Ban Sự kiện, Chuyên môn, Truyền thông chuẩn bị địa điểm, dụng cụ.",
          "Quản lý tài chính – quỹ CLB minh bạch, rõ ràng xuyên suốt.",
          "Lập bảng thu chi sau các hoạt động; duy trì quan hệ đối tác, nhà tài trợ.",
        ],
      },
    ],
    skills: [
      "Tính cách tỉ mỉ, cẩn thận, chỉn chu.",
      "Tinh thần trách nhiệm cao, làm việc khoa học.",
      "Kỹ năng tổ chức, giao tiếp và phối hợp nhóm.",
      "Thành thạo Google Sheet, Doc, Form, Email.",
      "Chủ động, sáng tạo; đề cao minh bạch và gắn kết tập thể.",
    ],
  },
];

/** Legacy list — giữ tương thích nếu có import cũ */
export const departments: Department[] = departmentBookPages
  .filter((p) => !p.isCover && ["tech", "events", "media", "hr"].includes(p.id))
  .map((p) => ({
    id: p.id,
    name: p.title,
    shortName: p.id === "tech" ? "CM" : p.id === "events" ? "SK" : p.id === "media" ? "TT" : "NS",
    description: p.overview[0] ?? "",
    highlights: p.phases?.[0]?.items.slice(0, 2) ?? p.skills?.slice(0, 2) ?? [],
  }));
