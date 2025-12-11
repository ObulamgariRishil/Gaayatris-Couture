import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { X, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const categories = ["All", "Sarees", "Blouses", "Lehengas", "Accessories"];

const products = [
  {
    id: 1,
    name: "Royal Kanjivaram Saree",
    category: "Sarees",
    description: "Authentic Kanjivaram silk saree with traditional temple border and rich gold zari work. Perfect for weddings and special occasions.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "Pastel Georgette Saree",
    category: "Sarees",
    description: "Lightweight georgette saree in soft pastel shades with delicate pearl and sequin embroidery along the border.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 3,
    name: "Maggam Work Blouse",
    category: "Blouses",
    description: "Exquisite hand-embroidered blouse featuring intricate gold thread work, beads, and stone embellishments.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 4,
    name: "Banarasi Silk Saree",
    category: "Sarees",
    description: "Pure handwoven Banarasi silk with timeless brocade patterns and rich pallu design.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-609357871098-53e798714d3c?q=80&w=800&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 5,
    name: "Bridal Lehenga Set",
    category: "Lehengas",
    description: "Stunning bridal lehenga with heavy hand embroidery, matching choli, and dupatta.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 6,
    name: "Designer Blouse",
    category: "Blouses",
    description: "Contemporary cut blouse with traditional embroidery patterns, perfect for modern styling.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 7,
    name: "Festive Lehenga",
    category: "Lehengas",
    description: "Elegant festive lehenga with intricate mirror work and colorful thread embroidery.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 8,
    name: "Silk Dupatta",
    category: "Accessories",
    description: "Pure silk dupatta with hand-painted traditional motifs and delicate border work.",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4 animate-fade-in">
              Shop Our Collection
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-foreground mb-6 animate-fade-up">
              Our Products
            </h1>
            <p className="font-body text-lg text-foreground/70 leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              Discover our exclusive collection of handcrafted sarees, blouses, and traditional wear designed for the modern woman.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* New Badge */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-foreground font-body text-xs font-semibold px-3 py-1.5 rounded-full">
                        New
                      </span>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors duration-300"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      size={18}
                      className={cn(
                        "transition-colors duration-300",
                        favorites.includes(product.id)
                          ? "fill-secondary text-secondary"
                          : "text-foreground"
                      )}
                    />
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Button variant="hero" className="w-full" size="default">
                      <ShoppingBag size={16} className="mr-2" />
                      Inquire Now
                    </Button>
                  </div>
                </div>

                <div className="p-5">
                  <p className="font-body text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-foreground/60 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-background rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors duration-300"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {selectedProduct.isNew && (
                  <span className="inline-block w-fit bg-secondary text-foreground font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    New Arrival
                  </span>
                )}
                <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-2">
                  {selectedProduct.category}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="font-body text-foreground/70 leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
                <p className="font-heading text-2xl font-semibold text-foreground mb-8">
                  {selectedProduct.price}
                </p>
                <div className="flex gap-4">
                  <Button variant="hero" size="lg" className="flex-1" asChild>
                    <Link to="/contact">Inquire Now</Link>
                  </Button>
                  <button
                    onClick={(e) => toggleFavorite(selectedProduct.id, e)}
                    className="w-14 h-14 rounded-xl border-2 border-border flex items-center justify-center hover:bg-primary transition-colors duration-300"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      size={22}
                      className={cn(
                        "transition-colors duration-300",
                        favorites.includes(selectedProduct.id)
                          ? "fill-secondary text-secondary"
                          : "text-foreground"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Products;
