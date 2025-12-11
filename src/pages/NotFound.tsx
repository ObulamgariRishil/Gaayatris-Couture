import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="font-heading text-8xl font-bold text-foreground mb-4">404</h1>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="font-body text-foreground/70 mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to our beautiful collection.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/" className="group">
                <Home size={18} className="mr-2" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
