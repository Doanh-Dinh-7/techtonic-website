import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    // background gradient from #00A3FF #337AB7 to #1A2D46
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#337AB7] to-[#1A2D46] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/thumbnail.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          TechTonic Club
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
          Nơi nuôi dưỡng đam mê công nghệ và phát triển kỹ năng chuyên môn
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-blue-600 hover:bg-white/10">
            <Link href="#about">Tìm hiểu thêm</Link>
          </Button>
          <Button
            // variant="outline"
            className="bg-[#00A3FF] text-white hover:bg-white/10"
          >
            <Link
              href="https://www.facebook.com/TechTonic.Club17"
              target="_blank"
            >
              Đăng ký tham gia
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
