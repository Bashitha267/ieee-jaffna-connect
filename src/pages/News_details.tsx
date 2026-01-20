"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation, Link } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import { useEffect } from "react";

const NewsDetails = () => {
    const location = useLocation();
    const news = location.state;

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!news) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center pt-24">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">News not found</h2>
                        <Link to="/news" className="text-primary hover:underline">Back to News</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container-wide">
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/news" className="hover:text-primary transition-colors">
                            News
                        </Link>
                        <span>/</span>
                        <span className="text-foreground font-medium">{news.newheader}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side - Cover Image */}
                        <div className="space-y-8">
                            <div className="rounded-2xl overflow-hidden shadow-2xl bg-muted aspect-[4/3] lg:aspect-auto h-full max-h-[600px]">
                                {news.coverImage?.url ? (
                                    <img
                                        src={news.coverImage.url}
                                        alt={news.newheader}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                        <span className="text-6xl font-bold text-primary/30">NEWS</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="space-y-8 lg:py-8">
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-display leading-tight">
                                    {news.newheader}
                                </h1>
                            </div>

                            <div className="flex flex-col gap-4 py-6 border-y border-border">
                                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium">Published Date</p>
                                        <p className="font-semibold text-lg">
                                            {news.newsDate
                                                ? new Date(news.newsDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'Date not available'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold font-display">About This News</h3>
                                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    {news.newsDescription ? (
                                        <p className="whitespace-pre-wrap">{news.newsDescription}</p>
                                    ) : (
                                        <p>No description available for this news.</p>
                                    )}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NewsDetails;
