import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { X, Heart, ShoppingBag, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import EditProductModal from "@/components/admin/EditProductModal";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Sarees", "Blouses", "Lehengas", "Accessories"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('section', 'Shop')
      .order('created_at', { ascending: false });

    if (data) setProducts(data);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      toast({ title: "Deleted", description: "Product removed." });
      fetchProducts();
    }
  };

  const handleEditClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setEditingProduct(product);
  };

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
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* New Badge */}
                  {product.is_new && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-foreground font-body text-xs font-semibold px-3 py-1.5 rounded-full">
                        New
                      </span>
                    </div>
                  )}

                  {/* Admin Controls (Top Right) */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                      <button
                        onClick={(e) => handleEditClick(e, product)}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, product.id)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  )}

                  {/* Favorite Button (Only if not admin to avoid clutter, or keep it) */}
                  {!isAdmin && (
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
                  )}

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
                    {product.title}
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
                  src={selectedProduct.image_url}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {selectedProduct.is_new && (
                  <span className="inline-block w-fit bg-secondary text-foreground font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    New Arrival
                  </span>
                )}
                <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-2">
                  {selectedProduct.category}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  {selectedProduct.title}
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

      {/* Edit Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdate={fetchProducts}
      />
    </Layout>
  );
};

export default Products;
