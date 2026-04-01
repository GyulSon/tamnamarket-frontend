<!-- 해커톤 템플릿 소개 문서 -->
# Hackathon Starter

짧은 기간 안에 빠르게 기능을 붙일 수 있도록 만든 `Next.js + TypeScript + TanStack Query + Zustand` 템플릿이다.

## 시작하기

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000` 이다.

## 기술 스택

- Next.js App Router
- TypeScript
- TanStack Query
- Zustand

## 폴더 구조

```txt
src/
  app/                # 라우트
  components/         # 공용 컴포넌트
  features/           # 기능 단위 컴포넌트
  hooks/              # 커스텀 훅
  lib/                # api, utils, constants
  mocks/              # 더미데이터
  store/              # 전역 상태
  styles/             # 전역 스타일
  types/              # 타입
docs/
  convention.md       # 아주 짧은 작업 규칙
public/
  images/             # 이미지 정적 자산
  fonts/              # 폰트 파일
```

## 팀 작업 가이드

- 공통 UI는 `src/components` 에 둔다.
- 기능별 UI와 로직은 `src/features` 아래에 모은다.
- 서버 데이터는 TanStack Query로, 전역 UI 상태는 Zustand로 관리한다.
- 빠르게 검증해야 하므로 복잡한 추상화보다 명확한 구조를 우선한다.
- 정적 이미지와 폰트 파일은 `public` 아래에 두고 `/images/...`, `/fonts/...` 경로로 사용한다.
