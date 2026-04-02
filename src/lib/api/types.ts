/** 공통 응답 구조 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}
