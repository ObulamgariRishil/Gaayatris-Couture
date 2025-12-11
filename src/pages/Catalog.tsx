import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ArrowRight, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import EditProductModal from "@/components/admin/EditProductModal";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Bridal", "Festive", "Casual", "Custom"];

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  const [designs, setDesigns] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null); // For modal
  const { toast } = useToast();

  useEffect(() => {
    fetchDesigns();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
  };

  const fetchDesigns = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('section', 'Catalog')
      .order('created_at', { ascending: false });

    if (data) setDesigns(data);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Delete this design?")) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      toast({ title: "Deleted", description: "Design removed." });
      fetchDesigns();
    }
  };

  const handleEditClick = (e: React.MouseEvent, design: any) => {
    e.stopPropagation();
    setEditingProduct(design);
  };

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
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={design.image_url}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ZoomIn size={18} className="text-foreground" />
                  </div>

                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-100 z-20">
                      <button
                        onClick={(e) => handleEditClick(e, design)}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, design.id)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  )}

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
                    <p className="font-body text-sm text-background/80 line-clamp-2">
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
                  src={selectedDesign.image_url}
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
                {selectedDesign.price && selectedDesign.price !== "On Request" && (
                  <p className="font-heading text-xl text-primary font-semibold mb-6">
                    {selectedDesign.price}
                  </p>
                )}
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Inquire About This Design</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Admin Only) */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdate={fetchDesigns}
      />
    </Layout>
  );
};

export default Catalog;
