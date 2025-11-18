-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  main_title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  icon_name TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  additional_features JSONB DEFAULT '[]'::jsonb,
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (no authentication required for viewing services)
CREATE POLICY "Services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample services data
INSERT INTO public.services (slug, title, subtitle, main_title, description, image_url, icon_name, features, benefits, additional_features, items) VALUES
(
  'life-insurance',
  'Life Insurance',
  'What We Offer',
  'Comprehensive Life Insurance Solutions for Your Family',
  'Our life insurance policies provide financial security and peace of mind for you and your loved ones. With various options including term, whole, and universal life insurance, we help protect your family''s future.',
  '/src/assets/insurance-banner-1.jpg',
  'Heart',
  '["Easy & Fast Application Process", "Competitive Premium Rates", "Flexible Payment Options", "Comprehensive Coverage", "No Medical Exam Options", "24/7 Customer Support"]',
  '[{"title": "Term Life Insurance", "description": "Affordable coverage for a specific period"}, {"title": "Whole Life Insurance", "description": "Permanent protection with cash value growth"}, {"title": "Universal Life Insurance", "description": "Flexible premiums and death benefits"}]',
  '["Professional Insurance Services", "Quick Claims Processing", "Financial Planning Support", "Estate Planning Assistance"]',
  '["Permanent life insurance", "Term insurance", "Final Expenses", "Whole life", "Index Universal Life", "Universal Life"]'
),
(
  'long-term-care',
  'Long-Term Care',
  'What We Offer',
  'Comprehensive Long-Term Care Insurance',
  'Protect yourself and your family from the high costs of long-term care services. Our policies provide coverage for nursing homes, assisted living, and in-home care services.',
  '/src/assets/insurance-banner-2.jpg',
  'Shield',
  '["Nursing Home Coverage", "In-Home Care Benefits", "Assisted Living Support", "Adult Day Care", "Flexible Benefit Periods", "Inflation Protection"]',
  '[{"title": "Nursing Care", "description": "Comprehensive skilled nursing facility coverage"}, {"title": "Home Care Services", "description": "Professional care in the comfort of your home"}, {"title": "Assisted Living", "description": "Support for independent living with assistance"}]',
  '["Care Coordination Services", "24/7 Claims Support", "Caregiver Resources", "Health Management Tools"]',
  '[]'
),
(
  'disability-insurance',
  'Disability Insurance',
  'What We Offer',
  'Income Protection Through Disability Insurance',
  'Secure your financial future with disability insurance that provides income replacement when you cannot work due to illness or injury.',
  '/src/assets/insurance-banner-3.jpg',
  'Shield',
  '["Short-Term Disability", "Long-Term Disability", "Income Replacement", "Medical Benefits", "Rehabilitation Support", "Return-to-Work Programs"]',
  '[{"title": "Short-Term Coverage", "description": "Protection for temporary disabilities"}, {"title": "Long-Term Benefits", "description": "Extended coverage for permanent disabilities"}, {"title": "Income Replacement", "description": "Maintain your standard of living"}]',
  '["Vocational Rehabilitation", "Claims Advocacy", "Financial Planning Support", "Medical Case Management"]',
  '["Income replacement"]'
),
(
  'retirement-planning',
  'Retirement Planning',
  'What We Offer',
  'Secure Your Financial Future with Smart Retirement Planning',
  'Build wealth and secure your retirement with our comprehensive planning services. From 401(k) optimization to IRA management, we help you create a retirement strategy that works.',
  '/src/assets/financial-planning.jpg',
  'TrendingUp',
  '["Personalized Retirement Strategies", "Investment Portfolio Management", "Tax-Advantaged Accounts", "Social Security Optimization", "Estate Planning Integration", "Regular Portfolio Reviews"]',
  '[{"title": "401(k) Planning", "description": "Maximize your employer-sponsored retirement benefits"}, {"title": "IRA Management", "description": "Traditional and Roth IRA optimization"}, {"title": "Income Strategies", "description": "Create reliable retirement income streams"}]',
  '["Retirement Income Projections", "Risk Assessment & Management", "Long-term Care Planning", "Legacy Planning Services"]',
  '[]'
),
(
  'health-insurance',
  'Health Insurance',
  'What We Offer',
  'Comprehensive Health Insurance Plans',
  'Protect your health and finances with our comprehensive health insurance plans. From individual coverage to family plans, we provide access to quality healthcare when you need it most.',
  '/src/assets/hero-family.jpg',
  'Shield',
  '["Preventive Care Coverage", "Prescription Drug Benefits", "Emergency Medical Services", "Specialist Care Access", "Mental Health Support", "Telehealth Services"]',
  '[{"title": "Covered California Plans", "description": "ACA-compliant health insurance options"}, {"title": "Medi-Cal Enrollment", "description": "State-funded healthcare for eligible individuals"}, {"title": "Supplemental Coverage", "description": "Additional protection for gaps in coverage"}]',
  '["Network Provider Access", "Online Portal Management", "Health & Wellness Programs", "Chronic Care Management"]',
  '["Covered California (health)", "Medi-Cal"]'
),
(
  'business-insurance',
  'Business Insurance',
  'What We Offer',
  'Comprehensive Business Protection Solutions',
  'Protect your business with comprehensive insurance coverage including general liability, workers compensation, and professional liability insurance.',
  '/src/assets/professional-team.jpg',
  'Shield',
  '["General Liability Coverage", "Workers Compensation", "Professional Liability", "Commercial Property", "Business Interruption", "Cyber Liability"]',
  '[{"title": "General Liability", "description": "Protection against third-party claims"}, {"title": "Workers Compensation", "description": "Employee injury and illness coverage"}, {"title": "Professional Liability", "description": "Errors and omissions protection"}]',
  '["Risk Assessment Services", "Claims Management", "Safety Training Programs", "Compliance Support"]',
  '["General Liability", "Workers Comp"]'
),
(
  'tax-preparation',
  'Tax Preparation',
  'What We Offer',
  'Professional Tax Preparation Services',
  'Get expert tax preparation services to maximize your refund and ensure compliance. Our certified professionals handle individual and business tax returns.',
  '/src/assets/businessman-professional.png',
  'FileText',
  '["Individual Tax Returns", "Business Tax Filing", "Tax Planning", "Audit Support", "Electronic Filing", "Year-Round Support"]',
  '[{"title": "Individual Returns", "description": "Personal income tax preparation and filing"}, {"title": "Business Returns", "description": "Corporate and small business tax services"}, {"title": "Tax Planning", "description": "Strategic tax optimization advice"}]',
  '["IRS Representation", "Tax Problem Resolution", "Quarterly Payments", "Record Keeping Support"]',
  '[]'
),
(
  'business-bookkeeping-services',
  'Business Bookkeeping Services',
  'What We Offer',
  'Professional Business Bookkeeping Solutions',
  'Keep your business finances organized with our professional bookkeeping services. We provide accurate record keeping and financial reporting.',
  '/src/assets/businessman-image.png',
  'Calculator',
  '["Monthly Bookkeeping", "Financial Statements", "Accounts Payable/Receivable", "Payroll Processing", "Tax Preparation Support", "Cloud-Based Solutions"]',
  '[{"title": "Monthly Services", "description": "Regular bookkeeping and reconciliation"}, {"title": "Financial Reports", "description": "Detailed profit & loss and balance sheets"}, {"title": "Payroll Management", "description": "Complete payroll processing services"}]',
  '["QuickBooks Setup", "Bank Reconciliation", "Expense Tracking", "Financial Analysis"]',
  '[]'
);