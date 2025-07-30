# React + TypeScript + swc 기본 구조 세팅 프로젝트
> React와 TypeScript, swc를 기반으로 프론트엔드 프로젝트의 초기 구조를 세팅한 프로젝트입니다.
> 인증 플로우, Axios 인터셉터, React Query 세팅 등 실무에 필요한 구성 요소들을 포함합니다.

---

## 🔧 사용 기술 스택
- Framework: React, Typescript
- Bundler : SWC
- package : @emotion/styled, react-query, axios, jquery, moment, react-cookie, redux, react-router-dom

## 📁 주요 구성 및 설명

### 디렉토리 구조
- 초기 프로젝트 구조 및 각 디렉토리에 대한 설명 포함 (설명 파일은 프로젝트 생성 후 제거 가능)

### 인증 플로우
- 로그인 / 로그아웃
- Axios 인터셉터를 통한 인증 토큰 자동 처리
  - 토큰 자동 실어보내기
  - 토큰 만료 시 재발급 및 재요청 처리

### 게시물 목록 조회 기능
- 간단한 REST API 기반 게시물 목록 조회 구현

### index.html 메타데이터
- `title`, `description`, `Open Graph`, favicon 등 SEO 고려 설정 포함

### 전역 Providers 설정
- Redux
- 인증 컨텍스트
- Axios 인터셉터
- React Query

### 유틸리티 (libs/)
- 정규표현식, 주소 API 등 실무에서 자주 사용하는 유틸 함수 정리

### Hooks 구성
- 인증 컨텍스트와 관련된 커스텀 훅
- 테스트용 API 호출 Hook (`useTestApi` 등) 예시 제공

### API 구성 방식
- 경량 프로젝트용 `fetchFilter`
- 인증 및 유지보수 중심 프로젝트용 `axiosFilter` 방식 분리 구성

---


