import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SmsPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">SMS Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">Last Updated: October 2, 2024</p>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Overview of the SMS Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">Our SMS program provides updates, notifications, and promotional messages related to our services. By subscribing to our SMS program, you will want to receive SMS messages at the phone number provided. Just to let you know, message frequency may vary based on your interaction with our service.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Types of Personal Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">We may collect the following personal information to facilitate our SMS program:</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address (if applicable)</li>
                  <li>Other contact information (if applicable)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Methods of Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">We collect personal data through the following methods:</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li><strong>Online Forms:</strong> Information is collected when you submit a form to subscribe to our SMS program on our website.</li>
                  <li><strong>Physical Forms:</strong> Information is collected when you fill out and submit a physical form at one of our locations or events.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. How We Use Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">The personal data we collect is used to:</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li>Send you SMS messages related to updates, notifications, and promotional offers.</li>
                  <li>Communicate policy updates and other service-related information.</li>
                  <li>Provide customer support and respond to your inquiries.</li>
                  <li>Improve our services and user experience.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Sharing Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">We do not sell or rent your personal information to third parties. However, we may share your data with:</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li><strong>Service Providers:</strong> Third-party vendors that help us manage and deliver SMS services.</li>
                  <li><strong>Legal Compliance:</strong> We may disclose your information if required by law or to comply with legal processes.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. How Long We Retain Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">We will retain your personal data for as long as you are subscribed to our SMS program. If you opt out, we will retain your data for a reasonable period to comply with legal obligations or resolve disputes.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">You have the following rights regarding your personal data:</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                  <li><strong>Opt-Out:</strong> You can opt-out of receiving SMS messages at any time by replying STOP to any message you receive from us. You may also contact us directly to unsubscribe.</li>
                  <li><strong>Access and Correction:</strong> You have the right to request access to the personal data we hold about you and request corrections if the information is inaccurate.</li>
                  <li><strong>Data Deletion:</strong> You may request the deletion of your personal data, subject to legal and contractual obligations.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Message and Data Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">Standard message and data rates may apply to SMS messages sent to you by your mobile carrier. Please contact your mobile carrier for more information about your specific plan.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to This SMS Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">We may update this SMS Privacy Policy from time to time. If we make material changes, we will notify you by posting the updated policy on our website and, where appropriate, by sending you an SMS notification. Your continued participation in the SMS program after the changes take effect constitutes your acceptance of the revised policy.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">If you have any questions or concerns about this SMS Privacy Policy or how we handle your personal data, please contact us at:</p>
                <div className="space-y-2 text-base">
                  <p><strong>Email:</strong> <a href="mailto:info@ozoneinsurance.com" className="text-primary hover:underline">info@ozoneinsurance.com</a></p>
                  <p><strong>Phone:</strong> <a href="tel:18336969663" className="text-primary hover:underline">1-833-MY-OZONE</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SmsPrivacy;