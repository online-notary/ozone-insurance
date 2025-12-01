import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar } from "lucide-react";
const Contact = () => {
  const contactInfo = [{
    icon: Phone,
    title: "Call Us",
    details: ["1-833-MY-OZONE", "(833) 696-9663"],
    color: "bg-blue-500"
  }, {
    icon: Mail,
    title: "Email Us",
    details: ["info@ozoneinsurance.com", "support@ozoneinsurance.com"],
    color: "bg-green-500"
  }, {
    icon: MapPin,
    title: "Visit Us",
    details: ["California", "CA LIC# 0K48512"],
    color: "bg-purple-500"
  }, {
    icon: Clock,
    title: "Office Hours",
    details: ["Sun-Monday: 9:00 AM - 5:00 PM", "Available for appointments"],
    color: "bg-orange-500"
  }];
  return <section id="contact" className="pt-8 pb-24 bg-muted/30">
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

              {/* Embedded Levitate Scheduler */}
              <div className="relative w-full" style={{
                minHeight: '700px'
              }}>
                <iframe 
                  src="https://meeting.levitate.ai/#/landing/9105df-4i4n1e" 
                  className="w-full h-full rounded-lg" 
                  style={{
                    minHeight: '700px',
                    border: 'none'
                  }} 
                  title="Schedule a Meeting" 
                  loading="lazy" 
                />
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
              <Button size="lg" className="btn-hero text-lg px-8 py-4 h-auto">
                Schedule Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-outline text-lg px-8 py-4 h-auto">
                Call Now: 1-833-MY-OZONE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;