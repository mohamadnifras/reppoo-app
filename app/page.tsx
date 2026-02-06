
import Navbar from "@/components/Navbar";
import HeroSection from "@/features/herosection/HeroSection"
import About from "@/features/aboutsection/About"

export default function Home() {
  return (
    <main>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <HeroSection />
      <About />
    </main>
  );
}
