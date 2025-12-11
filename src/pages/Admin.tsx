
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        section: "Catalog", // Default to Catalog
        is_new: false,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error fetching items",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { error } = await supabase
                .from('products')
                .insert([
                    {
                        ...formData,
                        image_url: imageUrl,
                    },
                ]);

            if (error) throw error;

            toast({
                title: "Success!",
                description: "Item added successfully.",
            });

            // Reset form
            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                section: "Catalog",
                is_new: false,
            });
            setImageFile(null);
            fetchProducts(); // Refresh list
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, imageUrl?: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({
                title: "Deleted",
                description: "Item removed successfully.",
            });
            fetchProducts();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout} className="flex gap-2">
                        <LogOut size={16} />
                        Logout
                    </Button>
                </div>

                {/* Add New Item Form */}
                <div className="bg-card p-8 rounded-3xl shadow-card mb-12 border border-border">
                    <h2 className="text-2xl font-heading font-semibold mb-6">Add New Item</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title *</label>
                                <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Royal Silk Saree" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Section *</label>
                                <select
                                    name="section"
                                    value={formData.section}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                >
                                    <option value="Catalog">Catalog (Design Showcase)</option>
                                    <option value="Shop">Shop (Product to Sell)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <Input name="category" value={formData.category} onChange={handleInputChange} placeholder="e.g. Bridal, Festive" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Price (Optional)</label>
                                <Input name="price" value={formData.price} onChange={handleInputChange} placeholder="e.g. $500 or On Request" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Item details..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Image</label>
                            <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                        </div>

                        <Button type="submit" disabled={uploading} className="w-full md:w-auto">
                            {uploading ? (
                                <span className="flex items-center gap-2">Uploading...</span>
                            ) : (
                                <span className="flex items-center gap-2"><Plus size={18} /> Add Item</span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Product List */}
                <div>
                    <h2 className="text-2xl font-heading font-semibold mb-6">Your Items</h2>
                    {products.length === 0 ? (
                        <p className="text-foreground/60">No items found. Add your first one above!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((item) => (
                                <div key={item.id} className="bg-card p-4 rounded-2xl shadow-sm border border-border flex gap-4">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                        {item.image_url && (
                                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.section === 'Shop' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>
                                                    {item.section}
                                                </span>
                                                <h3 className="font-semibold text-foreground mt-1">{item.title}</h3>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(item.id, item.image_url)}
                                                className="text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-foreground/60 mt-1 line-clamp-1">{item.description}</p>
                                        <p className="text-sm font-medium mt-2">{item.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Admin;
