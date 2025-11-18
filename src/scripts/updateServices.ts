// Script to update services in Supabase
// Run this once to populate the services table with Ozone Insurance offerings

import { supabase } from "@/integrations/supabase/client";

const ozoneServices = [
  // Personal Insurance
  {
    title: "Travel Insurance",
    slug: "travel-insurance",
    icon_name: "Shield",
    items: ["Trip cancellation coverage", "Medical emergency protection", "Lost luggage reimbursement", "Travel delay benefits"],
    main_title: "Travel Insurance",
    description: "Comprehensive travel protection for your trips, covering medical emergencies, trip cancellations, and more.",
    image_url: "/images/insurance-banner-1.jpg"
  },
  {
    title: "Home/Auto/Umbrella Insurance",
    slug: "home-auto-umbrella",
    icon_name: "Shield",
    items: ["Homeowners protection", "Auto liability coverage", "Umbrella policy options", "Comprehensive coverage"],
    main_title: "Home/Auto/Umbrella Insurance",
    description: "Complete protection for your home, vehicles, and additional liability coverage with umbrella policies.",
    image_url: "/images/insurance-banner-2.jpg"
  },
  {
    title: "Business Auto Insurance",
    slug: "business-auto",
    icon_name: "TrendingUp",
    items: ["Commercial vehicle coverage", "Fleet insurance", "Liability protection", "Collision coverage"],
    main_title: "Business Auto Insurance",
    description: "Comprehensive insurance solutions for commercial vehicles and business fleets.",
    image_url: "/images/insurance-banner-3.jpg"
  },
  {
    title: "Health Insurance",
    slug: "health-insurance",
    icon_name: "Heart",
    items: ["Individual plans", "Family coverage", "Preventive care", "Prescription benefits"],
    main_title: "Health Insurance",
    description: "Quality health coverage for individuals and families with comprehensive medical benefits.",
    image_url: "/images/professional-team.jpg"
  },
  {
    title: "Dental Insurance",
    slug: "dental-insurance",
    icon_name: "Heart",
    items: ["Routine checkups", "Major dental work", "Orthodontics", "Preventive care"],
    main_title: "Dental Insurance",
    description: "Complete dental coverage including preventive care, major procedures, and orthodontics.",
    image_url: "/images/hero-family.jpg"
  },
  {
    title: "Disability Insurance",
    slug: "disability-insurance",
    icon_name: "Shield",
    items: ["Short-term disability", "Long-term disability", "Income protection", "Benefit payments"],
    main_title: "Disability Insurance",
    description: "Protect your income with disability insurance covering both short-term and long-term needs.",
    image_url: "/images/financial-planning.jpg"
  },
  {
    title: "Vision Insurance",
    slug: "vision-insurance",
    icon_name: "Shield",
    items: ["Eye exams", "Glasses coverage", "Contact lenses", "Vision care benefits"],
    main_title: "Vision Insurance",
    description: "Comprehensive vision care coverage including eye exams, glasses, and contact lenses.",
    image_url: "/images/businessman-professional.png"
  },
  // Commercial Insurance
  {
    title: "Professional Liability",
    slug: "professional-liability",
    icon_name: "FileText",
    items: ["Errors & omissions", "Malpractice coverage", "Legal defense", "Claims protection"],
    main_title: "Professional Liability Insurance",
    description: "Protect your business with professional liability coverage against errors, omissions, and malpractice claims.",
    image_url: "/images/businessman-image.png"
  },
  {
    title: "Workers Compensation",
    slug: "workers-compensation",
    icon_name: "Users",
    items: ["Employee injury coverage", "Medical expenses", "Lost wages", "Legal compliance"],
    main_title: "Workers Compensation Insurance",
    description: "Essential coverage for employee injuries and workplace accidents, ensuring legal compliance.",
    image_url: "/images/insurance-banner-1.jpg"
  },
  {
    title: "Group Health Insurance",
    slug: "group-health",
    icon_name: "Heart",
    items: ["Employee benefits", "Group plans", "Health coverage", "Wellness programs"],
    main_title: "Group Health Insurance",
    description: "Comprehensive health benefits for your employees with flexible group health plans.",
    image_url: "/images/insurance-banner-2.jpg"
  }
];

export async function updateOzoneServices() {
  try {
    // Delete existing services
    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Error deleting services:', deleteError);
      return { success: false, error: deleteError };
    }

    // Insert new services
    const { data, error: insertError } = await supabase
      .from('services')
      .insert(ozoneServices);

    if (insertError) {
      console.error('Error inserting services:', insertError);
      return { success: false, error: insertError };
    }

    console.log('Services updated successfully!');
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error };
  }
}
