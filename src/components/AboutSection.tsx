import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import { aboutText } from "@/data/data";

const features = [
  { icon: Target, title: "Our Mission", description: "Foster technological innovation and excellence" },
  { icon: Users, title: "Community", description: "Connect students with industry professionals" },
  { icon: Lightbulb, title: "Innovation", description: "Promote creative solutions to global challenges" },
  { icon: Award, title: "Excellence", description: "Recognize and celebrate outstanding achievements" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Empowering Future
              <span className="gradient-text"> Engineers</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {aboutText.full}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all"
                >
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                  <span className="text-primary-foreground font-display text-2xl font-bold">IEEE</span>
                </div>
                <div className="h-64 rounded-2xl bg-muted overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <Users className="w-16 h-16 text-secondary" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 rounded-2xl bg-muted overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Lightbulb className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <div className="h-48 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Award className="w-12 h-12 text-secondary-foreground" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
