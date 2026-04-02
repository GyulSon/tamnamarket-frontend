'use client';

import BuyerCompleted from '@/features/buyer/widgets/BuyerCompleted';
import { useRouter } from 'next/navigation';

export default function CompletedPage() {
  const router = useRouter();
  return <BuyerCompleted onConfirm={() => router.back()} />;
}
