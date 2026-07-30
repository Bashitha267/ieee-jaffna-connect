"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Trophy, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hygraph } from "@/lib/hygraph";
import { GET_AWARDS } from "@/lib/queries";
import { AwardItem } from "@/components/Awards_section";

const Awards = () => {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Set page title for SEO
    document.title = "Awards & Recognition | IEEE Student Branch of Jaffna";

    // Set meta tags for SEO keywords & description
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }

    const defaultKeywords = [
      "IEEE Sri Lanka Section Outstanding Student Branch Chapter Counsellor Award",
      "Dr. E. Y. A. Charles",
      "IEEE Sri Lanka Section Outstanding Student Branch Chapter Advisor Award",
      "Prof. A. Ramanan",
      "IEEE Sri Lanka Section Outstanding Student Branch WIE Affinity Group Advisor Award",
      "Dr. (Ms.) J. Samantha Tharani",
      "IEEE Sri Lanka Section Awards 2025",
      "IEEE Jaffna Awards",
      "IEEE Student Branch of Jaffna Awards",
      "IEEE Sri Lanka Awards"
    ].join(", ");

    metaKeywords.setAttribute('content', defaultKeywords);

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the achievements and awards won by the IEEE Student Branch of Jaffna, including prestigious IEEE Sri Lanka Section awards.'
      );
    }
  }, []);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        setLoading(true);
        const response = (await hygraph.request(GET_AWARDS)) as any;
        const fetchedData: AwardItem[] = response?.awardsbySB || response?.awardsBySB || response?.awards || [];
        if (Array.isArray(fetchedData)) {
          setAwards(fetchedData);

          // Update SEO keywords dynamically with fetched award titles
          const metaKeywords = document.querySelector('meta[name="keywords"]');
          if (metaKeywords) {
            const fetchedTitles = fetchedData.map((a) => a.title).filter(Boolean);
            const fetchedRecipients = fetchedData.map((a) => a.recievedby).filter(Boolean);
            const combinedKeywords = Array.from(new Set([
              "IEEE Sri Lanka Section Outstanding Student Branch Chapter Counsellor Award",
              "Dr. E. Y. A. Charles",
              "IEEE Sri Lanka Section Outstanding Student Branch Chapter Advisor Award",
              "Prof. A. Ramanan",
              "IEEE Sri Lanka Section Outstanding Student Branch WIE Affinity Group Advisor Award",
              "Dr. (Ms.) J. Samantha Tharani",
              ...fetchedTitles,
              ...fetchedRecipients,
              "IEEE Jaffna Awards"
            ])).join(", ");
            metaKeywords.setAttribute('content', combinedKeywords);
          }
        }
      } catch (error) {
        console.error("Failed to load awards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="pt-24 pb-20 flex-grow">
        <div className="container-wide px-4">
          {/* Header Banner */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white font-display mt-4 mb-2">
              Awards
            </h1>
            <div className="w-16 mx-auto border-b-4 border-blue-600"></div>
          </div>

          {/* Awards Grid: 2 columns on desktop (md:grid-cols-2), 1 column on mobile (grid-cols-1) */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 h-96 animate-pulse border border-slate-200 dark:border-slate-800"
                />
              ))}
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <Trophy className="w-16 h-16 text-slate-400 mx-auto mb-4 opacity-50" />
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No awards available at the moment.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {awards.map((item) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  className="group bg-slate-50 dark:bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/40 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200 dark:bg-slate-950">
                      {item.mainimage?.url ? (
                        <img
                          src={item.mainimage.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-primary/20 to-purple-600/20 flex items-center justify-center">
                          <Award className="w-20 h-20 text-blue-500/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      {/* Date Badge */}
                      {item.date && (
                        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Calendar size={13} className="text-blue-400" />
                          <span>
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 space-y-4">
                      {/* Title */}
                      <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h2>

                      {/* Recieved By */}
                      {item.recievedby && (
                        <div className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-4 py-2 rounded-xl border border-blue-200/60 dark:border-blue-900/60">
                          <User size={18} className="text-blue-600 shrink-0" />
                          <span>Received by: {item.recievedby}</span>
                        </div>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line pt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
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

export default Awards;
