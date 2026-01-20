"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { hygraph } from "@/lib/hygraph";
import { GET_SLIDESHOW } from "@/lib/queries";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const fetchSlides = async () => {
    try {
      const { ieeeSideshows } = await hygraph.request(GET_SLIDESHOW) as { ieeeSideshows: any[] };

      const images = ieeeSideshows.flatMap((post) =>
        post.sideshowImages.map((img: any) => ({
          image: img.url,
          title: post.title,
        }))
      );

      setSlides(images);
    } catch (error) {
      console.error("Failed to load slides:", error);
    }
  };

  fetchSlides();
}, []);


  // 🔹 Auto slide
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 1, scale: 1.0 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              opacity: 1,
            }}
          />
          <div
            className="absolute inset-0"
          
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center mt-10 justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          {slides[currentSlide].title}
        </motion.h1>
      </div>

      {/* Navigation */}
      <button onClick={prevSlide} className="nav-btn left-4">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="nav-btn right-4">
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/40 w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
