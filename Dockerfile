# 1. 의존성 설치 단계
FROM node:20-alpine AS deps
# 포팅된(libc6-compat) C 표준 라이브러리가 필요한 패키지를 위해 추가
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.json 및 package-lock.json(존재할 경우) 복사 후 의존성 설치
COPY package.json package-lock.json* ./
RUN npm ci

# 2. 빌드 단계
FROM node:20-alpine AS builder
WORKDIR /app

# 설치한 의존성과 전체 소스 코드 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# 3. 실행 단계
FROM node:20-alpine AS runner
WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV production
ENV PORT 3000

# 보안 및 권한 관리를 위해 nextjs 그룹과 유저 생성 (권장 사항)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js 실행에 필요한 파일들만 builder 단계에서 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js 프로덕션 서버 실행
CMD ["npm", "start"]
