import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalog" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-wide">
              Gaayatri's <span className="text-secondary">Couture</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:text-secondary relative",
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={cn(
                  "font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:text-secondary relative text-primary",
                  location.pathname === "/admin"
                    ? "text-secondary"
                    : "text-primary font-bold"
                )}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button variant="hero" size="default" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-20 bg-background/98 backdrop-blur-md border-b border-border transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "font-body text-lg font-medium py-2 border-b border-border/50 transition-colors duration-300 animate-fade-up",
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-foreground/80 hover:text-secondary"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-lg font-medium py-2 border-b border-border/50 transition-colors duration-300 animate-fade-up text-primary"
              >
                Admin Dashboard
              </Link>
            )}
            <Button variant="hero" className="mt-4 w-full" asChild>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
