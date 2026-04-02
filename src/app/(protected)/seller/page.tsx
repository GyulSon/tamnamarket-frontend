import { Button } from '@vapor-ui/core';

import SectionContainer from '@/components/SectionContainer';
import Link from 'next/link';

const SellerPage = () => {
  return (
    <SectionContainer>
      <Button nativeButton={false} render={<Link href="/seller/register" />}>
        상품등록
      </Button>
      <Button nativeButton={false} render={<Link href="/seller/list" />}>
        리스트
      </Button>
    </SectionContainer>
  );
};

export default SellerPage;
