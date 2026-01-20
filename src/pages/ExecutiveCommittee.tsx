import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Linkedin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hygraph } from "@/lib/hygraph";
import { GET_STAFF } from "@/lib/queries";

const ExecutiveCommittee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { directorBoards } = await hygraph.request(GET_STAFF) as { directorBoards: any[] };
        setStaff(directorBoards);
      } catch (error) {
        console.error("Failed to load staff:", error);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="mt-10">
          <div className="container-wide text-center">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-2xl md:text-4xl 
               font-bold mb-3"
            >
              Executive Committee
            </motion.h1>

          </div>
          <div className="w-64 mx-auto border-b-4 border-blue-600"></div>
        </section>

        {/* Team Grid */}
        <section ref={ref} className="section-padding">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Avatar */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/30 relative overflow-hidden">
                      {member.profilePicture?.url ? (
                        <img
                          src={member.profilePicture.url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-4xl font-display font-bold text-primary-foreground">
                              {member.name?.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl" />
                      <div className="absolute bottom-4 left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
                    </div>

                    {/* Info */}
                    <div className="p-6 text-center">
                      <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-medium mb-1">{member.post}</p>
                      <p className="text-muted-foreground text-sm mb-4">{member.department}</p>

                      {/* Social Links */}
                      <div className="flex justify-center gap-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                          >
                            <Mail size={18} />
                          </a>
                        )}
                        {member.linkdn && (
                          <a
                            href={member.linkdn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-lg bg-muted hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExecutiveCommittee;
