"use client";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { hygraph } from "@/lib/hygraph";
import { GET_NEWS } from "@/lib/queries";

const News_section = () => {
    const [news, setNews] = useState<any[]>([]);
    const navigate = useNavigate();

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

    const featuredNews = news.slice(0, 3);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
        <section className="p-4 bg-white dark:bg-slate-950">
            <div className="container-wide">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="text-center mb-8">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            News
                        </h2>
                        <div className="w-10 mx-auto border-b-4 border-blue-700 mt-1"></div>
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuredNews.map((item: any) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => navigate('/news-details', { state: item })}
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                                {item.coverImage?.url ? (
                                    <img
                                        src={item.coverImage.url}
                                        alt={item.newheader}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-primary/30">NEWS</span>
                                    </div>
                                )}
                            </div>
                            {/* Title */}
                            <h3 className="text-lg md:text-xl text-center font-bold text-slate-900 dark:text-white font-display group-hover:text-primary transition-colors">
                                {item.newheader}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-16">
                    <Link to="/news">
                        <Button className="group px-8 py-6 rounded-full text-lg font-semibold transition-all hover:px-10">
                            View More News
                            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default News_section;
