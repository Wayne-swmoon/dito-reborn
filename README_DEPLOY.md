# 🚀 개인회생 랜딩페이지 - 배포 가이드

## 📦 프로젝트 다운로드 방법

이 프로젝트를 본인 컴퓨터에 옮기는 가장 쉬운 방법입니다.

---

## 방법 1: ZIP 파일 다운로드 (추천)

### 단계:
1. 현재 Figma Make 화면에서 왼쪽 파일 탐색기 열기
2. 최상위 폴더 우클릭
3. "Download as ZIP" 또는 "Export" 선택
4. 다운로드된 ZIP 파일 압축 해제

---

## 방법 2: 새 프로젝트에 코드만 복사

### 본인 컴퓨터에서 실행할 명령어:

```bash
# 1. 새 폴더 생성
mkdir recovery-landing
cd recovery-landing

# 2. package.json 생성
npm init -y

# 3. Vite + React + TypeScript 설치
npm install vite @vitejs/plugin-react react react-dom
npm install -D @types/react @types/react-dom typescript

# 4. Tailwind CSS 설치
npm install -D tailwindcss@4 @tailwindcss/vite postcss

# 5. UI 라이브러리 설치
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-progress
npm install @radix-ui/react-radio-group @radix-ui/react-separator @radix-ui/react-tooltip
npm install sonner jspdf
```

그 다음, Figma Make에서 다음 파일들의 내용을 **복사 → 붙여넣기**:

### 복사해야 할 핵심 파일들:

```
📄 index.html
📄 vite.config.ts
📄 postcss.config.mjs
📄 tsconfig.json (있다면)

📁 src/
  📄 main.tsx
  📁 styles/
    📄 fonts.css
    📄 theme.css
  📁 app/
    📄 App.tsx
    📁 components/
      📄 hero.tsx
      📄 stats.tsx
      📄 process-steps.tsx
      📄 features.tsx
      📄 testimonials.tsx
      📄 faq.tsx
      📄 contact-form.tsx
      📄 footer.tsx
      📄 self-diagnosis.tsx
      📁 ui/ (전체 폴더)
      📁 figma/ (전체 폴더)
```

---

## 방법 3: Git Clone (GitHub 계정 있는 경우)

이 방법은 제가 먼저 GitHub에 업로드해드린 후 사용 가능합니다.

```bash
git clone https://github.com/[제공된주소]/recovery-landing.git
cd recovery-landing
npm install
npm run dev
```

---

## ⚙️ 로컬에서 테스트

본인 컴퓨터에 프로젝트를 옮긴 후:

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속하여 확인!

---

## 🌐 Cloudflare Pages 배포

### 간단 버전:

1. **GitHub 저장소 만들기**
   - https://github.com/new 접속
   - Repository name: `recovery-landing`
   - Public 선택
   - Create repository

2. **코드 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/본인계정/recovery-landing.git
   git push -u origin main
   ```

3. **Cloudflare Pages 연결**
   - https://dash.cloudflare.com 로그인
   - Workers & Pages → Create application → Pages → Connect to Git
   - GitHub 연결 → 저장소 선택
   - Build settings:
     - Framework: Vite
     - Build command: `npm run build`
     - Output directory: `dist`
   - Save and Deploy

---

## 📞 문제 발생 시

### 빌드 에러가 날 경우:

1. 로컬에서 먼저 테스트:
   ```bash
   npm run build
   ```

2. 에러 메시지 확인 후 수정

3. 다시 GitHub에 push:
   ```bash
   git add .
   git commit -m "Fix build error"
   git push
   ```

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] `package.json`에 build 스크립트 있음
- [ ] `index.html` 파일 있음
- [ ] `src/main.tsx` 파일 있음
- [ ] 로컬에서 `npm run build` 성공
- [ ] GitHub에 코드 업로드 완료
- [ ] Cloudflare Pages에서 빌드 성공

---

## 🎉 배포 완료 후

- 제공된 URL 확인: `https://your-project.pages.dev`
- 커스텀 도메인 연결 (선택사항)
- Google Analytics 추가 (선택사항)

---

## 💰 비용

**완전 무료!** (트래픽 무제한)

- Cloudflare Pages: 무료
- GitHub: 무료 (Public repository)
- SSL 인증서: 무료
