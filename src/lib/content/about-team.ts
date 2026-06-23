import type { AboutTeamLevel, AboutTeamMember, AboutTeamTerm } from "./types";

const PLACEHOLDER_BASE = { name: "Đang cập nhật", role: "", isPlaceholder: true };

type TeamMemberInput = Omit<AboutTeamMember, "level">;

function levelRow(level: AboutTeamLevel, members: TeamMemberInput[]): AboutTeamMember[] {
  return members.map((member) => ({ ...member, level }));
}

export const aboutTeamTerms: AboutTeamTerm[] = [
  {
    id: "founders",
    label: "Các nhà sáng lập",
    boards: [
      {
        id: "founders-all",
        label: "Các nhà sáng lập",
        hierarchy: [
          levelRow(1, [
            {
              name: "Nguyễn Văn Quang",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206572/Nguyen_Van_Quang_pqrrh1.jpg",
            },
            {
              name: "Đinh Sỹ Quốc Doanh",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206562/Dinh_Sy_Quoc_Doanh_hiqkcs.jpg",
            },
            {
              name: "Nguyễn Anh Tú",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Anh_Tu_z0wpya.jpg",
            },
            {
              name: "Nguyễn Thị Kim Phượng",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206565/Nguyen_Thi_Kim_Phuong_tjgduj.jpg",
            },
            {
              name: "Phạm Bảo Hân",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206567/Pham_Bao_Han_wkv0s1.jpg",
            },
          ]),
          levelRow(2, [
            {
              name: "Lê Minh Thư",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Le_Minh_Thu_suucwn.jpg",
            },
            {
              name: "Nguyễn Thị Ánh Tuyết",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Thi_Anh_Tuyet_an6hzg.jpg",
            },
            {
              name: "Nguyễn Đình Khoa",
              role: "Co-Founder",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206554/Nguyen_Dinh_Khoa_focqi8.jpg",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "2024-2025",
    label: "Nhiệm kỳ 2024 - 2025",
    boards: [
      {
        id: "ban-chu-nhiem",
        label: "Ban Chủ nhiệm",
        hierarchy: [
          levelRow(1, [
            {
              name: "Nguyễn Văn Quang",
              role: "Chủ nhiệm CLB",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206572/Nguyen_Van_Quang_pqrrh1.jpg",
            },
          ]),
          levelRow(2, [
            {
              name: "Đinh Sỹ Quốc Doanh",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206562/Dinh_Sy_Quoc_Doanh_hiqkcs.jpg",
            },
            {
              name: "Nguyễn Anh Tú",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Anh_Tu_z0wpya.jpg",
            },
            {
              name: "Nguyễn Thị Kim Phượng",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206565/Nguyen_Thi_Kim_Phuong_tjgduj.jpg",
            },
            {
              name: "Phạm Bảo Hân",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206567/Pham_Bao_Han_wkv0s1.jpg",
            },
          ]),
        ],
      },
      {
        id: "ban-chuyen-mon",
        label: "Ban Chuyên môn",
        hierarchy: [
          levelRow(1, [
            {
              name: "Đinh Sỹ Quốc Doanh",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206562/Dinh_Sy_Quoc_Doanh_hiqkcs.jpg",
            },
          ]),
          levelRow(2, [
            {
              name: "Nguyễn Đình Khoa",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206554/Nguyen_Dinh_Khoa_focqi8.jpg",
            },
            // { ...PLACEHOLDER_BASE, role: "Phó ban Chuyên môn" },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Lê Thị Nhung Nguyệt",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trương Thị Lan",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Thị Tố Viên",
              role: "Thành viên",
            },
          ]),
        ],
      },
      {
        id: "ban-su-kien",
        label: "Ban Sự kiện",
        hierarchy: [
          levelRow(1, [
            {
              name: "Nguyễn Anh Tú",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Anh_Tu_z0wpya.jpg",
            },
          ]),
          levelRow(2, [
            {
              ...PLACEHOLDER_BASE,
              name: "Phạm Ngọc Yến Nhi",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Đoàn Ngọc Bảo Trân",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Thị Ngọc Nhi",
              role: "Thành viên",
            },
          ]),
        ],
      },
      {
        id: "ban-nhan-su",
        label: "Ban Nhân sự",
        hierarchy: [
          levelRow(1, [
            {
              name: "Nguyễn Thị Kim Phượng",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206565/Nguyen_Thi_Kim_Phuong_tjgduj.jpg",
            },
          ]),
          levelRow(2, [
            {
              name: "Lê Minh Thư",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Le_Minh_Thu_suucwn.jpg",
            },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Hà Gia Bảo Ngọc",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Lê Nữ Hạnh Nhân",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Đặng Thị Thanh Ngân",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Nhật Minh Anh",
              role: "Thành viên",
            },
          ]),
        ],
      },
      {
        id: "ban-truyen-thong",
        label: "Ban Truyền thông",
        hierarchy: [
          levelRow(1, [
            {
              name: "Phạm Bảo Hân",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206567/Pham_Bao_Han_wkv0s1.jpg",
            },
          ]),
          levelRow(2, [
            {
              name: "Nguyễn Thị Ánh Tuyết",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Thi_Anh_Tuyet_an6hzg.jpg",
            },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Đinh Phương Thảo",
              role: "Thành viên",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "2025-2026",
    label: "Nhiệm kỳ 2025 - 2026",
    boards: [
      {
        id: "ban-chu-nhiem",
        label: "Ban Chủ nhiệm",
        hierarchy: [
          levelRow(1, [
            {
              name: "Phan Nhật Minh Anh",
              role: "Chủ nhiệm CLB",
              image: "/ban_chu_nhiem/2024/Minh_Anh.jpg",
            },
          ]),
          levelRow(2, [
            {
              ...PLACEHOLDER_BASE,
              name: "Đặng Nguyễn Quốc Bảo",
              role: "Phó Chủ nhiệm",
            },
            {
              name: "Nguyễn Văn Quang",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206572/Nguyen_Van_Quang_pqrrh1.jpg",
            },
          ]),
        ],
      },
      {
        id: "ban-chuyen-mon",
        label: "Ban Chuyên môn",
        hierarchy: [
          levelRow(1, [
            {
              ...PLACEHOLDER_BASE,
              name: "Lê Thị Nhung Nguyệt",
              role: "Trưởng ban",
            },
          ]),
          levelRow(2, [
            {
              ...PLACEHOLDER_BASE,
              name: "Trương Thị Lan",
              role: "Phó ban",
            },
          ]),
          levelRow(3, [
            {
              name: "Đinh Sỹ Quốc Doanh",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206562/Dinh_Sy_Quoc_Doanh_hiqkcs.jpg",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Đình Khoa",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Hồ Văn Trường",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Nguyễn Hải Đăng",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Lê Anh Hoàng",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Đinh Tấn Khoa",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trương Phan Như Ngọc",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Thị Thanh Tâm",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Ngô Thị Ngọc Huyền",
              role: "Thành viên",
            },
          ]),
        ],
      },
      {
        id: "ban-su-kien",
        label: "Ban Sự kiện",
        hierarchy: [
          levelRow(1, [
            {
              name: "Nguyễn Anh Tú",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Anh_Tu_z0wpya.jpg",
            },
          ]),
          levelRow(2, [
            {
              ...PLACEHOLDER_BASE,
              name: "Đoàn Ngọc Bảo Trân",
              role: "Phó ban",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phạm Ngọc Yến Nhi",
              role: "Phó ban",
            },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Thị Thanh Thảo",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Ngọc Nhật",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Nguyễn Minh Anh",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Tôn Phương Thảo",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Tô Nguyễn Quốc Bảo",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Thị Phương Thảo",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phạm Nhật Hạ",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Đặng Mai Phương",
              role: "Thành viên",
            },
          ]),
        ],
      },
      {
        id: "ban-nhan-su",
        label: "Ban Nhân sự",
        hierarchy: [
          levelRow(1, [
            {
              name: "Nguyễn Thị Kim Phượng",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206565/Nguyen_Thi_Kim_Phuong_tjgduj.jpg",
            },
          ]),
          levelRow(2, [
            {
              ...PLACEHOLDER_BASE,
              name: "Hà Gia Bảo Ngọc",
              role: "Phó ban",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Đặng Thị Thanh Ngân",
              role: "Phó ban",
            },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Lê Nữ Hạnh Nhân",
              role: "Thành viên",
            },
            {
              name: "Lê Minh Thư",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Le_Minh_Thu_suucwn.jpg",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phạm Khánh Ngân",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Thị Thu Uyên",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Ngô Phương Thảo",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Anh Tú",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Ngọc Mai Thảo",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Thị Quỳnh Chi",
              role: "Thành viên",
            },
          ]),
        ],
      },
      {
        id: "ban-truyen-thong",
        label: "Ban Truyền thông",
        hierarchy: [
          levelRow(1, [
            {
              ...PLACEHOLDER_BASE,
              name: "Võ Đình Khoa",
              role: "Trưởng ban",
            },
          ]),
          levelRow(2, [
            {
              ...PLACEHOLDER_BASE,
              name: "Phạm Nhật Uyên",
              role: "Phó ban",
            },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Huỳnh Minh Ánh",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Thị Yến Chi",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Trần Hạ Giang",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Nguyễn Nữ Vũ Hoàng",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Lê Văn Lợi",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Nhật Đài Trang",
              role: "Thành viên",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Vũ Thị Huyền Trang",
              role: "Thành viên",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "2026-2027",
    label: "Nhiệm kỳ 2026 - 2027",
    boards: [
      {
        id: "ban-chu-nhiem",
        label: "Ban Chủ nhiệm",
        hierarchy: [
          levelRow(1, [{ ...PLACEHOLDER_BASE, role: "Chủ nhiệm CLB" }]),
          levelRow(2, [{ ...PLACEHOLDER_BASE, role: "Phó Chủ nhiệm" }]),
        ],
      },
      {
        id: "ban-chuyen-mon",
        label: "Ban Chuyên môn",
        hierarchy: [
          levelRow(1, [{ ...PLACEHOLDER_BASE, role: "Trưởng ban" }]),
          levelRow(2, [{ ...PLACEHOLDER_BASE, role: "Phó ban" }]),
        ],
      },
      {
        id: "ban-su-kien",
        label: "Ban Sự kiện",
        hierarchy: [
          levelRow(1, [{ ...PLACEHOLDER_BASE, role: "Trưởng ban" }]),
          levelRow(2, [{ ...PLACEHOLDER_BASE, role: "Phó ban" }]),
        ],
      },
      {
        id: "ban-nhan-su",
        label: "Ban Nhân sự",
        hierarchy: [
          levelRow(1, [{ ...PLACEHOLDER_BASE, role: "Trưởng ban" }]),
          levelRow(2, [{ ...PLACEHOLDER_BASE, role: "Phó ban" }]),
        ],
      },
      {
        id: "ban-truyen-thong",
        label: "Ban Truyền thông",
        hierarchy: [
          levelRow(1, [{ ...PLACEHOLDER_BASE, role: "Trưởng ban" }]),
          levelRow(2, [{ ...PLACEHOLDER_BASE, role: "Phó ban" }]),
        ],
      },
    ],
  },
];

/** Tháng 1–8: cuối nhiệm kỳ (startYear = year - 1). Tháng 9–12: đầu nhiệm kỳ mới (startYear = year). */
export function getAboutTeamTermIdForDate(date: Date): string {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const startYear = month >= 1 && month <= 8 ? year - 1 : year;
  return `${startYear}-${startYear + 1}`;
}

function parseTermStartYear(termId: string): number {
  return Number.parseInt(termId.split("-")[0] ?? "0", 10);
}

/** Chọn nhiệm kỳ mặc định; fallback về nhiệm kỳ gần nhất có trong `terms` nếu chưa có dữ liệu. */
export function resolveDefaultAboutTeamTermId(
  terms: AboutTeamTerm[] = aboutTeamTerms,
  date: Date = new Date()
): string {
  const preferredId = getAboutTeamTermIdForDate(date);
  if (terms.some((term) => term.id === preferredId)) {
    return preferredId;
  }

  const academicTermIds = terms
    .filter((term) => term.id !== "founders")
    .map((term) => term.id)
    .sort((a, b) => parseTermStartYear(a) - parseTermStartYear(b));

  if (academicTermIds.length === 0) {
    return terms[0]?.id ?? preferredId;
  }

  const preferredStart = parseTermStartYear(preferredId);
  const eligible = academicTermIds.filter((id) => parseTermStartYear(id) <= preferredStart);

  if (eligible.length > 0) {
    return eligible[eligible.length - 1]!;
  }

  return academicTermIds[0]!;
}

export const DEFAULT_ABOUT_TEAM_TERM_ID = resolveDefaultAboutTeamTermId(aboutTeamTerms);
export const DEFAULT_ABOUT_TEAM_BOARD_ID = "ban-chu-nhiem";
