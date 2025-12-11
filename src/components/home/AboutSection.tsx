import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors, Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: Scissors,
    title: "Expert Craftsmanship",
    description: "Each piece is meticulously handcrafted by skilled artisans with decades of experience.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "We pour our passion into every stitch, ensuring each creation tells a unique story.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest fabrics and materials are used to create garments that last generations.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description: "Work directly with our designers to bring your dream outfit to life.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Celebrating the Art of{" "}
              <span className="text-gradient italic">Indian Textiles</span>
            </h2>
            <p className="font-body text-lg text-foreground/70 leading-relaxed mb-6">
              For over 15 years, Gaayatri's Couture has been at the forefront of traditional Indian fashion, 
              blending time-honored techniques with contemporary aesthetics. Our journey began with a simple 
              vision: to preserve and elevate the rich heritage of Indian craftsmanship.
            </p>
            <p className="font-body text-lg text-foreground/70 leading-relaxed mb-8">
              From exquisite Kanjivaram silks to intricate Maggam embroidery, every piece that leaves our 
              atelier is a testament to our commitment to quality, authenticity, and artistic excellence.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Connect With Us</Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/30 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors duration-300">
                  <feature.icon size={24} className="text-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
