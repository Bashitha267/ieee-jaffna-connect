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
            tagline: post.tagline,
            uniname: post.uniname,
          }))
        );

        setSlides(images);
      } catch (error) {
        console.error("Failed to load slides:", error);
      }
    };

    fetchSlides();
  }, []);


  // Preload images
  useEffect(() => {
    if (slides.length > 0) {
      slides.forEach((slide: any) => {
        const img = new Image();
        img.src = slide.image;
      });
    }
  }, [slides]);

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
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-10">
        {/* University Name */}

        <motion.h1
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-8xl font-bold text-white mb-2"
        >
          {slides[currentSlide].title}
        </motion.h1>
        {slides[currentSlide].uniname && (
          <motion.span
            key={`uni-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-2xl md:text-5xl font-bold text-white mb-4"
          >
            {slides[currentSlide].uniname}
          </motion.span>
        )}

        {/* Tagline */}
        {slides[currentSlide].tagline && (
          <motion.p
            key={`tagline-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-white/90 font-light italic max-w-xs sm:max-w-xl"
          >
            {slides[currentSlide].tagline}
          </motion.p>
        )}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all md:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="md:w-8 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all md:p-3"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="md:w-8 md:h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${index === currentSlide
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
