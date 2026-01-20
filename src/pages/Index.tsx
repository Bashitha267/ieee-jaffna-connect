import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import Vision from "@/components/Vision";
import Chapters from "@/components/Chapters";
import Events_section from "@/components/Events_section";
import News_section from "@/components/News_section";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import { hygraph } from "@/lib/hygraph";
import { useEffect } from "react";
const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <Vision />
        <Chapters />
        <Events_section />
        <News_section />

        {/* <StatsSection /> */}

        {/* <AboutSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
