// Define pricing plans data
export const PRICING_CONFIG = {
  defaultActivePlan: 1, // Default to 'Pro' (middle plan)
  defaultBillingCycle: 'monthly', // 'monthly' or 'yearly'
  
  getPlans: (billingCycle = 'monthly') => [
    {
      name: 'BASIC',
      price: billingCycle === 'monthly' ? '$19' : '$190',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for individuals and small projects',
      features: [
        '1 User',
        '5GB Storage',
        'Basic Support',
        'Limited API Access',
        'Standard Analytics'
      ],
      cta: 'Subscribe',
      popular: false,
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      name: 'PRO',
      price: billingCycle === 'monthly' ? '$49' : '$490',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Ideal for growing businesses and teams',
      features: [
        '5 Users',
        '50GB Storage',
        'Priority Support',
        'Full API Access',
        'Advanced Analytics'
      ],
      cta: 'Subscribe',
      popular: true,
      color: 'from-primary/30 to-accent/30'
    },
    {
      name: 'ENTERPRISE',
      price: billingCycle === 'monthly' ? '$99' : '$990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For large-scale operations and high-volume users',
      features: [
        'Unlimited Users',
        '500GB Storage',
        '24/7 Premium Support',
        'Custom Integrations',
        'AI-Powered Insights'
      ],
      cta: 'Subscribe',
      popular: false,
      color: 'from-purple-500/20 to-purple-600/20'
    }
  ]
};