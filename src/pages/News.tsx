"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hygraph } from "@/lib/hygraph";
import { GET_NEWS } from "@/lib/queries";

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { newsmodels } = await hygraph.request(GET_NEWS) as { newsmodels: any[] };
        setNews(newsmodels);
      } catch (error) {
        console.error("Failed to load news:", error);
      }
    };
    fetchNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container-wide">
          {/* Header - Same style as Events */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white font-display mt-4 mb-2">
              Latest News
            </h1>
            <div className="w-16 mx-auto border-b-4 border-blue-600"></div>
          </div>

          {/* News Grid */}
          {news.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No news available at the moment.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {news.map((item: any) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:border-primary/30 cursor-pointer"
                  onClick={() => navigate('/news-details', { state: item })}
                >
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden">
                    {item.coverImage?.url ? (
                      <img
                        src={item.coverImage.url}
                        alt={item.newheader}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">NEWS</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                      <Calendar size={16} />
                      <span>
                        {item.newsDate
                          ? new Date(item.newsDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })
                          : 'Date not available'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.newheader}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                      {item.newsDescription || 'No description available.'}
                    </p>

                    {/* View More Button */}
                    <button className="mt-2 text-primary font-semibold text-sm hover:underline">
                      View More →
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
