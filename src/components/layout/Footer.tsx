import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Gaayatri's <span className="text-primary">Couture</span>
            </h3>
            <p className="font-body text-background/70 text-sm leading-relaxed mb-6">
              Crafting timeless elegance through traditional Indian artistry and modern sophistication.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:gaayatriobulamgari@gmail.com"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Catalog", path: "/catalog" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Maggam Work", path: "/services" },
                { name: "Custom Tailoring", path: "/services" },
                { name: "Bridal Wear", path: "/products" },
                { name: "Saree Collection", path: "/products" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-primary mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-body text-sm text-background/70">
                    +91 9030002593
                  </span>
                  <span className="font-body text-sm text-background/70">
                    +91 7688802999
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-background/70">
                  gaayatriobulamgari@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-background/70">
                  Neredmet X Roads, Secunderabad, Telangana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-background/50">
              © {new Date().getFullYear()} Gaayatri's Couture. All rights reserved.
            </p>
            <p className="font-body text-sm text-background/50">
              Crafted with ♥ for the love of tradition
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
