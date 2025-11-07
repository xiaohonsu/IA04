# ✅ CHECKLIST DEPLOY - THỰC HIỆN TỪNG BƯỚC

## 📋 CHUẨN BỊ

- [x] Git đã cài đặt ✅
- [x] Node.js đã cài đặt ✅
- [x] MongoDB Atlas đã setup ✅
- [x] Code đã chạy thành công trên local ✅
- [ ] Tài khoản GitHub
- [ ] Code đã push lên GitHub

---

## 🚀 BƯỚC 1: PUSH CODE LÊN GITHUB (15 phút)

### ✅ Cần làm:

1. **Tạo GitHub Account** (nếu chưa có):
   - Vào: https://github.com/signup
   - Đăng ký với email

2. **Tạo Repository mới**:
   - Vào: https://github.com/new
   - Name: `user-registration-system`
   - Public
   - Không tick "Add README"
   - Create repository

3. **Chạy lệnh git trong PowerShell**:

```powershell
# Di chuyển vào thư mục Source
cd "d:\Dai hoc\Nam 4\Web nâng cao\22127074_10\Source"

# Khởi tạo git
git init

# Config (thay YOUR_EMAIL và YOUR_NAME)
git config user.email "your.email@example.com"
git config user.name "Your Name"

# Add files
git add .

# Commit
git commit -m "Initial commit: User Registration System"

# Add remote (THAY YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/user-registration-system.git

# Push
git branch -M main
git push -u origin main
```

**Nếu bị hỏi username/password:**
- Username: GitHub username
- Password: Dùng Personal Access Token (xem hướng dẫn dưới)

### 📝 Tạo Personal Access Token:

1. GitHub → Click avatar → Settings
2. Scroll xuống → Developer settings
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Note: `Deploy Project`
6. Expiration: 90 days
7. Select scopes: Tick **repo** (tất cả sub-items)
8. Generate token
9. **COPY TOKEN** (chỉ hiện 1 lần!)
10. Dùng token này thay cho password

---

## 🚀 BƯỚC 2: DEPLOY BACKEND LÊN RENDER (20 phút)

### ✅ Cần làm:

1. **Đăng ký Render**:
   - Vào: https://dashboard.render.com/register
   - Chọn "GitHub" → Authorize

2. **Tạo Web Service**:
   - Dashboard → New + → Web Service
   - Build and deploy from Git → Next
   - Connect repository: `user-registration-system`

3. **Cấu hình**:
   ```
   Name: user-registration-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   Plan: Free
   ```

4. **Environment Variables** (Click Advanced):
   ```
   MONGODB_URI=mongodb+srv://vohoangduc:Vohoangduc123@ia03.utpcat1.mongodb.net/user-registration?retryWrites=true&w=majority&appName=IA03
   
   PORT=3000
   
   FRONTEND_URL=https://temp.vercel.app
   ```

5. **Create Web Service** → Đợi 3-5 phút

6. **Lấy Backend URL**:
   - Ví dụ: `https://user-registration-backend-abcd.onrender.com`
   - **LƯU LẠI!**

---

## 🚀 BƯỚC 3: DEPLOY FRONTEND LÊN VERCEL (15 phút)

### ✅ Cần làm:

1. **Cài Vercel CLI**:
```powershell
npm install -g vercel
```

2. **Login Vercel**:
```powershell
vercel login
```
- Chọn GitHub → Authorize

3. **Deploy**:
```powershell
cd "d:\Dai hoc\Nam 4\Web nâng cao\22127074_10\Source\frontend"
vercel
```

Trả lời:
```
Set up and deploy? Y
Which scope? [Chọn account của bạn]
Link to existing project? N
Project name? user-registration-frontend
Directory? ./
Override settings? N
```

4. **Deploy Production**:
```powershell
vercel --prod
```

5. **Lấy Frontend URL**:
   - Ví dụ: `https://user-registration-frontend-xyz.vercel.app`
   - **LƯU LẠI!**

6. **Thêm Environment Variable**:
   - Vào: https://vercel.com/dashboard
   - Chọn project → Settings → Environment Variables
   - Add:
     ```
     Name: VITE_API_URL
     Value: [BACKEND_URL từ bước 2]
     Environments: All
     ```
   - Save

7. **Redeploy**:
```powershell
vercel --prod
```

---

## 🚀 BƯỚC 4: CẬP NHẬT CORS (5 phút)

### ✅ Cần làm:

1. Vào Render: https://dashboard.render.com
2. Chọn `user-registration-backend`
3. Environment → Edit `FRONTEND_URL`
4. Đổi thành Frontend URL từ Vercel
5. Save Changes (sẽ auto redeploy)

---

## ✅ BƯỚC 5: TEST (10 phút)

### Test Backend:
```powershell
curl -X POST https://YOUR_BACKEND_URL.onrender.com/user/register `
  -H "Content-Type: application/json" `
  -d '{"email":"test@deploy.com","password":"123456"}'
```

### Test Frontend:
1. Mở: `https://YOUR_FRONTEND_URL.vercel.app`
2. Sign Up → Dashboard → Logout
3. Login → Dashboard → Logout

---

## 🎉 HOÀN THÀNH!

### Thông tin nộp bài:

```
Student ID: 22127074
Assignment: IA03 - User Registration System

Live Demo:
- Frontend: https://YOUR_FRONTEND_URL.vercel.app
- Backend API: https://YOUR_BACKEND_URL.onrender.com
- GitHub: https://github.com/YOUR_USERNAME/user-registration-system

Features:
✅ User Registration (POST /user/register)
✅ Email & Password Validation
✅ Duplicate Email Check
✅ Password Hashing (bcrypt)
✅ MongoDB Atlas Integration
✅ Login UI with validation
✅ Dashboard after login
✅ Logout functionality
✅ React Hook Form
✅ React Query (TanStack Query)
✅ Tailwind CSS
✅ Error Handling
✅ CORS Configuration
✅ Deployed on Render + Vercel

Tech Stack:
- Backend: NestJS, MongoDB, Mongoose, bcrypt
- Frontend: React, Vite, TypeScript, Tailwind CSS
- Database: MongoDB Atlas
- Hosting: Render (Backend), Vercel (Frontend)
```

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, xem các file:
- `AUTO-DEPLOY-GUIDE.md` - Hướng dẫn chi tiết
- `DEPLOYMENT-INSTRUCTIONS.md` - Hướng dẫn đầy đủ
- `README.md` - Tài liệu project

---

**Thời gian ước tính:** 60-75 phút
**Độ khó:** Medium
**Cost:** $0 (Hoàn toàn miễn phí!)

Good luck! 🍀
