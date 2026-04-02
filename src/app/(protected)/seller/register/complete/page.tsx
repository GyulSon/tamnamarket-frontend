import RegisterCompletePage from '@/features/seller/register/components/RegisterCompletePage';

type SellerRegisterCompletePageProps = {
  searchParams?: Promise<{
    title?: string;
  }>;
};

const SellerRegisterCompletePage = async ({
  searchParams,
}: SellerRegisterCompletePageProps) => {
  const resolvedSearchParams = await searchParams;

  return <RegisterCompletePage title={resolvedSearchParams?.title} />;
};

export default SellerRegisterCompletePage;
