
import Navbar from "@/components/Navbar";
import HeroSection from "@/features/herosection/HeroSection"
export default function Home() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <HeroSection />
    </div>
  );
}
