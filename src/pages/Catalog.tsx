import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const categories = ["All", "Bridal", "Festive", "Casual", "Custom"];

const designs = [
  {
    id: 1,
    title: "Royal Kanjivaram Silk",
    category: "Bridal",
    description: "Traditional temple border with intricate gold zari work",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Pastel Organza",
    category: "Festive",
    description: "Lightweight organza with delicate pearl embroidery",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Designer Blouse",
    category: "Custom",
    description: "Contemporary cut with traditional Maggam work",
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Banarasi Heritage",
    category: "Bridal",
    description: "Pure silk with timeless brocade patterns",
    image: "https://images.unsplash.com/photo-1609357871098-53e798714d3c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Cotton Comfort",
    category: "Casual",
    description: "Handwoven cotton with subtle block prints",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Silk Ensemble",
    category: "Festive",
    description: "Rich silk blend with modern geometric patterns",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Bridal Lehenga",
    category: "Bridal",
    description: "Heavy embroidered lehenga with matching dupatta",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Printed Georgette",
    category: "Casual",
    description: "Flowy georgette with floral digital prints",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
  },
];

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState<typeof designs[0] | null>(null);

  const filteredDesigns = activeCategory === "All"
    ? designs
    : designs.filter((d) => d.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4 animate-fade-in">
              Our Collection
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-foreground mb-6 animate-fade-up">
              Design Catalog
            </h1>
            <p className="font-body text-lg text-foreground/70 leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              Explore our curated collection of handcrafted designs, each piece telling a story of tradition and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "font-body text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300",
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-primary"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Design Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design, index) => (
              <div
                key={design.id}
                className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedDesign(design)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={18} className="text-foreground" />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground font-body text-xs font-medium px-3 py-1.5 rounded-full">
                      {design.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-heading text-lg font-semibold text-background mb-1">
                      {design.title}
                    </h3>
                    <p className="font-body text-sm text-background/80">
                      {design.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <Button variant="premium" size="lg" asChild>
              <Link to="/products" className="group">
                View Our Products
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-background rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDesign(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors duration-300"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-2">
                  {selectedDesign.category}
                </span>
                <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
                  {selectedDesign.title}
                </h2>
                <p className="font-body text-foreground/70 leading-relaxed mb-6">
                  {selectedDesign.description}
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Inquire About This Design</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Catalog;
