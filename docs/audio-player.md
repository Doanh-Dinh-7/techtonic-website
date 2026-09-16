# Trình phát nhạc trang chủ

Trình phát là nút tròn có biểu tượng nhạc cố định ở góc dưới bên phải trang chủ, phía trên nút cuộn lên đầu trang. Bấm nút để mở hoặc thu gọn bảng điều khiển. Không có section nhạc trong nội dung trang. Widget dùng `next/dynamic` và hiển thị ngay, không phụ thuộc vị trí cuộn; audio chỉ được gắn vào trang sau lần mở đầu tiên. Nhạc không tự phát khi mở bảng.

## Cấu trúc và thư viện

Dự án đã có TypeScript, Tailwind CSS và cấu hình shadcn trong `components.json`. Các thư viện `lucide-react`, `framer-motion`, `@radix-ui/react-slot` và `class-variance-authority` đã được khai báo và cài đặt; không cần cài thêm hay tạo context provider.

- UI mặc định: `src/shared/ui`; tiện ích `cn`: `src/shared/utils`.
- CSS toàn cục: `src/app/globals.css`; cấu hình Tailwind: `tailwind.config.ts`.
- `src/components/ui/audio-player.tsx` và `demo.tsx` giữ đúng đường dẫn tích hợp được yêu cầu trong prompt. Đây là ngoại lệ để các đoạn mã import `@/components/ui/...` hoạt động, không thay đổi thư mục UI mặc định của dự án.
- `src/components/ui/button.tsx` tái xuất Button hiện có từ `src/shared/ui/button`, tránh tạo hai bản Button phải bảo trì riêng.
- `src/features/home/music.tsx` quản lý nút nổi và bảng điều khiển trên trang chủ.

## Dữ liệu và cách dùng

Chỉnh `homePlaylist` trong `src/lib/content/home.ts` khi có danh sách nhạc chính thức. Mỗi phần tử gồm `src` (URL âm thanh trực tiếp hoặc đường dẫn file trong `public`), `title` và `cover` tùy chọn. Hiện dùng **SoundHelix Song 1** và ảnh bìa Unsplash. URL MP3 gốc trong prompt (`ui.webmakers.studio/audio/ncs.mp3`) không phân giải DNS khi kiểm tra, nên đã thay bằng [MP3 mẫu SoundHelix](https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3) trả HTTP 200.

```tsx
import AudioPlayer from "@/components/ui/audio-player";
import { homePlaylist } from "@/lib/content/home";

<AudioPlayer playlist={homePlaylist} />;
```

API một bài vẫn được hỗ trợ:

```tsx
<AudioPlayer
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  title="SoundHelix Song 1"
  cover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80"
/>
```

`AudioPlayerDemo` được xuất từ `src/components/ui/demo.tsx` để xem cách dùng bài mẫu. Không cần thêm route demo.

## Hành vi

- Bảng điều khiển rộng tối đa 280px, co lại trên màn hình hẹp và có thể cuộn khi chiều cao màn hình nhỏ.
- Mặc định chỉ hiện biểu tượng nhạc. Có thể thu gọn bằng nút biểu tượng, nút X, phím Escape hoặc bấm bên ngoài; bảng hỗ trợ thao tác bàn phím.
- Thu gọn bảng giữ nguyên bài nhạc, tiến độ và trạng thái phát. Dùng nút tạm dừng trong bảng để dừng nhạc; rời trang chủ sẽ dừng trình phát.
- Phát/tạm dừng và tua nhạc hoạt động trên phần tử audio của trình duyệt; trạng thái và thời lượng theo sự kiện phát thực tế.
- Bài trước, bài tiếp và phát ngẫu nhiên dùng playlist. Khi chỉ có một bài, các nút này bị vô hiệu hóa.
- Lặp áp dụng cho cả playlist; với một bài, bài đó được lặp lại.
- Phát ngẫu nhiên đi qua từng bài trước khi dừng hoặc bắt đầu vòng lặp mới.
- Trạng thái phát chỉ tồn tại trong component; không cần lưu trữ hay state manager riêng.

Danh sách nhạc chính thức sẽ được bổ sung vào `homePlaylist` khi người dùng cung cấp.
