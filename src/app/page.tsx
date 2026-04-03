'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OnboardingFirst from '@/features/onboarding/OnboardingFirst';
import OnboardingThird from '@/features/onboarding/OnboardingThird';

const INTRO_VISIBLE_MS = 650;
const INTRO_UNMOUNT_MS = 1000;

export default function MainPage() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [shouldRenderIntro, setShouldRenderIntro] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole');

    if (savedRole === 'seller') {
      router.push('/seller');
      return;
    }

    if (savedRole === 'buyer') {
      router.push('/buyer');
      return;
    }

    const hideTimer = setTimeout(() => {
      setIsIntroVisible(false);
    }, INTRO_VISIBLE_MS);

    const unmountTimer = setTimeout(() => {
      setShouldRenderIntro(false);
    }, INTRO_UNMOUNT_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [router]);

  if (!shouldRenderIntro) {
    return <OnboardingThird />;
  }

  return (
    <>
      <OnboardingThird />
      <OnboardingFirst isVisible={isIntroVisible} />
    </>
  );
}
