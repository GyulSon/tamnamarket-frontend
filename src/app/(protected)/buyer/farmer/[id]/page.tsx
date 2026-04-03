'use client';

import { use } from 'react';
import { BuyerFarmerDetail } from '@/features/buyer/widgets/BuyerFarmerDetail';

export default function FarmerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <BuyerFarmerDetail farmerId={id} />;
}
