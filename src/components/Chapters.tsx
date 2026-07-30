"use client";

import { motion } from "framer-motion";

const chapters = [
    { id: 1, name: "CIS", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1768919094/cis_b_bg_rmo94v.png", link: "https://society.jfn.ac.lk/cis/" },
    { id: 2, name: "WIE", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1768919316/IEEE_WIE_SBAG_Logo_d35vc6.png", link: "https://sites.google.com/univ.jfn.ac.lk/wie-uoj/home" },
    { id: 3, name: "CS", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1768919407/csblack_kayl0w.png", link: "https://www.linkedin.com/company/ieeecsuoj/" },
    { id: 4, name: "ComSoc", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1768919731/Untitled_design_cftouc.png", link: "https://web.facebook.com/ieeecomsocsbcuoj/" },
    { id: 5, name: "RAS", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1768919780/ras_b3cbgr.png", link: "https://www.linkedin.com/company/ieeerasuoj/" },
    {
        id: 6, name: "PES", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1768919839/pes_vp54yu.png",
        link: "https://www.eng.jfn.ac.lk/ieee-pes/"
    },
    {
        id: 7, name: "EDS", logo: "https://res.cloudinary.com/dnfbik3if/image/upload/v1785385453/EDS_1_2_2_rwytcd.png",
        link: "#"
    },
];

const Chapters = () => {
    return (
        <section className="py-16 bg-white dark:bg-slate-950">
            <div className="px-4 md:px-12">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Our Chapters and Affinity Groups
                    </h2>
                    <div className="w-32 mx-auto border-b-4 border-blue-700 mt-1"></div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    {chapters.map((chapter) => (
                        <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: chapter.id * 0.08 }}
                            className="flex items-center justify-center"
                        >
                            <a
                                href={chapter.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2 md:p-4 rounded-xl transition-all duration-300 hover:scale-110"
                            >
                                <img
                                    src={chapter.logo}
                                    alt={chapter.name}
                                    className={`opacity-100 transition-all duration-300 ${chapter.name === "CIS" ? "object-cover w-40 md:w-48 h-32 md:h-44" : "object-contain w-36 md:w-44 h-24 md:h-32"}`}
                                />
                                <div className="absolute inset-0 rounded-xl transition-all duration-300"></div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Chapters;
