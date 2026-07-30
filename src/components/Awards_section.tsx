"use client";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Trophy, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { hygraph } from "@/lib/hygraph";
import { GET_AWARDS } from "@/lib/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface AwardItem {
  id: string;
  title: string;
  date?: string;
  description?: string;
  recievedby?: string;
  mainimage?: {
    url: string;
  };
}

const Awards_section = () => {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = (await hygraph.request(GET_AWARDS)) as any;
        const fetchedData = response?.awardsbySB || response?.awardsBySB || response?.awards || [];
        if (Array.isArray(fetchedData)) {
          setAwards(fetchedData);
        }
      } catch (error) {
        console.error("Failed to load awards:", error);
      }
    };
    fetchAwards();
  }, []);

  if (!awards || awards.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-slate-50/50 dark:bg-slate-950/50 border-y border-slate-200/60 dark:border-slate-800">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Awards
            </h2>
            <div className="w-10 mx-auto border-b-4 border-blue-700 mt-1"></div>
          </div>
        </div>

        {/* Awards Swiper / Carousel */}
        <div className="relative px-2 sm:px-6 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {awards.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-6 w-full md:basis-1/2 lg:basis-5/12 xl:basis-5/12"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group h-full cursor-pointer bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
                    onClick={() => navigate("/awards", { state: item })}
                  >
                    <div>
                      {/* 1. Cover Image (Top) */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        {item.mainimage?.url ? (
                          <img
                            src={item.mainimage.url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-slate-900 to-indigo-900/30 flex items-center justify-center">
                            <Trophy className="w-16 h-16 text-blue-500/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Card Content Area */}
                      <div className="p-6">
                        {/* 2. Title */}
                        <h3 className="text-lg md:text-xl font-bold font-display text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-4">
                          {item.title}
                        </h3>

                        {/* 3. Received By */}
                        {item.recievedby && (
                          <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium bg-slate-100/90 dark:bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                            <User size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="truncate">Received by: {item.recievedby}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="px-6 pb-6 pt-0">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1.5">
                        View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6 w-10 h-10 border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-6 w-10 h-10 border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" />
          </Carousel>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Link to="/awards">
            <Button className="group px-8 py-6 rounded-full text-base md:text-lg font-semibold transition-all hover:px-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
              View All Awards
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-2 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Awards_section;
