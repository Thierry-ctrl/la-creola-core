import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function About() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground">The La Creola Story</h1>
            <h2 className="text-2xl font-serif italic text-primary">From Port Louis to Kigali</h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                The seed for La Creola was planted thousands of miles away on the island of Mauritius. Growing up in a culture where Indian, African, Chinese, and European culinary traditions blend seamlessly, our founder, Vedish Purdassee, learned early that food is the most profound way people connect.
              </p>
              <p>
                When Vedish relocated to Kigali, he was captivated by the city's energy, its rolling hills, and its deep sense of community. Yet, he noticed a space for a new kind of culinary dialogue—a place that married the precision of Asian technique with the hearty, soulful depth of African cooking.
              </p>
              <p>
                La Creola was born on a rooftop in Kimihurura to be that bridge. It is more than a restaurant; it is an exquisite culinary saga. We believe in dining as a shared experience—tapas that spark conversation, cocktails that tell stories, and an atmosphere that feels simultaneously cosmopolitan and intimately warm.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] relative">
              <img src={`${baseUrl}images/portrait-chef.png`} alt="Vedish Purdassee in the kitchen" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif text-2xl font-bold">Vedish Purdassee</p>
                <p className="text-primary font-medium tracking-wider uppercase text-sm">Founder & Visionary</p>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-card p-8 rounded-3xl shadow-xl max-w-sm hidden md:block border border-border">
              <Quote className="text-primary/30 w-12 h-12 mb-4 absolute top-4 left-4" />
              <p className="relative z-10 font-serif text-xl italic text-foreground leading-snug">
                "We don't just serve fusion cuisine; we serve the history of the spice route, reimagined for the modern African palate."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Philosophy */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground text-white rounded-3xl p-12 md:p-20 text-center pattern-imigongo relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h3 className="text-4xl font-serif font-bold text-secondary">Our Philosophy</h3>
            <p className="text-xl font-light text-white/90 leading-relaxed">
              We source locally. We cook globally. We believe in the power of the "Golden Hour"—that magical time when the day yields to night, the light softens, and the conversations deepen. Every detail at La Creola, from the terracotta tones to the ambient beats, is designed to capture that exact feeling.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
