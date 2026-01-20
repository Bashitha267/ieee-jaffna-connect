import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ieee-navy text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/whitelogo.png" alt="IEEE Jaffna Logo" className="h-12 w-auto" />

            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Advancing Technology for Humanity. Join us in shaping the future of engineering and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/executive-committee" className="text-primary-foreground/80 hover:text-secondary transition-colors">Executive Committee</Link></li>
              <li><Link to="/news" className="text-primary-foreground/80 hover:text-secondary transition-colors">News & Events</Link></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">About IEEE</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-primary-foreground/80 text-sm">Department of Computer Science, University of Jaffna</span>
                  <span className="text-primary-foreground/80 text-sm">Jaffna, Sri Lanka</span>
                </div>

              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <a href="mailto:ieee@jfn.ac.lk" className="text-primary-foreground/80 text-sm hover:text-secondary transition-colors">ieeesb@univ.jfn.ac.lk</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">0421 221 8194</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="https://web.facebook.com/IEEESBUoJ" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors target:_blank">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/ieeesbuoj/" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors target:_blank">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/ieeesbuoj/" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors target:_blank">
                <Instagram size={20} />
              </a>
              {/* tiktok */}
              <a href="https://www.tiktok.com/ieesbuoj" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© 2026 IEEE Student Branch of Jaffna. All rights reserved.</p>
          <p>Designed By Nimesh Bashitha</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
