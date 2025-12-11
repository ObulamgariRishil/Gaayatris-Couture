import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedDesigns from "@/components/home/FeaturedDesigns";
import AboutSection from "@/components/home/AboutSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedDesigns />
      <AboutSection />
      <ServicesPreview />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
