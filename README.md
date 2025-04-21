# TechTonic Website

TechTonic Website là một trang web hiện đại và đáp ứng được xây dựng cho câu lạc bộ công nghệ TechTonic. Dự án này sử dụng Next.js, React và Tailwind CSS để tạo ra một trải nghiệm người dùng mượt mà và hấp dẫn.

## Tính năng

- Trang chủ với Hero section ấn tượng
- Giới thiệu về tầm nhìn, sứ mệnh và giá trị cốt lõi của câu lạc bộ
- Thông tin về ban chủ nhiệm
- Các lĩnh vực hoạt động của câu lạc bộ
- Thư viện hình ảnh
- Thiết kế đáp ứng cho tất cả các thiết bị
- Hiệu ứng chuyển động mượt mà
- Tích hợp với shadcn/ui components

## Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn

## Cài đặt

1. Clone repository:
```bash
git clone <Link>
```
2. Move root project:
```bash
cd techtonic-website
```
3. Install project:
```bash
npm install --force
```
4. Run project:
```bash
npm run dev
```

## Cấu trúc thư mục

```
techtonic-website/
├── app/                    # Thư mục chứa các route và pages của ứng dụng
│   ├── (routes)/           # Các route chính của ứng dụng
│   │   ├── about/          # Trang giới thiệu
│   │   ├── activities/     # Trang hoạt động
│   │   ├── gallery/        # Trang thư viện ảnh
│   │   └── page.tsx        # Trang chủ
│   └── layout.tsx          # Layout chính của ứng dụng
├── components/             # Các component tái sử dụng
│   ├── ui/                 # Các component UI cơ bản
│   └── sections/           # Các section của trang
├── public/                 # Thư mục chứa các file tĩnh
│   └── images/             # Thư mục chứa hình ảnh
├── styles/                 # Thư mục chứa các file CSS
├── types/                  # Các file định nghĩa TypeScript
├── utils/                  # Các hàm tiện ích
├── .gitignore              # File cấu hình Git
├── next.config.js          # Cấu hình Next.js
├── package.json            # File quản lý dependencies
├── tailwind.config.js      # Cấu hình Tailwind CSS
└── tsconfig.json           # Cấu hình TypeScript
```
