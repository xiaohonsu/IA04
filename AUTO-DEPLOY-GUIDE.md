# 🚀 SCRIPT TỰ ĐỘNG DEPLOY

## BƯỚC 1: PUSH CODE LÊN GITHUB

### Yêu cầu:
- Đã có tài khoản GitHub
- Đã cài Git: https://git-scm.com/download/win

### Các bước:

#### 1. Tạo repository trên GitHub
1. Vào: https://github.com/new
2. Repository name: `user-registration-system`
3. Public/Private: Chọn Public
4. **KHÔNG** tick "Add README"
5. Click "Create repository"

#### 2. Chạy lệnh sau trong PowerShell

```powershell
# Di chuyển vào thư mục Source
cd "d:\Dai hoc\Nam 4\Web nâng cao\22127074_10\Source"

# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: User Registration System with NestJS and React"

# Thêm remote (THAY YOUR_USERNAME bằng GitHub username của bạn)
git remote add origin https://github.com/YOUR_USERNAME/user-registration-system.git

# Đổi branch thành main
git branch -M main

# Push lên GitHub
git push -u origin main
```

**Lưu ý**: 
- Nếu được hỏi username/password:
  - Username: GitHub username của bạn  
  - Password: **KHÔNG phải password**, mà là **Personal Access Token**

#### Tạo Personal Access Token:
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Note: `Deploy User Registration`
5. Expiration: 90 days (hoặc No expiration)
6. Select scopes: Chỉ cần tick `repo`
7. Generate token
8. **COPY TOKEN** và lưu lại (chỉ hiện 1 lần!)
9. Dùng token này làm password khi push

---

## BƯỚC 2: DEPLOY BACKEND LÊN RENDER

### 2.1. Đăng ký Render

1. Vào: https://dashboard.render.com/register
2. Click **"GitHub"** để đăng ký bằng GitHub
3. Authorize Render

### 2.2. Tạo Web Service

1. Dashboard → Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"** → **Next**
3. Connect your repository:
   - Nếu chưa thấy repo: Click **"Configure account"** → Chọn repository
   - Chọn `user-registration-system`
4. Click **"Connect"**

### 2.3. Cấu hình Service

```
Name: user-registration-backend
Region: Singapore
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run start:prod
Instance Type: Free
```

Click **"Advanced"** để thêm Environment Variables:

```
MONGODB_URI = mongodb+srv://vohoangduc:Vohoangduc123@ia03.utpcat1.mongodb.net/user-registration?retryWrites=true&w=majority&appName=IA03

PORT = 3000

FRONTEND_URL = https://temporary-url.vercel.app
```
(FRONTEND_URL sẽ cập nhật sau)

Click **"Create Web Service"**

### 2.4. Đợi Deploy

- Render sẽ tự động build (3-5 phút)
- Xem progress trong tab **"Logs"**
- Khi thấy `🚀 Application is running on...` → **THÀNH CÔNG!**

### 2.5. Lấy Backend URL

- Ở đầu page sẽ có URL: `https://user-registration-backend-xxxx.onrender.com`
- **COPY VÀ LƯU LẠI URL NÀY!**

---

## BƯỚC 3: DEPLOY FRONTEND LÊN VERCEL

### 3.1. Cài Vercel CLI

```powershell
npm install -g vercel
```

### 3.2. Login Vercel

```powershell
vercel login
```

- Chọn **"Continue with GitHub"**
- Browser sẽ mở → Authorize Vercel

### 3.3. Deploy Frontend

```powershell
# Di chuyển vào thư mục frontend
cd "d:\Dai hoc\Nam 4\Web nâng cao\22127074_10\Source\frontend"

# Deploy
vercel
```

Trả lời các câu hỏi:

```
? Set up and deploy? → Y
? Which scope? → Chọn account của bạn
? Link to existing project? → N
? What's your project's name? → user-registration-frontend
? In which directory is your code located? → ./ (Enter)
? Want to override the settings? → N
```

Vercel sẽ deploy và cho bạn một **Preview URL**

### 3.4. Deploy Production

```powershell
vercel --prod
```

### 3.5. Lấy Frontend URL

- Sau khi deploy xong sẽ có URL: `https://user-registration-frontend-xxxx.vercel.app`
- **COPY VÀ LƯU LẠI URL NÀY!**

### 3.6. Thêm Environment Variable

1. Vào: https://vercel.com/dashboard
2. Chọn project `user-registration-frontend`
3. Settings → Environment Variables
4. Add New:
   ```
   Name: VITE_API_URL
   Value: https://user-registration-backend-xxxx.onrender.com
   ```
   (Paste Backend URL từ bước 2.5)
5. Environments: Chọn **Production**, **Preview**, **Development**
6. Click **"Save"**

### 3.7. Redeploy với Environment Variables

```powershell
vercel --prod
```

---

## BƯỚC 4: CẬP NHẬT BACKEND CORS

1. Quay lại Render: https://dashboard.render.com
2. Chọn service `user-registration-backend`
3. Environment → Click **"Edit"** ở biến `FRONTEND_URL`
4. Cập nhật value thành Frontend URL từ Vercel:
   ```
   https://user-registration-frontend-xxxx.vercel.app
   ```
5. Click **"Save Changes"**
6. Render sẽ tự động redeploy backend

---

## ✅ BƯỚC 5: KIỂM TRA

### 5.1. Test Backend

Mở PowerShell:

```powershell
# Test API (thay YOUR_BACKEND_URL)
curl -X POST https://YOUR_BACKEND_URL.onrender.com/user/register `
  -H "Content-Type: application/json" `
  -d '{"email":"deploytest@example.com","password":"123456"}'
```

Nếu thấy response JSON → **Backend OK!**

### 5.2. Test Frontend

1. Mở browser: `https://YOUR_FRONTEND_URL.vercel.app`
2. Click **"Sign Up"**
3. Đăng ký: `test@deploy.com` / `123456`
4. Xem có redirect sang Dashboard không
5. Test nút đăng xuất

### 5.3. Test Full Flow

1. Sign Up → Dashboard → Logout → Login → Dashboard → Logout
2. Tất cả phải hoạt động

---

## 🎉 HOÀN TẤT!

### Thông tin để nộp bài:

```
Student ID: 22127074

Frontend URL: https://YOUR_FRONTEND_URL.vercel.app
Backend URL: https://YOUR_BACKEND_URL.onrender.com
GitHub Repo: https://github.com/YOUR_USERNAME/user-registration-system

Status: ✅ Deployed and working!
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

### Render Free Tier:
- Backend sẽ **sleep sau 15 phút** không dùng
- Lần đầu truy cập sau khi sleep mất **30-60 giây** để wake up
- Đây là bình thường!

### Auto Deploy:
- Mỗi khi push code lên GitHub:
  - Render tự động deploy backend
  - Vercel tự động deploy frontend

### Monitoring:
- Render: Dashboard → Logs
- Vercel: Dashboard → Deployments

---

Good luck! 🍀
