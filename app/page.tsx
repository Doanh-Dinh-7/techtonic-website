import Hero from "@/components/hero";
import About from "@/components/about";
import Leadership from "@/components/leadership";
import Activities from "@/components/activities";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Leadership />
      <Activities />
      <Gallery />
      <div className="w-full flex justify-center py-12 bg-background">
        <Link href="/maps">
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <MapPin size={20} />
            Khám phá bản đồ tương tác
          </Button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
