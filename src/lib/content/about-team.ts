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
              name: "Lê Thị Nhung Nguyệt",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785756480/L%C3%AA_Th%E1%BB%8B_Nhung_Nguy%E1%BB%87t_duhokv.png",
            },
            {
              name: "Trương Thị Lan",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785756480/Tr%C6%B0%C6%A1ng_Th%E1%BB%8B_Lan_myf63j.png",
            },
            {
              name: "Trần Thị Tố Viên",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785756480/Tr%E1%BA%A7n_Th%E1%BB%8B_T%E1%BB%91_Vi%C3%AAn_g95y1h.png",
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
              name: "Phạm Ngọc Yến Nhi",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785757609/Ph%E1%BA%A1m_Ng%E1%BB%8Dc_Y%E1%BA%BFn_Nhi_ynohwy.png",
            },
            {
              name: "Đoàn Ngọc Bảo Trân",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785757609/%C4%90o%C3%A0n_Ng%E1%BB%8Dc_B%E1%BA%A3o_Tr%C3%A2n_hrqimk.png",
            },
            {
              name: "Nguyễn Thị Ngọc Nhi",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785764795/Nguy%E1%BB%85n_Th%E1%BB%8B_Ng%E1%BB%8Dc_Nhi_bdaxme.png",
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
              name: "Hà Gia Bảo Ngọc",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785759527/H%C3%A0_Gia_B%E1%BA%A3o_Ng%E1%BB%8Dc_yvnm54.png",
            },
            {
              name: "Lê Nữ Hạnh Nhân",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785759526/L%C3%AA_N%E1%BB%AF_H%E1%BA%A1nh_Nh%C3%A2_nroioz.png",
            },
            {
              name: "Đặng Thị Thanh Ngân",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785759527/%C4%90%E1%BA%B7ng_Th%E1%BB%8B_Thanh_Ng%C3%A2n_obutmi.png",
            },
            {
              name: "Phan Nhật Minh Anh",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785759526/Phan_Nh%E1%BA%ADt_Minh_Anh_um4ewk.png",
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
              name: "Đinh Phương Thảo",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785759534/%C4%90inh_Ph%C6%B0%C6%A1ng_Th%E1%BA%A3o_tei8s6.png",
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
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785766691/Phan_Nh%E1%BA%ADt_Minh_Anh_q7otkn.png",
            },
          ]),
          levelRow(2, [
            {
              name: "Đặng Nguyễn Quốc Bảo",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785766691/%C4%90%E1%BA%B7ng_Nguy%E1%BB%85n_Qu%E1%BB%91c_B%E1%BA%A3o_gunprt.png",
            },
            {
              name: "Nguyễn Văn Quang",
              role: "Phó Chủ nhiệm",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785766691/Nguy%E1%BB%85n_V%C4%83n_Quang_h0s7sg.png",
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
              name: "Lê Thị Nhung Nguyệt",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785816321/L%C3%AA_Th%E1%BB%8B_Nhung_Nguy%E1%BB%87t_wjtzqq.png",
            },
          ]),
          levelRow(2, [
            {
              name: "Trương Thị Lan",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785816310/Tr%C6%B0%C6%A1ng_Th%E1%BB%8B_Lan_vvjynt.png",
            },
          ]),
          levelRow(3, [
            {
              name: "Đinh Sỹ Quốc Doanh",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785816322/%C4%90inh_S%E1%BB%B9_Qu%E1%BB%91c_Doanh_ub0a50.png",
            },
            {
              name: "Nguyễn Đình Khoa",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785817599/Nguy%E1%BB%85n_%C4%90%C3%ACnh_Khoa_krppvv.png",
            },
            {
              name: "Hồ Văn Trường",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785817600/H%E1%BB%93_V%C4%83n_Tr%C6%B0%E1%BB%9Dng_nlrxqc.png",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Phan Nguyễn Hải Đăng",
              role: "Thành viên",
            },
            {
              name: "Nguyễn Lê Anh Hoàng",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785817600/Nguy%E1%BB%85n_L%C3%AA_Anh_Ho%C3%A0ng_ymbmzl.png",
            },
            {
              name: "Đinh Tấn Khoa",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1786544925/%C4%90inh_T%E1%BA%A5n_Khoa_fg66bg.png",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trương Phan Như Ngọc",
              role: "Thành viên",
            },
            {
              name: "Trần Thị Thanh Tâm",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1786544841/Tr%E1%BA%A7n_Th%E1%BB%8B_Thanh_T%C3%A2m_h3iqu1.png",
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
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785833721/Nguy%E1%BB%85n_Anh_T%C3%BA_bwmr0q.png",
            },
          ]),
          levelRow(2, [
            {
              name: "Đoàn Ngọc Bảo Trân",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785833720/%C4%90o%C3%A0n_Ng%E1%BB%8Dc_B%E1%BA%A3o_Tr%C3%A2n_biye8o.png",
            },
            {
              name: "Phạm Ngọc Yến Nhi",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785833722/Ph%E1%BA%A1m_Ng%E1%BB%8Dc_Y%E1%BA%BFn_Nhi_uhyzbr.png",
            },
          ]),
          levelRow(3, [
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Thị Thanh Thảo",
              role: "Thành viên",
            },
            {
              name: "Nguyễn Ngọc Nhật",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785833720/Nguy%E1%BB%85n_Ng%E1%BB%8Dc_Nh%E1%BA%ADt_wvbxsh.png",
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
              name: "Tô Nguyễn Quốc Bảo",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1786549679/T%C3%B4_Nguy%E1%BB%85n_Qu%E1%BB%91c_B%E1%BA%A3o_ewkhlv.png",
            },
            {
              name: "Nguyễn Thị Phương Thảo",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785833721/Nguy%E1%BB%85n_Th%E1%BB%8B_Ph%C6%B0%C6%A1ng_Th%E1%BA%A3o_an1iu6.png",
            },
            {
              name: "Phạm Nhật Hạ",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1786549680/Ph%E1%BA%A1m_Nh%E1%BA%ADt_H%E1%BA%A1_sdblbc.png",
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
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785834931/Nguy%E1%BB%85n_Th%E1%BB%8B_Kim_Ph%C6%B0%E1%BB%A3ng_vethgb.png",
            },
          ]),
          levelRow(2, [
            {
              name: "Hà Gia Bảo Ngọc",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785834930/H%C3%A0_Gia_B%E1%BA%A3o_Ng%E1%BB%8Dc_vlc6kh.png",
            },
            {
              name: "Đặng Thị Thanh Ngân",
              role: "Phó ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785834930/%C4%90%E1%BA%B7ng_Th%E1%BB%8B_Thanh_Ng%C3%A2n_s32hty.png",
            },
          ]),
          levelRow(3, [
            {
              name: "Lê Nữ Hạnh Nhân",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785834929/L%C3%AA_N%E1%BB%AF_H%E1%BA%A1nh_Nh%C3%A2n_eo3udq.png",
            },
            {
              name: "Lê Minh Thư",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785834930/L%C3%AA_Minh_Th%C6%B0_i21qof.png",
            },
            {
              name: "Phạm Khánh Ngân",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785839866/Ph%E1%BA%A1m_Kh%C3%A1nh_Ng%C3%A2n_jh0c9p.png",
            },
            {
              ...PLACEHOLDER_BASE,
              name: "Trần Thị Thu Uyên",
              role: "Thành viên",
            },
            {
              name: "Ngô Phương Thảo",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785842029/Ng%C3%B4_Ph%C6%B0%C6%A1ng_Th%E1%BA%A3o_cnmlwf.png",
            },
            {
              name: "Nguyễn Anh Tú",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1786544985/Nguy%E1%BB%85n_Anh_T%C3%BA_d8rm4i.png",
            },
            {
              name: "Nguyễn Ngọc Mai Thảo",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785841058/Nguy%E1%BB%85n_Ng%E1%BB%8Dc_Mai_Th%E1%BA%A3o_rjas3h.png",
            },
            {
              name: "Phan Thị Quỳnh Chi",
              role: "Thành viên",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1786549625/Phan_Th%E1%BB%8B_Qu%E1%BB%B3nh_Chi_ikcqha.png",
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
              name: "Võ Đình Khoa",
              role: "Trưởng ban",
              image:
                "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785842514/V%C3%B5_%C4%90%C3%ACnh_Khoa_ryxypi.png",
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
