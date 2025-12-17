import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="pt-8 pb-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Levitate Meeting Scheduler - Full Width */}
        <div className="w-full">
          <Card className="p-4 shadow-medium overflow-hidden">
            <div className="space-y-4">
              <div className="px-4 pt-4">
                <h3 className="text-2xl font-bold text-foreground mb-2">Schedule a Meeting</h3>
                <p className="text-muted-foreground">
                  Book a consultation with our team at your convenience.
                </p>
              </div>

              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                  Click the button below to open our meeting scheduler and book a time that works for you.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => window.open('https://meeting.levitate.ai/#/landing/9105df-4i4n1e', '_blank', 'noopener,noreferrer')}
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Meeting Scheduler
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Start Your Financial Protection Journey Today
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Don't wait to protect your family's future. Our expert team is ready to help you 
              create a comprehensive financial plan tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-4 h-auto"
                onClick={() => window.open('https://meeting.levitate.ai/#/landing/9105df-4i4n1e', '_blank', 'noopener,noreferrer')}
              >
                Schedule Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-outline text-lg px-8 py-4 h-auto" asChild>
                <a href="tel:+18336969663">Call Now: 1-833-MY-OZONE</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
