import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Calendar
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["(415) 900-9086", "(415) 900-9086"],
      color: "bg-blue-500"
    },
    {
      icon: Mail,
      title: "Email Us", 
      details: ["info@brightnessfinancial.net", "support@brightnessfinancial.net"],
      color: "bg-green-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Financial District", "New York, NY 10004"],
      color: "bg-purple-500"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 10:00 AM - 2:00 PM"],
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-4 py-2">
            <MessageCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-success">Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Secure Your
            <br />
            <span className="text-gradient">Financial Future?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Schedule a free consultation with our financial experts. We're here to answer your questions and help you build a comprehensive protection plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We're always ready to help you with your financial planning needs. 
                Reach out to us through any of the following methods.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Actions</h4>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Request Callback
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-medium">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input 
                        placeholder="Enter your first name"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input 
                        placeholder="Enter your last name"
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input 
                        type="email"
                        placeholder="Enter your email"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input 
                        type="tel"
                        placeholder="Enter your phone number"
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Interest
                    </label>
                    <select className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background text-foreground">
                      <option value="">Select a service</option>
                      <option value="life-insurance">Life Insurance</option>
                      <option value="health-planning">Health Planning</option>
                      <option value="retirement-planning">Retirement Planning</option>
                      <option value="comprehensive">Comprehensive Planning</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your financial planning needs..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-[#8e6f2f] hover:bg-[#7d6129] text-white shadow-medium group"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Privacy Note */}
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. 
                    We'll never share your information with third parties.
                  </p>
                </form>
              </div>
            </Card>
          </div>
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
                Call Now: (415) 900-9086
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;