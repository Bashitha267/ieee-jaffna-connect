"use client";

import { motion } from "framer-motion";

const Vision = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" as any },
        },
    };

    return (
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dnfbik3if/image/upload/v1768918544/WhatsApp_Image_2026-01-20_at_19.39.59_-_Edited_otvxgj.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            <div className="container-wide relative z-10 py-16 md:py-24">
                <div className="grid lg:grid-cols-2">
                    {/* Left side empty for background visibility on desktop */}
                    <div className="hidden lg:block" />

                    {/* Right side content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col gap-8 md:gap-12 lg:pl-12"
                    >
                        {/* Vision Section */}
                        <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                            <div className="inline-block px-4 py-1.5 md:px-5 md:py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs md:text-sm font-bold uppercase tracking-[0.2em] font-display">
                                Our Vision
                            </div>

                            <p className="text-lg md:text-2xl text-slate-100 leading-relaxed max-w-2xl font-display font-medium tracking-tight">
                                Become a remarkable student branch dedicated to empowering technological leaders by encouraging and facilitating students to attain the highest achievements by developing their skills.
                            </p>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            variants={itemVariants}
                            className="w-16 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full opacity-60"
                        />

                        {/* Mission Section */}
                        <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                            <div className="inline-block px-4 py-1.5 md:px-5 md:py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-xs md:text-sm font-bold uppercase tracking-[0.2em] font-display">
                                Our Mission
                            </div>

                            <p className="text-base md:text-xl text-slate-200 leading-relaxed max-w-2xl font-display font-normal">
                                Foster technological innovation and excellence for the benefit of humanity and promote the theory as well as the practice of all aspects of Computer Science, Computer Engineering, Information Communication Technology, Electrical and Electronics Engineering.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Vision;
