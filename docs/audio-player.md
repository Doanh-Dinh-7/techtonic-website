# Trình phát nhạc toàn website

Trình phát là nút tròn có biểu tượng nhạc cố định ở góc dưới bên phải các route dùng `SiteShell`, phía trên nút cuộn lên đầu trang. Bấm nút để mở hoặc thu gọn bảng điều khiển. Không có section nhạc trong nội dung trang. `SiteShell` tải widget bằng `next/dynamic` với `ssr: false`; audio được gắn ngay cùng widget, bật `autoPlay` và `defaultShuffle`. Khả năng tự phát phụ thuộc chính sách của trình duyệt.

## Cấu trúc và thư viện

Dự án đã có TypeScript, Tailwind CSS và cấu hình shadcn trong `components.json`. Các thư viện `lucide-react`, `framer-motion`, `@radix-ui/react-slot` và `class-variance-authority` đã được khai báo và cài đặt; không cần cài thêm hay tạo context provider.

- UI mặc định: `src/shared/ui`; tiện ích `cn`: `src/shared/utils`.
- CSS toàn cục: `src/app/globals.css`; cấu hình Tailwind: `tailwind.config.ts`.
- `src/shared/ui/audio-player.tsx` chứa trình phát; `src/shared/ui/audio-player.test.tsx` chứa kiểm thử. Import từ `@/shared/ui/audio-player` theo kiến trúc V2.0.
- Trình phát dùng trực tiếp Button tại `src/shared/ui/button.tsx` và tiện ích `cn` từ `@/shared/utils`.
- `src/widgets/layout/music-player.tsx` quản lý nút nổi và bảng điều khiển dùng chung cho mọi route trong `SiteShell`; không phụ thuộc `features/home`.

## Dữ liệu và cách dùng

Chỉnh `homePlaylist` trong `src/lib/content/home.ts` khi có danh sách nhạc chính thức. Mỗi phần tử gồm `src` (URL âm thanh trực tiếp hoặc đường dẫn file trong `public`), `title` và `cover` tùy chọn. Hiện dùng **SoundHelix Song 1** và ảnh bìa Unsplash. URL MP3 gốc trong prompt (`ui.webmakers.studio/audio/ncs.mp3`) không phân giải DNS khi kiểm tra, nên đã thay bằng [MP3 mẫu SoundHelix](https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3) trả HTTP 200.

```tsx
import AudioPlayer from "@/shared/ui/audio-player";
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

## Hành vi

- Bảng điều khiển rộng tối đa 280px, co lại trên màn hình hẹp và có thể cuộn khi chiều cao màn hình nhỏ.
- Mặc định chỉ hiện biểu tượng nhạc. Có thể thu gọn bằng nút biểu tượng, nút X, phím Escape hoặc bấm bên ngoài; bảng hỗ trợ thao tác bàn phím.
- Thu gọn bảng giữ nguyên bài nhạc, tiến độ và trạng thái phát. Dùng nút tạm dừng trong bảng để dừng nhạc; chuyển giữa các route dùng chung `SiteShell` giữ trình phát đang hoạt động.
- Phát/tạm dừng và tua nhạc hoạt động trên phần tử audio của trình duyệt; trạng thái và thời lượng theo sự kiện phát thực tế.
- Khi bật `autoPlay` mà audio chưa phát, player thử gọi `play()` một lần sau cú click/chạm đầu tiên trên trang chính (không gồm nội dung iframe). Không cần mở bảng điều khiển. Quyền phát âm thanh vẫn do trình duyệt quyết định.
- Cơ chế thử phát này ngừng khi nhạc đã phát hoặc người dùng chủ động phát/tạm dừng, để các click sau không tự bật nhạc lại. Listener được gỡ khi không còn cần, khi tắt `autoPlay` hoặc khi player unmount; nếu thử phát thất bại, người dùng có thể thử lại bằng nút phát.
- Bài trước, bài tiếp và phát ngẫu nhiên dùng playlist. Khi chỉ có một bài, các nút này bị vô hiệu hóa.
- Nút ngẫu nhiên phát ngay một bài khác với bài đang chọn, kể cả khi đang tạm dừng. `defaultShuffle` vẫn trộn thứ tự playlist lúc khởi tạo; nút ngẫu nhiên không còn là công tắc bật/tắt chế độ trộn.
- Nút lặp bật/tắt lặp bài đang nghe, dùng biểu tượng lặp có số 1. Khi bật, bài hiện tại phát lại liên tục; nếu chủ động đổi bài, chế độ lặp áp dụng cho bài mới. Khi tắt, hết bài sẽ chuyển bài tiếp theo và dừng ở cuối danh sách. Trạng thái Bật/Tắt hiển thị ngay dưới các nút.
- Bài trước/bài tiếp giữ trạng thái phát hoặc tạm dừng. Dùng cùng một phần tử audio khi đổi bài; autoplay ban đầu không tự bật lại sau thao tác tạm dừng.
- Trạng thái phát chỉ tồn tại trong component; không cần lưu trữ hay state manager riêng.

## Giao tiếp giữa các component

- `src/types/player-events.ts` là nơi khai báo `PLAYER_EVENTS`, `AudioTrack`, `PlayerState` và kiểu sự kiện trên `window`.
- Gửi sự kiện bằng `emitPlayerEvent` từ `@/shared/utils/player-events`. Sự kiện `PLAYER_EVENTS.STATE` bắt buộc có đủ `isPlaying`, `track`, `progress`, `currentTime`, `duration`; các lệnh phát/dừng và mở/đóng UI không có payload.
- Nhận sự kiện bằng `subscribePlayerEvent`, với kiểu callback được suy ra từ tên sự kiện. Hàm trả về cleanup để dùng trong `useEffect`; gọi tất cả cleanup khi effect kết thúc nếu đăng ký nhiều listener.
- Listener lệnh phát/dừng tồn tại theo vòng đời player, không đăng ký lại theo cập nhật tiến độ. Các component dùng hằng số thay vì tự ghi chuỗi tên sự kiện.
- Header gửi `PLAYER_EVENTS.REQUEST_STATE` sau khi đăng ký nhận sự kiện. Player và widget trả lại trạng thái phát và mở/đóng hiện tại để nút trên header hoạt động ngay cả khi header vừa xuất hiện lại lúc nhạc đang tạm dừng.

Danh sách nhạc chính thức sẽ được bổ sung vào `homePlaylist` khi người dùng cung cấp.
