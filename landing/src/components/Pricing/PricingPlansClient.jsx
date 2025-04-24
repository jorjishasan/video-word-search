'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingCard from './PricingCard';
import { PRICING_CONFIG } from './pricingConfig';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }
};

const PricingPlansClient = () => {
  const [activePlan, setActivePlan] = useState(PRICING_CONFIG.defaultActivePlan);
  const [billingCycle, setBillingCycle] = useState(PRICING_CONFIG.defaultBillingCycle);
  
  // Get plans based on current billing cycle
  const plans = PRICING_CONFIG.getPlans(billingCycle);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-1 rounded-full">
          <div className="flex items-center">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-primary/90 to-accent/90 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === 'yearly' 
                  ? 'bg-gradient-to-r from-primary/90 to-accent/90 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              <span className="flex items-center gap-2">
                Yearly
                <span className="bg-green-500/20 text-green-400 text-xs py-0.5 px-1.5 rounded-md whitespace-nowrap">Save 20%</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {plans.map((plan, index) => (
          <PricingCard 
            key={plan.name}
            plan={plan}
            isActive={activePlan === index}
            onClick={() => setActivePlan(index)}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PricingPlansClient;