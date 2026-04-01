import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, MapPin, Clock, Phone, ChefHat, CalendarHeart, Wine } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${baseUrl}images/hero-sunset.png`} 
            alt="La Creola Rooftop at Sunset" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeUp} className="text-secondary font-medium tracking-[0.3em] uppercase text-sm md:text-base">
              Kigali's Premier Dining Experience
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white text-balance leading-tight drop-shadow-lg">
              African Soul.<br/>
              <span className="italic text-primary">Asian Finesse.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
              Where Mauritian culinary heritage meets the vibrant spirit of Rwanda, served on a rooftop overlooking the hills.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/reserve">
                <span className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_20px_rgba(196,115,79,0.4)] text-center cursor-pointer block">
                  Reserve a Table
                </span>
              </Link>
              <Link href="/menu">
                <span className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-center cursor-pointer block">
                  Explore the Menu
                </span>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeUp} className="pt-12 flex items-center justify-center gap-2 text-white/80">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-medium tracking-wide">4.9 • #1 Restaurant in Kigali on TripAdvisor</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. ESSENTIALS STRIP */}
      <section className="bg-primary text-primary-foreground py-8 relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 py-4 md:py-0">
              <MapPin className="text-secondary opacity-80" size={28} />
              <div>
                <p className="font-semibold text-lg font-serif">Kimihurura, Kigali</p>
                <p className="text-sm opacity-80">KG 28 Ave, Above Wetlands</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 py-4 md:py-0">
              <Clock className="text-secondary opacity-80" size={28} />
              <div>
                <p className="font-semibold text-lg font-serif">Open Daily</p>
                <p className="text-sm opacity-80">10:00 AM — 1:00 AM</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 py-4 md:py-0">
              <Phone className="text-secondary opacity-80" size={28} />
              <div>
                <p className="font-semibold text-lg font-serif">+250 793 084 995</p>
                <a href="https://wa.me/250793084995" className="text-sm opacity-80 hover:text-white underline underline-offset-4 decoration-white/40">Message on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONCEPT SECTION */}
      <section className="py-24 bg-background pattern-imigongo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <ChefHat className="mx-auto text-primary mb-6" size={40} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">A Culinary Journey Across Continents</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Born from the island of Mauritius—a historic crossroads of spices and cultures—La Creola brings a unique Afro-Asian fusion to the heart of Rwanda. Every dish is a delicate balance of bold African earthiness and precise Asian technique.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "dish-fusion.png", title: "Refined Tapas", desc: "Shareable plates meant to spark conversation." },
              { img: "cocktail-exotic.png", title: "Artisanal Cocktails", desc: "Tropical ingredients with masterful mixology." },
              { img: "tapas-spread.png", title: "Global Flavors", desc: "A symphony of spices from the Indian Ocean." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } } }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-xl">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={`${baseUrl}images/${item.img}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MENU HIGHLIGHTS */}
      <section className="py-24 bg-card text-card-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Signatures & Classics</h2>
              <p className="text-muted-foreground text-lg">A glimpse into our chef's favorites. The perfect introduction to the La Creola experience.</p>
            </div>
            <Link href="/menu">
              <span className="inline-flex items-center gap-2 text-primary font-semibold hover:text-foreground transition-colors cursor-pointer group">
                View Full Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { name: "Karri Kabri", desc: "Slow-cooked Mauritian style goat masala curry, warm spices, jasmine rice", price: "18,000 RWF" },
              { name: "Crispy Prawn Tempura", desc: "Black tiger prawns, togarashi dust, yuzu mayo, micro cilantro", price: "15,500 RWF" },
              { name: "Chermoula Fish Fillet", desc: "Line-caught local tilapia, North African chermoula crust, roasted vegetables", price: "16,000 RWF" },
              { name: "Volcano Sushi Roll", desc: "Spicy tuna, avocado, topped with torched crab and unagi sauce", price: "14,000 RWF" },
              { name: "Mauritian Magic", desc: "Signature cocktail: Dark rum, fresh pineapple, vanilla, star anise smoke", price: "9,000 RWF" },
              { name: "Coconut & Lime Panna Cotta", desc: "Silky tropical dessert with passion fruit coulis and toasted coconut", price: "8,500 RWF" },
            ].map((dish, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex justify-between items-baseline border-b border-border pb-4 group"
              >
                <div className="pr-4">
                  <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors">{dish.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm md:text-base">{dish.desc}</p>
                </div>
                <div className="text-secondary font-semibold whitespace-nowrap">{dish.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WEEKLY EVENTS */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pattern-imigongo mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <CalendarHeart className="mx-auto text-secondary mb-6" size={40} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Rhythm of Kigali</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Every day brings a new reason to celebrate on the rooftop.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { day: "Thursday", title: "Thirsty Thursday", desc: "Expertly crafted cocktails, great specials, and deep house beats.", icon: Wine },
              { day: "Friday", title: "BBQ & Live Music", desc: "Freshly grilled meats prepared live under the stars.", icon: ChefHat },
              { day: "Sunday", title: "Sunday Brunch", desc: "A generous selection of dishes in a relaxed, sun-drenched atmosphere.", icon: Clock },
            ].map((event, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <event.icon className="text-primary mb-4" size={32} />
                <div className="text-secondary text-sm font-bold tracking-wider uppercase mb-2">{event.day}</div>
                <h3 className="text-2xl font-serif font-bold mb-3">{event.title}</h3>
                <p className="text-white/70 mb-8">{event.desc}</p>
                <Link href="/events">
                  <span className="text-white font-medium hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
                    Event Details <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY / ATMOSPHERE */}
      <section className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
            <img src={`${baseUrl}images/gallery-dining.png`} alt="Dining Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h3 className="text-white font-serif text-3xl">The Main Dining</h3>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
            <img src={`${baseUrl}images/gallery-terrace.png`} alt="Rooftop Terrace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h3 className="text-white font-serif text-3xl">The Pergola</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STORY SECTION */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={`${baseUrl}images/portrait-chef.png`} alt="Founder Vedish Purdassee" className="w-full object-cover aspect-[3/4]" />
                <div className="absolute inset-0 border-4 border-white/20 rounded-2xl m-4 pointer-events-none"></div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">A Story Written in Spices</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by Vedish Purdassee, La Creola is a love letter to the Indian Ocean, delivered to the heart of Africa. Growing up in Mauritius, Vedish learned that food is the ultimate connector of cultures.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Relocating to Kigali, he saw a vibrant, cosmopolitan city ready for a new flavor profile. La Creola was born to bridge these worlds—pairing the precise, delicate aesthetics of Asian cuisine with the warm, deeply rooted soul of African cooking.
              </p>
              <div className="pt-6">
                <Link href="/about">
                  <span className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer">
                    Read Our Full Story
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
