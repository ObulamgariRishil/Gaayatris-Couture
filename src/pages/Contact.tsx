import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-sm font-medium text-secondary uppercase tracking-widest mb-4 animate-fade-in">
              Get in Touch
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-foreground mb-6 animate-fade-up">
              Contact Us
            </h1>
            <p className="font-body text-lg text-foreground/70 leading-relaxed animate-fade-up" style={{ animationDelay: "100ms" }}>
              Have a question or ready to start your custom order? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card">
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="font-body text-foreground/60 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="font-body text-sm font-medium text-foreground block mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="h-12 bg-background border-border focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-body text-sm font-medium text-foreground block mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="h-12 bg-background border-border focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="font-body text-sm font-medium text-foreground block mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="h-12 bg-background border-border focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="font-body text-sm font-medium text-foreground block mb-2">
                      Service Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring focus:border-secondary"
                    >
                      <option value="">Select a service</option>
                      <option value="saree">Saree Purchase</option>
                      <option value="maggam">Maggam Work</option>
                      <option value="tailoring">Custom Tailoring</option>
                      <option value="bridal">Bridal Wear</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="font-body text-sm font-medium text-foreground block mb-2">
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, preferred designs, occasion, etc."
                    required
                    rows={5}
                    className="bg-background border-border focus:border-secondary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-8">
                Visit Our Studio
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Phone</h3>
                    <p className="font-body text-foreground/70">+91 8247859197</p>
                    <p className="font-body text-foreground/70">+91 9030002593</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Email</h3>
                    <p className="font-body text-foreground/70">satishobulamgari@gmail.com</p>
                    <p className="font-body text-foreground/70">gayatriobulamgari@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Address</h3>
                    <p className="font-body text-foreground/70">
                      Neredmet X Roads, Secunderabad<br />
                      Telangana 500094<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="font-body text-foreground/70">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p className="font-body text-foreground/70">Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={22} />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 rounded-2xl overflow-hidden h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-foreground/30 mx-auto mb-3" />
                  <p className="font-body text-foreground/50">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
