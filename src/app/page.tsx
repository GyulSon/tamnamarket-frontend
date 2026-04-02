'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingFirst from '@/features/onboarding/OnboardingFirst';
import OnboardingThird from '@/features/onboarding/OnboardingThird';

export default function MainPage() {
  const [showFirst, setShowFirst] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedRole = localStorage.getItem('selectedRole');
      if (savedRole === 'seller') {
        router.push('/seller');
      } else if (savedRole === 'buyer') {
        router.push('/buyer');
      } else {
        setShowFirst(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (showFirst) {
    return <OnboardingFirst />;
  }

  return <OnboardingThird />;
}
