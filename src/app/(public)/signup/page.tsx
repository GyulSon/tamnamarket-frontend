'use client';

import { useState, useEffect } from 'react';
import OnboardingFirst from '@/features/onboarding/OnboardingFirst';
import OnboardingThird from '@/features/onboarding/OnboardingThird';

export default function SignupPage() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirst(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showFirst ? <OnboardingFirst /> : <OnboardingThird />;
}
