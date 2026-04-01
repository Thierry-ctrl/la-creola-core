import { motion } from "framer-motion";
import { Link } from "wouter";
import { UtensilsCrossed, Leaf, WheatOff } from "lucide-react";

const menuCategories = [
  {
    title: "Start Your Journey",
    description: "Tapas & small plates perfect for sharing",
    items: [
      { name: "Crispy Prawn Tempura", desc: "Black tiger prawns, togarashi dust, yuzu mayo, micro cilantro", price: "15,500 RWF" },
      { name: "Tuna Tartare", desc: "Yellowfin tuna, avocado mousse, sesame soy dressing, taro chips", price: "14,000 RWF" },
      { name: "Vegetable Spring Rolls", desc: "Assorted seasonal vegetables, sweet chili dipping sauce", price: "9,000 RWF", icons: ["v"] },
      { name: "Chicken Satay", desc: "Crispy rolls filled with minced chicken and vegetables, peanut sauce", price: "11,000 RWF" },
    ]
  },
  {
    title: "From the Ocean",
    description: "Fresh catches infused with coastal spices",
    items: [
      { name: "Chermoula Fish Fillet", desc: "Line-caught local tilapia, North African chermoula crust, roasted vegetables", price: "16,000 RWF", icons: ["gf"] },
      { name: "Volcano Sushi Roll", desc: "Spicy tuna, avocado, topped with torched crab and unagi sauce", price: "14,000 RWF" },
      { name: "Mauritian Seafood Curry", desc: "Prawns, calamari, local fish in a rich coconut and tamarind broth", price: "22,000 RWF", icons: ["gf"] },
      { name: "Dragon Roll", desc: "Prawn tempura, cucumber, topped with spicy mayo and tobiko", price: "13,500 RWF" },
    ]
  },
  {
    title: "From the Land",
    description: "Hearty, rich, and slow-cooked to perfection",
    items: [
      { name: "Karri Kabri", desc: "Slow-cooked Mauritian style goat masala curry, warm spices, jasmine rice", price: "18,000 RWF", icons: ["gf"] },
      { name: "Beef Fillet Mignon", desc: "250g premium cut, truffled mashed potatoes, green peppercorn jus", price: "24,000 RWF" },
      { name: "Peking Duck", desc: "Wok-seared duck breast, steamed pancakes, hoisin, cucumber", price: "21,000 RWF" },
      { name: "Mushroom Risotto", desc: "Wild forest mushrooms, arborio rice, parmesan crisp, truffle oil", price: "15,000 RWF", icons: ["v", "gf"] },
    ]
  },
  {
    title: "Sweet Endings",
    description: "A refined conclusion",
    items: [
      { name: "Coconut & Lime Panna Cotta", desc: "Silky tropical dessert with passion fruit coulis and toasted coconut", price: "8,500 RWF", icons: ["v", "gf"] },
      { name: "Chocolate Lava Cake", desc: "Warm dark chocolate center, Madagascar vanilla bean ice cream", price: "10,000 RWF", icons: ["v"] },
      { name: "Mango Sorbet", desc: "House-churned fresh mango sorbet with mint syrup", price: "7,000 RWF", icons: ["v", "gf"] },
    ]
  }
];

export default function Menu() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-32">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-20">
        <UtensilsCrossed className="mx-auto text-primary mb-6" size={40} />
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Our Menu</h1>
        <p className="text-lg text-muted-foreground">
          An exploration of Afro-Asian flavors, designed as a sharing experience. 
          All prices are in Rwandan Francs (RWF).
        </p>
        <div className="flex justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Leaf size={14} className="text-green-600"/> Vegetarian</span>
          <span className="flex items-center gap-1"><WheatOff size={14} className="text-amber-600"/> Gluten-Free</span>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {menuCategories.map((category, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">{category.title}</h2>
              <p className="text-muted-foreground italic font-serif text-lg">{category.description}</p>
            </div>
            
            <div className="space-y-8">
              {category.items.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-border border-dashed pb-6">
                  <div className="pr-6 max-w-[75%]">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-serif font-bold text-foreground">{item.name}</h3>
                      {item.icons && (
                        <div className="flex gap-1">
                          {item.icons.includes("v") && <Leaf size={14} className="text-green-600" />}
                          {item.icons.includes("gf") && <WheatOff size={14} className="text-amber-600" />}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-2 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="text-secondary font-semibold whitespace-nowrap text-lg">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sticky Reservation Footer Bar */}
      <div className="fixed bottom-0 left-0 w-full glass-panel border-t border-white/20 p-4 z-40 transform translate-y-0 transition-transform duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg md:text-xl font-medium">Ready to experience these flavors?</p>
          <Link href="/reserve">
            <span className="w-full sm:w-auto px-10 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg text-center cursor-pointer block">
              Reserve Your Table
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
