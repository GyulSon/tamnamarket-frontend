import { BASE_URL } from '@/lib/constants/app';

type SaleClassificationResponse = {
  productId?: number;
  result: string;
};

export type SaleDraftResponse = {
  audioUrl?: string;
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
      typeof value === 'string' && value.trim().length > 0
  );

  return matchedValue?.trim();
};

const toFiniteNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  if (!/^-?\d+(\.\d+)?$/.test(trimmedValue)) {
    return undefined;
  }

  const parsedValue = Number(trimmedValue);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
};

const pickFirstNumber = (...values: unknown[]) => {
  for (const value of values) {
    const parsedValue = toFiniteNumber(value);

    if (parsedValue !== undefined) {
      return parsedValue;
    }
  }

  return undefined;
};

const pickFirstPrice = (...values: unknown[]) => {
  const matchedValue = values.find(
    (value): value is number | string =>
      (typeof value === 'number' && Number.isFinite(value)) ||
      (typeof value === 'string' && value.trim().length > 0)
  );

  if (typeof matchedValue === 'string') {
    return matchedValue.trim();
  }

  return matchedValue;
};

const getApiEndpoint = (path: string) => {
  const baseUrl = BASE_URL.trim().replace(/\/+$/, '');

  return `${baseUrl}${path}`;
};

const isFailedApiResponse = (payload: unknown) =>
  isRecord(payload) &&
  (payload.isSuccess === false || payload.success === false);

const getResponseJson = async (response: Response) =>
  (await response.json().catch(() => ({}))) as unknown;

const getApiMessage = (payload: unknown) => {
  if (!isRecord(payload)) {
    return undefined;
  }

  return pickFirstString(payload.message, payload.detail);
};

const getApiPayload = (payload: unknown) => {
  if (!isRecord(payload)) {
    return payload;
  }

  if (payload.data !== undefined && payload.data !== null) {
    return payload.data;
  }

  if (payload.content !== undefined && payload.content !== null) {
    return payload.content;
  }

  if (payload.draft !== undefined && payload.draft !== null) {
    return payload.draft;
  }

  return payload;
};

const normalizeSaleClassificationResponse = (
  payload: unknown
): SaleClassificationResponse => {
  if (typeof payload === 'string') {
    return {
      productId: undefined,
      result: payload.trim(),
    };
  }

  if (isRecord(payload) && typeof payload.content === 'string') {
    return {
      productId: undefined,
      result: payload.content.trim(),
    };
  }

  const content = getApiPayload(payload);

  if (!isRecord(content)) {
    return {
      result: '',
    };
  }

  return {
    productId: pickFirstNumber(
      content.productId,
      content.product_id,
      content.id
    ),
    result:
      pickFirstString(
        content.result,
        content.category,
        content.categoryLabel,
        content.classification
      ) ?? '',
  };
};

const normalizeSaleDraftResponse = (payload: unknown): SaleDraftResponse => {
  const draft = getApiPayload(payload);

  if (!isRecord(draft)) {
    return {};
  }

  return {
    audioUrl: pickFirstString(draft.audioUrl, draft.audio_url),
    title: pickFirstString(draft.title, draft.productTitle, draft.name),
    description: pickFirstString(
      draft.description,
      draft.content,
      draft.summary,
      draft.saleContent
    ),
    recommendedPrice: pickFirstPrice(
      draft.recommendedPrice,
      draft.price,
      draft.suggestedPrice,
      draft.recommendPrice,
      draft.recommended_price
    ),
    priceReason: pickFirstString(
      draft.priceReason,
      draft.pricingReason,
      draft.reason,
      draft.price_reason
    ),
    sellerMessage: pickFirstString(
      draft.sellerMessage,
      draft.messageToBuyer,
      draft.commentToBuyer,
      draft.voiceSummary
    ),
    categoryLabel: pickFirstString(
      draft.categoryLabel,
      draft.category,
      draft.classification
    ),
  };
};

export async function classifySaleImage(
  file: File
): Promise<SaleClassificationResponse> {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const response = await fetch(getApiEndpoint('/api/sale/classification'), {
    method: 'POST',
    body: formData,
  });

  const responseJson = await getResponseJson(response);

  if (!response.ok || isFailedApiResponse(responseJson)) {
    throw new Error(
      getApiMessage(responseJson) ?? '품종 분류에 실패했어요. 다시 시도해주세요.'
    );
  }

  const normalizedResponse = normalizeSaleClassificationResponse(responseJson);

  if (!normalizedResponse.result) {
    throw new Error('품종 분류 결과를 확인하지 못했어요.');
  }

  return normalizedResponse;
}

export async function submitSaleVoiceAnswers(
  productId: number,
  files: File[]
): Promise<SaleDraftResponse> {
  const formData = new FormData();
  formData.append('product_id', String(productId));

  files.forEach((file) => {
    formData.append('voices', file, file.name);
  });

  const response = await fetch(getApiEndpoint('/api/sale/text'), {
    method: 'POST',
    body: formData,
  });

  const responseJson = await getResponseJson(response);

  if (!response.ok || isFailedApiResponse(responseJson)) {
    throw new Error(
      getApiMessage(responseJson) ??
        '음성 기반 게시물 작성에 실패했어요. 다시 시도해주세요.'
    );
  }

  return normalizeSaleDraftResponse(responseJson);
}
