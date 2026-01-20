import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import NewsPreview from "@/components/NewsPreview";
import { hygraph } from "@/lib/hygraph";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        {/* <StatsSection /> */}
        <AboutSection />
        <NewsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
