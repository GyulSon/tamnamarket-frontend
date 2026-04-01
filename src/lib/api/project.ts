// 프로젝트 목업 API 파일
import { mockProjects } from '@/mocks';
import { Test } from '@/types';

export async function getMockProjects(): Promise<Test[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  return mockProjects;
}
