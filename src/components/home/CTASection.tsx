import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-hero-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Ready to Create Your{" "}
            <span className="text-gradient italic">Dream Outfit?</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you're looking for a bridal masterpiece, festive attire, or everyday elegance, 
            we're here to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="elegant" size="xl" asChild>
              <a href="tel:+919876543210" className="group">
                <Phone size={18} className="mr-2" />
                Call Us Now
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="font-body text-sm text-foreground/60 mb-4">
              Trusted by families across India
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {["★★★★★ 4.9/5 Rating", "1000+ Happy Brides", "Free Consultation"].map((item) => (
                <span
                  key={item}
                  className="font-body text-sm font-medium text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
