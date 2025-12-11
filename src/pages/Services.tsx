import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Gem, Ruler, Sparkles, Clock, CheckCircle } from "lucide-react";

const maggamGallery = [
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
];

const tailoringGallery = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1609357871098-53e798714d3c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
];

const processSteps = [
  {
    icon: Sparkles,
    title: "Consultation",
    description: "Discuss your vision, preferences, and requirements with our design experts.",
  },
  {
    icon: Ruler,
    title: "Design & Measurement",
    description: "Precise measurements and custom design creation tailored to you.",
  },
  {
    icon: Gem,
    title: "Craftsmanship",
    description: "Expert artisans bring your design to life with meticulous attention to detail.",
  },
  {
    icon: CheckCircle,
    title: "Final Fitting",
    description: "Perfect fit guarantee with adjustments until you're completely satisfied.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4 animate-fade-in">
              What We Offer
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-foreground mb-6 animate-fade-up">
              Our Services
            </h1>
            <p className="font-body text-lg text-foreground/70 leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              From intricate Maggam embroidery to precision tailoring, we bring decades of expertise to every creation.
            </p>
          </div>
        </div>
      </section>

      {/* Maggam Work Section */}
      <section id="maggam" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 mb-6">
                <Gem size={18} className="text-foreground" />
                <span className="font-body text-sm font-medium text-foreground">
                  Signature Service
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Maggam Work Embroidery
              </h2>
              <p className="font-body text-lg text-foreground/70 leading-relaxed mb-6">
                Maggam work, also known as Aari work, is a traditional Indian embroidery technique 
                that creates stunning raised patterns using a specialized needle. Our skilled artisans 
                bring this ancient art form to life with contemporary designs.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Intricate gold and silver thread work",
                  "Beadwork and stone embellishments",
                  "Custom designs for bridal wear",
                  "Blouse, lehenga, and saree embroidery",
                  "Traditional and modern patterns",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="font-body text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="group">
                  Get a Quote
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {maggamGallery.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden shadow-card ${
                    index === 0 ? "row-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Maggam work example ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tailoring Section */}
      <section id="tailoring" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              {tailoringGallery.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden shadow-card ${
                    index === 3 ? "row-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Tailoring example ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 mb-6">
                <Ruler size={18} className="text-foreground" />
                <span className="font-body text-sm font-medium text-foreground">
                  Custom Fit
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Custom Tailoring
              </h2>
              <p className="font-body text-lg text-foreground/70 leading-relaxed mb-6">
                Our expert tailors specialize in creating perfectly fitted garments that complement 
                your unique body shape. From traditional blouses to contemporary designs, we ensure 
                every piece drapes beautifully.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Precision measurements for perfect fit",
                  "Blouse stitching for all saree types",
                  "Lehenga and choli customization",
                  "Alteration and repair services",
                  "Rush orders available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="font-body text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="group">
                  Book Appointment
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Our Process
            </h2>
            <p className="font-body text-lg text-foreground/70 leading-relaxed">
              From consultation to final delivery, we ensure a seamless experience at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative text-center group"
              >
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
                )}
                
                {/* Step Number */}
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-card shadow-card mx-auto mb-6 flex items-center justify-center group-hover:shadow-hover group-hover:bg-primary transition-all duration-300">
                  <step.icon size={32} className="text-foreground" />
                </div>
                
                <div className="font-body text-sm font-medium text-secondary mb-2">
                  Step {index + 1}
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnaround Time */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Clock size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold">Typical Turnaround</h3>
                <p className="font-body text-background/70">2-4 weeks for most orders</p>
              </div>
            </div>
            <div className="h-px w-full md:w-px md:h-12 bg-background/20" />
            <div className="text-center">
              <p className="font-heading text-3xl font-semibold text-primary">Rush Orders</p>
              <p className="font-body text-background/70">Available upon request</p>
            </div>
            <div className="h-px w-full md:w-px md:h-12 bg-background/20" />
            <Button variant="premium" size="lg" asChild>
              <Link to="/contact">Request Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
