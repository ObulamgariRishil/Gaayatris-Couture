import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    section: string;
    image_url: string;
}

interface EditProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

const EditProductModal = ({ product, isOpen, onClose, onUpdate }: EditProductModalProps) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || "",
        category: product?.category || "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Update form data when product changes
    if (product && formData.title === "" && product.title !== "") {
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSave = async () => {
        if (!product) return;
        setLoading(true);

        try {
            let imageUrl = product.image_url;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { error } = await supabase
                .from("products")
                .update({
                    title: formData.title,
                    description: formData.description,
                    price: formData.price,
                    category: formData.category,
                    image_url: imageUrl,
                })
                .eq("id", product.id);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Product updated successfully.",
            });
            onUpdate();
            onClose();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="category" className="text-sm font-medium">Category</label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="price" className="text-sm font-medium">Price</label>
                        <Input
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="image" className="text-sm font-medium">New Image (Optional)</label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
