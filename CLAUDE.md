# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Instagram-like 소셜 미디어 애플리케이션으로, Next.js 16 App Router, TypeScript, Prisma, NextAuth.js를 사용합니다. 사용자는 사진을 업로드하고, 좋아요와 댓글로 상호작용하며, 팔로우한 사용자의 게시물을 피드에서 확인할 수 있습니다.

## Development Commands

### 개발 서버
```bash
npm run dev              # Turbopack 사용하여 개발 서버 시작
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 시작
```

### 데이터베이스 (Prisma)
```bash
npm run prisma:generate  # Prisma 클라이언트 생성
npm run prisma:migrate   # 마이그레이션 실행 (개발)
npm run prisma:studio    # Prisma Studio GUI 열기

# 기타 유용한 명령어
npx prisma db push       # 스키마 변경사항 DB에 푸시 (마이그레이션 없이)
npx prisma db seed       # 개발용 데이터 시딩
```

### 코드 품질
```bash
npm run lint             # ESLint 실행 (typescript-eslint 사용)
npm run type-check       # TypeScript 타입 체크 (빌드 없이)
```

**Git Hooks (Husky + lint-staged)**:
- `husky`와 `lint-staged`가 설정되어 있어 commit 시 자동으로 lint와 type-check 실행
- commit 전 자동으로 `eslint --fix`로 자동 수정 가능한 문제 해결
- TypeScript 타입 에러가 있으면 commit 차단

### 테스팅
현재 package.json에 테스트 스크립트가 설정되어 있지 않습니다. Test Sprite MCP를 사용한 property-based 테스팅이 계획되어 있습니다.

## Architecture

### Tech Stack
- **프레임워크**: Next.js 16+ (App Router, Server Components)
- **언어**: TypeScript
- **데이터베이스**: SQLite + Prisma ORM
- **인증**: NextAuth.js v5 (JWT 전략)
- **스타일링**: Tailwind CSS + shadcn/ui
- **파일 스토리지**: 로컬 파일시스템 (개발) / Vercel Blob (프로덕션)

### Database Schema (Prisma)

**User**: 사용자 계정 정보 (email, username, password, bio, image)
- 관계: posts, likes, comments, followers/following (Follow 모델 통해)

**Post**: 사진 게시물 (imageUrl, caption)
- 관계: user (작성자), likes, comments

**Like**: 게시물 좋아요
- 복합 unique 제약: (userId, postId)

**Comment**: 게시물 댓글 (content)
- 관계: user (작성자), post

**Follow**: 팔로우 관계 (followerId, followingId)
- 복합 unique 제약: (followerId, followingId)
- self-referential 관계로 User 모델의 followers/following 구현

### Project Structure

```
app/                  # Next.js App Router
├── layout.tsx        # 루트 레이아웃
├── page.tsx          # 홈 페이지
├── (auth)/           # 인증 라우트 그룹 (계획됨)
├── api/              # API 라우트 핸들러 (계획됨)
├── feed/             # 메인 피드 페이지 (계획됨)
├── profile/[id]/     # 동적 사용자 프로필 (계획됨)
└── upload/           # 게시물 작성 페이지 (계획됨)

components/           # 재사용 가능한 UI 컴포넌트 (계획됨)
├── ui/              # shadcn/ui 컴포넌트
├── auth/            # 인증 폼
├── feed/            # 피드 관련 컴포넌트
├── post/            # 게시물 컴포넌트
└── profile/         # 프로필 컴포넌트

lib/                 # 유틸리티 함수
├── prisma.ts        # Prisma 클라이언트 싱글톤
├── auth.ts          # 인증 관련 유틸 (계획됨)
└── validations.ts   # 입력 검증 스키마 (계획됨)

prisma/
└── schema.prisma    # 데이터베이스 스키마 정의

auth.ts              # NextAuth.js 설정 (현재 기본 설정만)
```

## Development Guidelines

### 우선순위 규칙

1. **ALWAYS use Shadcn MCP to create UI** - shadcn/ui 컴포넌트 생성 시 반드시 Shadcn MCP 사용
2. **ALWAYS prioritize server components over client components** - 가능한 한 서버 컴포넌트 우선 사용

### 테스팅 및 품질 보증

코딩 작업 완료 후 반드시 다음 단계를 수행:

1. **Run Tests**: Test Sprite MCP로 관련 테스트 실행
2. **Code Review**: 코드 품질, 가독성, 베스트 프랙티스 준수, 잠재적 버그 검토
3. **Lint Check**: `npm run lint` 실행하여 코드 스타일 일관성 확인
4. **Type Check**: `npm run type-check`로 TypeScript 타입 정확성 검증
5. **Git Commit**: 변경사항 스테이징, 커밋, 푸시
   - 명확한 커밋 메시지 작성
   - 모든 변경사항이 추적되도록 보장
   - 원격 저장소에 푸시

⚠️ **중요**: 모든 체크가 통과할 때까지 작업을 완료로 표시하지 마세요. 실패 시 문제를 수정하고 모든 체크를 재실행하세요.

### NextAuth.js 설정

현재 NextAuth.js 설정이 기본 상태입니다:
- Prisma Adapter 연결됨
- JWT 세션 전략 사용
- 사용자 정의 로그인 페이지: `/auth/signin`
- **providers 배열이 비어있음** - 인증 제공자(Credentials, OAuth 등)를 추가해야 합니다

### API 라우트 구조 (계획됨)

RESTful 패턴 따르기:
- `/api/auth/[...nextauth]` - NextAuth.js 엔드포인트
- `/api/auth/register` - 사용자 등록
- `/api/posts` - 게시물 CRUD
- `/api/posts/[id]/like` - 좋아요 토글
- `/api/posts/[id]/comments` - 댓글 조회/생성
- `/api/users/[id]` - 사용자 프로필
- `/api/users/[id]/follow` - 팔로우/언팔로우
- `/api/upload` - 이미지 업로드

### Property-Based Testing

Test Sprite MCP를 사용한 26개의 correctness properties 구현 예정:
- 각 property 테스트는 최소 100회 반복 실행
- 명시적인 property 참조 주석 포함
- 형식: `**Feature: simple-instagram, Property {number}: {property_text}**`

주요 property 예시:
- Property 1: 사용자 등록 시 계정 생성 및 자동 인증
- Property 17: 좋아요 토글 기능 (좋아요/좋아요 취소)
- Property 21: 팔로우 관계 생성 및 피드 통합
- Property 13: 피드가 팔로우한 사용자의 게시물을 시간순으로 표시

자세한 내용은 `.kiro/specs/simple-instagram/design.md` 참조

### 파일 명명 규칙

- 디렉토리/파일: kebab-case
- 컴포넌트: PascalCase (예: `UserProfile.tsx`)
- API 라우트: REST 규칙 (`/api/posts/[id]/route.ts`)

### 환경 변수

`.env.example` 참고하여 `.env.local` 생성:
- `DATABASE_URL` - SQLite 데이터베이스 경로
- NextAuth.js 관련 변수 (NEXTAUTH_SECRET, NEXTAUTH_URL 등)

## Git Workflow

작업 완료 후:
1. `npm run lint` - 수동으로 먼저 확인 (선택사항)
2. `npm run type-check` - 수동으로 먼저 확인 (선택사항)
3. `git add .` - 변경사항 스테이징
4. `git commit -m "message"` - **이 시점에서 자동으로 lint와 type-check 실행**
5. 모든 검사 통과 시 commit 완료, 실패 시 commit 차단
