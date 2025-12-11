import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
            });
            navigate("/admin");
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
        <Layout>
            <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-3xl shadow-card">
                    <div className="text-center">
                        <h2 className="font-heading text-3xl font-bold text-foreground">
                            Admin Login
                        </h2>
                        <p className="mt-2 text-sm text-foreground/60">
                            Sign in to manage your website content
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-foreground/80 mb-1"
                                >
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12"
                                    placeholder="admin@gaayatricouture.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-foreground/80 mb-1"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="default"
                            className="w-full h-12 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
