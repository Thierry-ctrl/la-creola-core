import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Building2, Users, Map, Star } from "lucide-react";

// Match the generated OpenAPI schema types
const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  eventType: z.enum(["private_dining", "corporate", "celebration", "catering", "other"]),
  guestCount: z.coerce.number().min(1, "Guest count required"),
  preferredDate: z.string().optional(),
  message: z.string().min(10, "Please provide some details"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function PrivateDining() {
  const { toast } = useToast();
  const { mutate: createInquiry, isPending } = useCreateInquiry();
  const baseUrl = import.meta.env.BASE_URL;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { eventType: "private_dining" }
  });

  const onSubmit = (data: InquiryFormValues) => {
    createInquiry({ data }, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent",
          description: "Our events manager will be in touch within 24 hours.",
        });
        reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Please try again or contact us via phone.",
        });
      }
    });
  };

  const spaces = [
    {
      title: "The Rooftop Terrace",
      capacity: "Up to 60 seated, 100 standing",
      desc: "Our breathtaking open-air terrace overlooking the wetlands and Kigali hills. Perfect for sunset receptions, milestone celebrations, and elegant cocktail hours.",
      img: "gallery-terrace.png"
    },
    {
      title: "The Main Dining Room",
      capacity: "Up to 40 seated",
      desc: "An elegant, climate-controlled space featuring our signature Mauritian-Rwandan fusion decor. Ideal for corporate dinners and intimate gatherings.",
      img: "gallery-dining.png"
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-24">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 text-center">
        <Building2 className="mx-auto text-primary mb-6" size={48} />
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Private Events & Catering</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Elevate your next gathering. Whether it's a corporate gala, an intimate birthday dinner, or full-service catering, the La Creola team delivers flawless execution and exquisite cuisine.
        </p>
      </div>

      {/* Spaces */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spaces.map((space, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={`${baseUrl}images/${space.img}`} alt={space.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Users size={16} className="text-primary"/> {space.capacity}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-serif font-bold mb-4">{space.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{space.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-foreground text-white rounded-3xl p-8 md:p-12 pattern-imigongo relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <Star className="mx-auto text-secondary mb-4" size={32} />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Request a Proposal</h2>
              <p className="text-white/70">Share the details of your upcoming event.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input 
                    {...register("name")}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input 
                    {...register("phone")}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type *</label>
                  <select 
                    {...register("eventType")}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none appearance-none"
                    style={{ backgroundColor: "#1e2329" }} /* fallback for options background */
                  >
                    <option value="private_dining">Private Dining</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="celebration">Celebration/Party</option>
                    <option value="catering">Off-site Catering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Guests *</label>
                  <input 
                    {...register("guestCount")}
                    type="number"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  />
                  {errors.guestCount && <p className="text-destructive text-xs mt-1">{errors.guestCount.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <input 
                    {...register("preferredDate")}
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none appearance-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Event Details *</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us about your vision for the event..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all outline-none resize-none"
                ></textarea>
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-50"
                >
                  {isPending ? "Sending Inquiry..." : "Submit Inquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
