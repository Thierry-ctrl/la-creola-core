import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/private-dining", label: "Private Dining" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const { mutate: subscribe, isPending } = useSubscribeNewsletter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(newsletterSchema)
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  const onSubmitNewsletter = (data: { email: string }) => {
    subscribe({ data }, {
      onSuccess: () => {
        toast({
          title: "Welcome to La Creola",
          description: "You've successfully subscribed to our newsletter.",
        });
        reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Subscription Failed",
          description: "Please try again later.",
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className={`font-serif text-2xl font-bold tracking-widest uppercase transition-colors ${isScrolled ? "text-primary" : "text-white"}`}>
              La Creola
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <span className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : isScrolled ? "text-foreground" : "text-white/90"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/reserve">
              <span className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30">
                Reserve
              </span>
            </Link>
            <div className="flex gap-2 items-center text-sm font-medium">
              <button className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-primary transition-colors`}>EN</button>
              <span className={isScrolled ? 'text-border' : 'text-white/30'}>|</span>
              <button className={`${isScrolled ? 'text-muted-foreground' : 'text-white/60'} hover:text-primary transition-colors`}>FR</button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 
              <X className={isScrolled ? "text-foreground" : "text-white"} /> : 
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
            }
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 pb-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-center mt-10">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <span className={`font-serif text-3xl transition-colors ${
                    location === link.href ? "text-primary italic" : "text-foreground"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/reserve" className="mt-4">
                <span className="inline-block px-8 py-4 bg-primary text-primary-foreground text-lg font-serif italic rounded-full hover:bg-primary/90 transition-all">
                  Reserve a Table
                </span>
              </Link>
            </nav>
            <div className="mt-auto flex justify-center gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground pt-20 pb-10 pattern-imigongo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            <div className="lg:col-span-1">
              <h3 className="font-serif text-3xl font-bold mb-6 text-primary">La Creola</h3>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                African Soul. Asian Finesse. Kigali's Rooftop.<br/>
                An exquisite culinary saga awaiting your discovery.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-secondary">Find Us</h4>
              <ul className="space-y-4 text-white/70 font-light">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary shrink-0 mt-1" size={18} />
                  <span>Kimihurura, KG 28 Avenue<br/>Above the new wetlands,<br/>near Adventist Church</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-primary shrink-0" size={18} />
                  <span>+250 793 084 995</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-secondary">Hours</h4>
              <ul className="space-y-4 text-white/70 font-light">
                <li className="flex items-start gap-3">
                  <Clock className="text-primary shrink-0 mt-1" size={18} />
                  <div>
                    <p className="font-medium text-white mb-1">Open Daily</p>
                    <p>10:00 AM - 1:00 AM</p>
                    <p className="mt-2 text-sm italic text-primary">Kitchen closes at 11:30 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-secondary">The Insider</h4>
              <p className="text-white/70 mb-4 font-light text-sm">
                Subscribe to receive private invitations, seasonal menu reveals, and exclusive event access.
              </p>
              <form onSubmit={handleSubmit(onSubmitNewsletter)} className="space-y-3">
                <div>
                  <input 
                    {...register("email")}
                    type="email" 
                    placeholder="Your email address" 
                    className={`w-full bg-white/5 border ${errors.email ? 'border-destructive' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message as string}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all disabled:opacity-50"
                >
                  {isPending ? "Subscribing..." : "Join the List"}
                </button>
              </form>
            </div>

          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm font-light">
            <p>&copy; {new Date().getFullYear()} La Creola Restaurant. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy"><span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></Link>
              <Link href="/terms"><span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span></Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/250793084995?text=Hello%20La%20Creola,%20I%20would%20like%20to%20make%20an%20inquiry" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:-translate-y-1 hover:shadow-[#25D366]/40 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
