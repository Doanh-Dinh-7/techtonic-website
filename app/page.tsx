import Hero from "@/components/hero";
import About from "@/components/about";
import Leadership from "@/components/leadership";
import Activities from "@/components/activities";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Leadership />
      <Activities />
      <Gallery />
      <Footer />
    </main>
  );
}
