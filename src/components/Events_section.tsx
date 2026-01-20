"use client";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { hygraph } from "@/lib/hygraph";
import { GET_EVENTS } from "@/lib/queries";


const Events_section = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { events } = await hygraph.request(GET_EVENTS) as { events: any[] };
                setEvents(events);
            } catch (error) {
                console.error("Failed to load events:", error);
            }
        };
        fetchEvents();
    }, []);

    const featuredEvents = events.slice(0, 3);
    const navigate = useNavigate();

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
        <section className="p-1 bg-white dark:bg-slate-950">
            <div className="container-wide">
                <div className="flex flex-col items-center mb- text-center">
                    <div className="text-center mb-8">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Events
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
                    {featuredEvents.map((event: any) => (
                        <motion.div
                            key={event.id}
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => navigate('/event-details', { state: event })}
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                                <img
                                    src={event.coverImage?.url}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            {/* Title */}
                            <h3 className="text-lg md:text-xl text-center font-bold text-slate-900 dark:text-white font-display group-hover:text-primary transition-colors">
                                {event.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-16">
                    <Link to="/events">
                        <Button className="group px-8 py-6 rounded-full text-lg font-semibold transition-all hover:px-10">
                            View More Events
                            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Events_section;
