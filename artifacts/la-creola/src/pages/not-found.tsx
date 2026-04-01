import { Link } from "wouter";
import { UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground pattern-imigongo relative">
      <div className="absolute inset-0 bg-background/90 z-0"></div>
      <div className="text-center relative z-10 p-8 glass-panel rounded-3xl max-w-lg w-full">
        <UtensilsCrossed className="mx-auto text-primary mb-6" size={48} />
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-serif font-bold mb-4">Table Not Found</h2>
        <p className="mt-2 text-muted-foreground mb-8">
          The page you are looking for has been moved or doesn't exist. Let's get you back to the menu.
        </p>
        <Link href="/">
          <span className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/30">
            Return Home
          </span>
        </Link>
      </div>
    </div>
  );
}
