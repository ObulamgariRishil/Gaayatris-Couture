import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const designs = [
  {
    id: 1,
    title: "Royal Kanjivaram",
    description: "Traditional silk saree with intricate gold zari work",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Pastel Elegance",
    description: "Soft georgette saree with delicate Maggam embroidery",
    category: "Festive",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Contemporary Blouse",
    description: "Modern cut blouse with traditional embroidery patterns",
    category: "Custom",
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Banarasi Heritage",
    description: "Pure silk Banarasi with timeless brocade patterns",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1609357871098-53e798714d3c?q=80&w=800&auto=format&fit=crop",
  },
];

const FeaturedDesigns = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % designs.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + designs.length) % designs.length);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-2">
              Featured Collection
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
              Our Latest Creations
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              aria-label="Previous design"
            >
              <ChevronLeft size={20} className="text-foreground group-hover:text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              aria-label="Next design"
            >
              <ChevronRight size={20} className="text-foreground group-hover:text-foreground" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designs.map((design, index) => (
              <div
                key={design.id}
                className={cn(
                  "group relative rounded-2xl overflow-hidden bg-card shadow-card transition-all duration-500",
                  index === activeIndex ? "lg:col-span-2 lg:row-span-2" : ""
                )}
              >
                <div className={cn(
                  "relative overflow-hidden",
                  index === activeIndex ? "aspect-[4/5]" : "aspect-[3/4]"
                )}>
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-card/90 backdrop-blur-sm text-foreground font-body text-xs font-medium px-3 py-1.5 rounded-full">
                      {design.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-heading text-xl font-semibold text-background mb-2">
                      {design.title}
                    </h3>
                    <p className="font-body text-sm text-background/80 mb-4">
                      {design.description}
                    </p>
                    <Link
                      to="/catalog"
                      className="inline-flex items-center gap-2 text-background font-body text-sm font-medium hover:gap-3 transition-all duration-300"
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Button variant="premium" size="lg" asChild>
            <Link to="/catalog" className="group">
              Explore Full Collection
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;
