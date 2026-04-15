# Cloudflare Pages 배포 가이드 (상세 버전)

## 📋 사전 준비물
- [ ] GitHub 계정
- [ ] Cloudflare 계정 (무료)
- [ ] 작업한 코드 파일들

---

## 🔧 Step 1: 프로젝트를 GitHub에 업로드하기

### 1-1. GitHub에서 새 저장소(Repository) 만들기

1. GitHub(https://github.com)에 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository" 선택
3. 다음 정보 입력:
   - **Repository name**: `personal-recovery-landing` (원하는 이름)
   - **Description**: `개인회생 전문 랜딩페이지`
   - **Public** 또는 **Private** 선택 (둘 다 가능)
   - ⚠️ **"Initialize this repository with a README" 체크 해제!**
4. "Create repository" 버튼 클릭

### 1-2. 로컬 프로젝트를 Git으로 초기화

터미널(또는 명령 프롬프트)을 열고 프로젝트 폴더로 이동한 후:

```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋 생성
git commit -m "Initial commit: 개인회생 랜딩페이지"

# GitHub 저장소 연결 (아래 URL은 본인의 저장소 URL로 변경!)
git remote add origin https://github.com/본인계정명/personal-recovery-landing.git

# 메인 브랜치로 이름 변경
git branch -M main

# GitHub에 업로드
git push -u origin main
```

**💡 본인의 GitHub URL 찾는 방법:**
- GitHub 저장소 페이지에서 녹색 "Code" 버튼 클릭
- HTTPS 주소 복사
- 예: `https://github.com/yourname/personal-recovery-landing.git`

---

## ☁️ Step 2: Cloudflare Pages 설정

### 2-1. Cloudflare 계정 만들기

1. [Cloudflare](https://dash.cloudflare.com/sign-up) 접속
2. 이메일, 비밀번호 입력하여 가입
3. 이메일 인증 완료

### 2-2. Cloudflare Pages로 이동

1. Cloudflare 대시보드에 로그인
2. 좌측 메뉴에서 **"Workers & Pages"** 클릭
3. **"Create application"** 버튼 클릭
4. **"Pages"** 탭 선택
5. **"Connect to Git"** 클릭

### 2-3. GitHub 계정 연결

1. **"Connect GitHub"** 버튼 클릭
2. GitHub 로그인 화면이 나오면 로그인
3. Cloudflare에 권한 부여 (Authorize Cloudflare)
4. 저장소 접근 권한 설정:
   - **"All repositories"** (모든 저장소) 또는
   - **"Only select repositories"** (특정 저장소만) 선택
   - 특정 저장소 선택 시: `personal-recovery-landing` 선택
5. **"Install & Authorize"** 클릭

### 2-4. 프로젝트 선택 및 설정

1. 저장소 목록에서 **`personal-recovery-landing`** 선택
2. **"Begin setup"** 클릭
3. 다음 설정 입력:

```
Project name: personal-recovery-landing
Production branch: main
```

4. **Build settings** (빌드 설정):

```
Framework preset: Vite (자동 감지됨)

Build command: pnpm build
(또는 npm run build)

Build output directory: dist
```

5. **Environment variables** (환경 변수):
   - 현재는 필요 없음 (비워두기)

6. **"Save and Deploy"** 버튼 클릭!

---

## ⏱️ Step 3: 빌드 및 배포 대기

1. 배포가 시작됩니다 (보통 1~3분 소요)
2. 빌드 로그를 실시간으로 볼 수 있습니다
3. 성공하면 다음 메시지가 나타납니다:
   ```
   ✅ Success! Your site is live on:
   https://personal-recovery-landing.pages.dev
   ```

---

## 🎉 Step 4: 웹사이트 확인

1. 제공된 URL 클릭 (예: `https://personal-recovery-landing.pages.dev`)
2. 랜딩페이지가 정상적으로 표시되는지 확인!

---

## 🌐 Step 5: 커스텀 도메인 연결 (선택사항)

본인의 도메인(예: www.mysite.com)을 연결하려면:

### 5-1. 도메인 구매
- [가비아](https://www.gabia.com)
- [후이즈](https://www.whois.co.kr)
- [Namecheap](https://www.namecheap.com)

### 5-2. Cloudflare Pages에 도메인 추가

1. Cloudflare Pages 프로젝트 대시보드 접속
2. **"Custom domains"** 탭 클릭
3. **"Set up a custom domain"** 클릭
4. 도메인 입력 (예: `www.myrecovery.com`)
5. **"Continue"** 클릭

### 5-3. DNS 레코드 설정

Cloudflare가 제공하는 DNS 정보를 도메인 구매처에 입력:

**CNAME 레코드 추가:**
```
Type: CNAME
Name: www
Target: personal-recovery-landing.pages.dev
```

또는 

**A 레코드 추가 (루트 도메인용):**
```
Type: A
Name: @
IPv4: Cloudflare가 제공하는 IP
```

설정 후 **5분~48시간** 내에 도메인이 연결됩니다.

---

## 🔄 Step 6: 코드 수정 후 재배포 방법

### 코드를 수정한 후:

```bash
# 변경사항 확인
git status

# 변경된 파일 추가
git add .

# 커밋 메시지 작성
git commit -m "히어로 섹션 이미지 변경"

# GitHub에 푸시
git push
```

**자동으로 Cloudflare에서 재빌드 및 배포가 시작됩니다!** (1~3분 소요)

---

## 📊 배포 상태 확인

1. Cloudflare Pages 대시보드
2. 프로젝트 선택
3. **"Deployments"** 탭에서 배포 이력 확인

---

## ❓ 자주 발생하는 오류 해결

### 오류 1: `Command not found: pnpm`

**해결 방법:**
1. Cloudflare Pages 프로젝트 설정
2. **"Settings"** → **"Build & deployments"**
3. Build command를 다음으로 변경:
```bash
npm install -g pnpm && pnpm install && pnpm build
```

### 오류 2: `Build failed`

**해결 방법:**
1. 로컬에서 먼저 빌드 테스트:
```bash
pnpm install
pnpm build
```
2. 에러가 없으면 GitHub에 다시 푸시
3. 에러가 있으면 해당 에러 메시지 확인 후 수정

### 오류 3: 페이지가 비어있음

**해결 방법:**
1. Build output directory가 `dist`인지 확인
2. `index.html` 파일이 `dist/` 폴더에 생성되었는지 확인

---

## 💰 비용 확인

**무료 플랜 한도:**
- 빌드: 500회/월 (초과 시 $0.10/빌드)
- 대역폭: 무제한 ✅
- 저장공간: 무제한 ✅
- 사이트 수: 100개

대부분의 경우 **완전 무료**로 사용 가능합니다!

---

## 📞 도움이 필요하신가요?

- [Cloudflare Pages 공식 문서](https://developers.cloudflare.com/pages/)
- [Discord 커뮤니티](https://discord.gg/cloudflaredev)
