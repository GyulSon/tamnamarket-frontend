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

export type SaleDraftResponse = {
  categoryLabel?: string;
  description?: string;
  priceReason?: string;
  recommendedPrice?: number | string;
  sellerMessage?: string;
  title?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const pickFirstString = (...values: unknown[]) => {
  const matchedValue = values.find(
    (value): value is string =>
      typeof value === 'string' && value.trim().length > 0,
  );

  return matchedValue?.trim();
};

const pickFirstPrice = (...values: unknown[]) => {
  const matchedValue = values.find(
    (value): value is number | string =>
      (typeof value === 'number' && Number.isFinite(value)) ||
      (typeof value === 'string' && value.trim().length > 0),
  );

  if (typeof matchedValue === 'string') {
    return matchedValue.trim();
  }

  return matchedValue;
};

const normalizeSaleDraftResponse = (payload: unknown): SaleDraftResponse => {
  if (!isRecord(payload)) {
    return {};
  }

  const draft = isRecord(payload.draft) ? payload.draft : payload;

  return {
    title: pickFirstString(draft.title, draft.productTitle, draft.name),
    description: pickFirstString(
      draft.description,
      draft.content,
      draft.summary,
      draft.saleContent,
    ),
    recommendedPrice: pickFirstPrice(
      draft.recommendedPrice,
      draft.price,
      draft.suggestedPrice,
    ),
    priceReason: pickFirstString(
      draft.priceReason,
      draft.pricingReason,
      draft.reason,
    ),
    sellerMessage: pickFirstString(
      draft.sellerMessage,
      draft.messageToBuyer,
      draft.commentToBuyer,
      draft.voiceSummary,
    ),
    categoryLabel: pickFirstString(
      draft.categoryLabel,
      draft.category,
      draft.classification,
    ),
  };
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

export async function submitSaleVoiceAnswers(
  files: File[],
): Promise<SaleDraftResponse> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('voiceFiles', file, file.name);
  });

  console.log(
    '[submitSaleVoiceAnswers] formData entries',
    Array.from(formData.entries()).map(([key, value]) => {
      if (value instanceof File) {
        return {
          key,
          name: value.name,
          type: value.type,
          size: value.size,
        };
      }

      return {
        key,
        value,
      };
    }),
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? '';
  const endpoint = `${baseUrl}/api/sale/voice`;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('음성 업로드 요청에 실패했다.');
  }

  const responseJson = (await response
    .json()
    .catch(() => ({}))) as unknown;

  return normalizeSaleDraftResponse(responseJson);
}
