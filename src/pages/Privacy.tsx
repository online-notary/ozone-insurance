import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Who we are</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">Our website address is: https://ozoneinsurance.com.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.</p>
                <p className="text-base">An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">We will send SMS to people who are already registered with us to remind them about upcoming events, registered events, etc.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data we collect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">We collect Names, email addresses and phone numbers. Will not collect personal data such as DOB, SSN, etc unless they are our client and we need that information to apply for their insurance policies.</p>
                <p className="text-base">If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
                <p className="text-base">If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Embedded content from other websites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who we share your data with</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">If you request a password reset, your IP address will be included in the reset email.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How long we retain your data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>
                <p className="text-base">For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What rights you have over your data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Where your data is sent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">Visitor comments may be checked through an automated spam detection service.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;