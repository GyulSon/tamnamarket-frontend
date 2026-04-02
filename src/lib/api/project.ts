// 프로젝트 목업 API 파일
import { mockProjects } from '@/mocks';
import { Test } from '@/types';

export async function getMockProjects(): Promise<Test[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  return mockProjects;
}

type SaleClassificationResponse = {
  result: string;
};

export async function classifySaleImage(
  file: File,
): Promise<SaleClassificationResponse> {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? '';
  const endpoint = `${baseUrl}/api/sale/classification`;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('이미지 분류 요청에 실패했다.');
  }

  return response.json() as Promise<SaleClassificationResponse>;
}
