import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gem, Ruler } from "lucide-react";

const services = [
  {
    icon: Gem,
    title: "Maggam Work",
    description: "Exquisite hand embroidery featuring intricate gold and silver thread work, beadwork, and stone embellishments that transform fabric into wearable art.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    link: "/services#maggam",
  },
  {
    icon: Ruler,
    title: "Custom Tailoring",
    description: "Precision-fitted garments crafted to your exact measurements, ensuring a perfect silhouette for blouses, lehengas, and traditional wear.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    link: "/services#tailoring",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4">
            What We Offer
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Our Signature Services
          </h2>
          <p className="font-body text-lg text-foreground/70 leading-relaxed">
            From intricate embroidery to perfectly tailored fits, we bring your vision to life with unparalleled craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-3xl overflow-hidden bg-card shadow-card hover:shadow-hover transition-all duration-500"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/10" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/30 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                    <service.icon size={28} className="text-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="font-body text-foreground/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 font-body font-medium text-foreground hover:text-secondary transition-colors duration-300 group/link"
                  >
                    Learn More
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Button variant="elegant" size="lg" asChild>
            <Link to="/services" className="group">
              View All Services
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
