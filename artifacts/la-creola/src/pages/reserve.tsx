import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReservation } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, MessageSquare } from "lucide-react";
import { useLocation } from "wouter";

const reservationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.coerce.number().min(1).max(20),
  occasion: z.string().optional(),
  notes: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function Reserve() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { mutate: createReservation, isPending } = useCreateReservation();
  
  // Try to parse occasion from URL if coming from events page
  const searchParams = new URLSearchParams(window.location.search);
  const defaultOccasion = searchParams.get('occasion') || "";

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      occasion: defaultOccasion
    }
  });

  const onSubmit = (data: ReservationFormValues) => {
    createReservation({ data }, {
      onSuccess: () => {
        toast({
          title: "Reservation Request Received",
          description: "We will contact you shortly to confirm your booking.",
        });
        reset();
        setTimeout(() => setLocation("/"), 2000);
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error submitting your request. Please call us directly.",
        });
      }
    });
  };

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
        >
          <div className="bg-foreground text-white p-10 text-center pattern-imigongo relative">
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Reserve a Table</h1>
              <p className="text-white/80 max-w-lg mx-auto">
                Join us for an unforgettable dining experience overlooking Kigali.
                For parties larger than 20, please visit our Private Dining page.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Row 1: Basics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <input 
                    {...register("name")}
                    className={`w-full bg-background border ${errors.name ? 'border-destructive ring-destructive/20' : 'border-input focus:border-primary'} rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className={`w-full bg-background border ${errors.email ? 'border-destructive ring-destructive/20' : 'border-input focus:border-primary'} rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                  <input 
                    {...register("phone")}
                    className={`w-full bg-background border ${errors.phone ? 'border-destructive ring-destructive/20' : 'border-input focus:border-primary'} rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                    placeholder="+250 7XX XXX XXX"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users size={16} className="text-primary"/> Number of Guests *
                  </label>
                  <select 
                    {...register("guests")}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-border py-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-primary"/> Date *
                  </label>
                  <input 
                    {...register("date")}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full bg-background border ${errors.date ? 'border-destructive ring-destructive/20' : 'border-input focus:border-primary'} rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                  />
                  {errors.date && <p className="text-destructive text-xs mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-primary"/> Time *
                  </label>
                  <select 
                    {...register("time")}
                    className={`w-full bg-background border ${errors.time ? 'border-destructive ring-destructive/20' : 'border-input focus:border-primary'} rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                  >
                    <option value="">Select a time</option>
                    {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-destructive text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>

              {/* Row 3: Extras */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    Occasion (Optional)
                  </label>
                  <select 
                    {...register("occasion")}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  >
                    <option value="">Just dining</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business">Business Dinner</option>
                    <option value="Date">Date Night</option>
                    {defaultOccasion && !["Birthday", "Anniversary", "Business", "Date"].includes(defaultOccasion) && (
                      <option value={defaultOccasion}>{defaultOccasion}</option>
                    )}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MessageSquare size={16} className="text-primary"/> Special Requests or Dietary Requirements
                  </label>
                  <textarea 
                    {...register("notes")}
                    rows={4}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    placeholder="Let us know how we can make your visit special..."
                  ></textarea>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? "Submitting Request..." : "Request Reservation"}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  This is a reservation request. Your booking will be confirmed by our team via email or phone.
                </p>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
