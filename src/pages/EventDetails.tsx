"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation, Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { useEffect } from "react";

const EventDetails = () => {
    const location = useLocation();
    const event = location.state;

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Use a placeholder location since it's not in the fetched data yet, or allow passed state to have it
    const eventLocation = event?.location || "University of Jaffna";

    if (!event) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center pt-24">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
                        <Link to="/events" className="text-primary hover:underline">Back to Events</Link>
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
                        <Link to="/events" className="hover:text-primary transition-colors">
                            Events
                        </Link>
                        <span>/</span>
                        <span className="text-foreground font-medium">{event.title}</span>
                    </div>

                    <div className=" flex flex-col md:grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side - Cover Image */}
                        <div className="space-y-8">
                            <div className="rounded-2xl overflow-hidden shadow-2xl bg-muted aspect-[4/3] lg:aspect-auto h-full max-h-[600px]">
                                <img
                                    src={event.coverImage?.url || event.image} // Fallback for transition compatibility
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="space-y-8 lg:py-8">
                            <div className="space-y-4 mb-8">
                                {/* <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider">
                                    Event Details
                                </div> */}
                                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-display leading-tight">
                                    {event.title}
                                </h1>
                                <div className="flex items-center gap-2">
                                    {/* <Calendar size={20} className="text-salate-700" /> */}
                                    <p className="text-md text-slate-700 ">

                                        {new Date(event.date).toLocaleDateString('en-US', {

                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>


                            {/* Description */}
                            <div className="space-y-4">
                                {/* <h3 className="text-2xl font-bold font-display">About Event</h3> */}
                                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    {event.description ? (
                                        <p>{event.description}</p>
                                    ) : (
                                        <p>No description available for this event.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    {event.otherImages && event.otherImages.length > 0 && (
                        <div className="mt-20 space-y-8">
                            <div className="flex items-center gap-4">
                                <h2 className="text-3xl font-bold font-display">Photo Gallery</h2>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {event.otherImages.map((img: any, index: number) => (
                                    <div
                                        key={index}
                                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-pointer"
                                    >
                                        <img
                                            src={img.url}
                                            alt={`${event.title} gallery image ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EventDetails;
