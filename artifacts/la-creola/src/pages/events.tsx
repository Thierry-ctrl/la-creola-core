import { motion } from "framer-motion";
import { Link } from "wouter";
import { CalendarHeart, Clock, Music, Coffee, GlassWater } from "lucide-react";

export default function Events() {
  const baseUrl = import.meta.env.BASE_URL;

  const events = [
    {
      title: "Thirsty Thursday",
      day: "Every Thursday",
      time: "5:00 PM onwards",
      desc: "Enjoy a lively evening with refreshing cocktails, great drink specials, and a relaxed atmosphere perfect for catching up with friends or unwinding after work. With deep house beats and vibrant energy.",
      img: "event-bbq.png",
      icon: GlassWater
    },
    {
      title: "Friday BBQ & Live Music",
      day: "Every Friday",
      time: "6:30 PM onwards",
      desc: "La Creola comes alive with our special Barbecue & Live Music Night. Guests enjoy a delicious selection of freshly grilled meats and seafood specialties, prepared live while relaxing in our vibrant rooftop atmosphere.",
      img: "gallery-terrace.png",
      icon: Music
    },
    {
      title: "Sunday Brunch",
      day: "Every Sunday",
      time: "11:00 AM - 4:00 PM",
      desc: "Sunday is all about slowing down. Our Sunday Brunch brings together a generous selection of delicious dishes, fresh flavors, and a relaxed atmosphere. The perfect blend of great food, good company, and acoustic music.",
      img: "tapas-spread.png",
      icon: Coffee
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-20">
          <CalendarHeart className="mx-auto text-primary mb-6" size={48} />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Weekly Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The rhythm of Kigali lives here. Join us for our signature weekly events featuring live cooking, curated sounds, and vibrant energy.
          </p>
        </div>

        <div className="space-y-24">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                  <img src={`${baseUrl}images/${event.img}`} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3 text-secondary font-bold tracking-widest uppercase text-sm">
                  <event.icon size={20} />
                  <span>{event.day}</span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-foreground">{event.title}</h2>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Clock size={18} />
                  <span>{event.time}</span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.desc}
                </p>
                <div className="pt-4">
                  <Link href={`/reserve?occasion=${encodeURIComponent(event.title)}`}>
                    <span className="inline-flex px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg cursor-pointer">
                      Reserve for this Event
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
