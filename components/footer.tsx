import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">TechTonic</h3>
            <p className="mb-4 text-gray-300">
              Câu lạc bộ công nghệ thông tin hàng đầu, nơi nuôi dưỡng đam mê và
              phát triển kỹ năng chuyên môn.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/TechTonic.Club17"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="#leadership"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ban chủ nhiệm
                </Link>
              </li>
              <li>
                <Link
                  href="#activities"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Lĩnh vực hoạt động
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Thư viện hình ảnh
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-300">
                  Trường Đại học Kinh tế - Đại học Đà Nẵng
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-300">techtonic.clb@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-300">(+84) 775-149-921</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} TechTonic. Tất cả các quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
