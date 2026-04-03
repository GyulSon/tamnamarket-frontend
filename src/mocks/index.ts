import { Test } from '@/types';
export { MOCK_FARMERS } from './farmers';
export type { MockFarmer } from './farmers';

export { MOCK_PRODUCTS } from './products';
export type { MockProduct } from './products';

export const mockProjects: Test[] = [
  {
    id: 1,
    name: 'Project A',
    summary: 'Test summary 1',
  },
  {
    id: 2,
    name: 'Project B',
    summary: 'Test summary 2',
  },
  {
    id: 3,
    name: 'Project C',
    summary: 'Test summary 3',
  },
];
