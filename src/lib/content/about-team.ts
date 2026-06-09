import type { AboutTeamTerm } from "./types";

const PLACEHOLDER = { name: "Đang cập nhật", role: "", isPlaceholder: true };

export const aboutTeamTerms: AboutTeamTerm[] = [
  {
    id: "founders",
    label: "Các nhà sáng lập",
    boards: [
      {
        id: "founders-all",
        label: "Các nhà sáng lập",
        hierarchy: [
          [
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
          ],
          [
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
          ],
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
          [
            {
              name: "Phan Nhật Minh Anh",
              role: "Chủ nhiệm CLB",
              image: "/ban_chu_nhiem/2024/Minh_Anh.jpg",
            },
          ],
          [{ ...PLACEHOLDER, role: "Phó Chủ nhiệm" }],
        ],
      },
      {
        id: "ban-chuyen-mon",
        label: "Ban Chuyên môn",
        hierarchy: [
          [
            {
              name: "Lê Thị Nhung Nguyệt",
              role: "Trưởng ban Chuyên môn",
              image: "/ban_chu_nhiem/2024/Nhung_Nguyet.jpg",
            },
          ],
          [{ ...PLACEHOLDER, role: "Phó ban Chuyên môn" }],
        ],
      },
      {
        id: "ban-su-kien",
        label: "Ban Sự kiện",
        hierarchy: [
          [
            {
              name: "Nguyễn Anh Tú",
              role: "Trưởng ban Sự kiện",
              image: "/ban_chu_nhiem/2024/Nguyen_Anh_Tu.jpg",
            },
          ],
        ],
      },
      {
        id: "ban-nhan-su",
        label: "Ban Nhân sự",
        hierarchy: [
          [
            {
              name: "Lê Nữ Hạnh Nhân",
              role: "Trưởng ban Nhân sự",
              image: "/ban_chu_nhiem/2024/Hanh_Nhan.jpg",
            },
          ],
        ],
      },
      {
        id: "ban-truyen-thong",
        label: "Ban Truyền thông",
        hierarchy: [
          [
            {
              name: "Võ Đình Khoa",
              role: "Trưởng ban Truyền thông",
              image: "/ban_chu_nhiem/2024/Vo_Dinh_khoa.jpg",
            },
          ],
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
          [{ ...PLACEHOLDER, role: "Chủ nhiệm CLB" }],
          [{ ...PLACEHOLDER, role: "Phó Chủ nhiệm" }],
        ],
      },
      {
        id: "ban-chuyen-mon",
        label: "Ban Chuyên môn",
        hierarchy: [
          [{ ...PLACEHOLDER, role: "Trưởng ban Chuyên môn" }],
          [{ ...PLACEHOLDER, role: "Phó ban Chuyên môn" }],
        ],
      },
      {
        id: "ban-su-kien",
        label: "Ban Sự kiện",
        hierarchy: [[{ ...PLACEHOLDER, role: "Trưởng ban Sự kiện" }]],
      },
      {
        id: "ban-nhan-su",
        label: "Ban Nhân sự",
        hierarchy: [[{ ...PLACEHOLDER, role: "Trưởng ban Nhân sự" }]],
      },
      {
        id: "ban-truyen-thong",
        label: "Ban Truyền thông",
        hierarchy: [[{ ...PLACEHOLDER, role: "Trưởng ban Truyền thông" }]],
      },
    ],
  },
];

export const DEFAULT_ABOUT_TEAM_TERM_ID = "2024-2025";
export const DEFAULT_ABOUT_TEAM_BOARD_ID = "ban-chu-nhiem";
