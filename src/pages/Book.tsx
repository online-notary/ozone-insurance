import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Schedule a Meeting
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book a consultation with our team at your convenience
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-4 shadow-medium overflow-hidden">
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
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
