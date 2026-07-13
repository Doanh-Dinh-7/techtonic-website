import Image from "next/image";
import Link from "next/link";

const links = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Các ban", href: "/departments" },
  // { name: "Dự án", href: "/portfolio" },
  { name: "Hoạt động", href: "/events" },
  { name: "Tuyển thành viên", href: "/recruitment" },
];

/**
 * Global footer shared across all site routes.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10 text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/element/logo_black.png"
                alt="TechTonic Club"
                width={32}
                height={32}
                className="h-8 w-8 object-contain dark:hidden"
              />
              <Image
                src="/element/logo_white.png"
                alt="TechTonic Club"
                width={32}
                height={32}
                className="hidden h-8 w-8 object-contain dark:block"
              />
              <span className="font-paris2024 text-sm font-semibold leading-none text-foreground">
                TECH <br />
                TONIC
              </span>
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.name}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-center lg:text-right">
            © {new Date().getFullYear()} TechTonic Club. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
