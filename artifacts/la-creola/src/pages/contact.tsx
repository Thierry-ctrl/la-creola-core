import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you have a question about our menu, need help finding us, or want to discuss a special arrangement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 text-primary border-b border-border pb-4">Contact Information</h2>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-lg">Address & Landmark</h3>
                    <p className="text-muted-foreground">KG 28 Avenue, Kimihurura<br/>Kigali, Rwanda</p>
                    <p className="text-sm italic text-muted-foreground mt-2">Located above the new wetlands, near the Adventist Church.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-lg">Phone & WhatsApp</h3>
                    <p className="text-muted-foreground">+250 793 084 995</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-lg">Email</h3>
                    <p className="text-muted-foreground">reservations@lacreola.com</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 text-primary border-b border-border pb-4">Opening Hours</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Clock className="text-muted-foreground" size={20}/>
                  <span className="font-medium w-32">Monday - Sunday:</span>
                  <span className="text-muted-foreground">10:00 AM — 1:00 AM</span>
                </li>
                <li className="pl-9 text-sm italic text-secondary">Kitchen closes at 11:30 PM</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary border-b border-border pb-4">Follow Us</h2>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full min-h-[500px] bg-card rounded-3xl overflow-hidden shadow-xl border border-border p-2"
          >
            {/* Using a placeholder aesthetic div for the map since we can't embed an actual interactive google map without API keys easily, but this looks premium */}
            <div className="w-full h-full bg-muted rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
              <div className="text-center relative z-10 p-8">
                <MapPin className="mx-auto text-primary mb-4" size={48} />
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Find Us in Kimihurura</h3>
                <p className="text-muted-foreground mb-6 max-w-xs mx-auto">KG 28 Ave. Look for the rooftop terrace overlooking the wetlands.</p>
                <a 
                  href="https://maps.google.com/?q=La+Creola+Kigali" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow-lg hover:bg-primary/90 transition-all"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
