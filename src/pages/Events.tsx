"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { hygraph } from "@/lib/hygraph";
import { GET_EVENTS } from "@/lib/queries";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

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
  useEffect(() => {
    window.scrollTo(0, 0);
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
          <div className="flex flex-col items-center mb-16 text-center">

            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white font-display mt-4 mb-2">
              Our Events
            </h1>
            <div className="w-16 mx-auto border-b-4 border-blue-600"></div>

          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event: any) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:border-primary/30 cursor-pointer"
                onClick={() => navigate('/event-details', { state: event })}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.coverImage?.url}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl font-bold  transition-colors">
                      {event.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <Calendar size={20} className="text-primary" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>


                    <button className="mt-4 px-6 py-2.5 rounded-lg border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                      More Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;