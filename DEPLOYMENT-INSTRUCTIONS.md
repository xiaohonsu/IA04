# 🚀 HƯỚNG DẪN DEPLOY PROJECT

## 📋 TỔNG QUAN

Chúng ta sẽ deploy:
- **Backend (NestJS)** → **Render.com** (FREE)
- **Frontend (React)** → **Vercel.com** (FREE)
- **Database** → **MongoDB Atlas** (FREE) - ✅ Đã setup

---

## 🎯 BƯỚC 1: PUSH CODE LÊN GITHUB

### 1.1. Tạo GitHub Repository

1. Vào: https://github.com/new
2. Repository name: `user-registration-system`
3. Chọn **Public** (hoặc Private)
4. **KHÔNG** chọn "Add README" (vì đã có)
5. Click **"Create repository"**

### 1.2. Push code lên GitHub

Mở terminal tại thư mục **Source**:

```powershell
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: User Registration System"

# Thêm remote (thay YOUR_USERNAME bằng GitHub username của bạn)
git remote add origin https://github.com/YOUR_USERNAME/user-registration-system.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

**Lưu ý**: Nếu được hỏi đăng nhập GitHub, nhập username và Personal Access Token (không phải password).

### Tạo Personal Access Token (nếu cần):
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Chọn `repo` scope
3. Copy token và dùng làm password khi push

---

## 🎯 BƯỚC 2: DEPLOY BACKEND LÊN RENDER

### 2.1. Đăng ký Render

1. Vào: https://render.com/
2. Click **"Get Started for Free"**
3. Đăng nhập bằng **GitHub**
4. Authorize Render

### 2.2. Tạo Web Service cho Backend

1. Trong Render Dashboard, click **"New +"** → **"Web Service"**

2. **Connect Repository:**
   - Click **"Connect account"** (nếu cần)
   - Chọn repository `user-registration-system`
   - Click **"Connect"**

3. **Configure Service:**
   ```
   Name: user-registration-backend
   Region: Singapore (gần VN nhất)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   ```

4. **Select Plan:**
   - Chọn **"Free"** (0$/month)
   - Click **"Create Web Service"**

### 2.3. Thêm Environment Variables

Trong Render service vừa tạo:

1. Click tab **"Environment"**
2. Click **"Add Environment Variable"**
3. Thêm các biến sau:

```
Key: MONGODB_URI
Value: mongodb+srv://vohoangduc:Vohoangduc123@ia03.utpcat1.mongodb.net/user-registration?retryWrites=true&w=majority&appName=IA03

Key: PORT
Value: 3000

Key: FRONTEND_URL
Value: https://your-app.vercel.app (sẽ cập nhật sau khi deploy frontend)
```

4. Click **"Save Changes"**

### 2.4. Deploy

- Render sẽ tự động build và deploy
- Đợi 3-5 phút
- Khi thấy **"Live"** → Backend đã deploy thành công!

### 2.5. Lấy Backend URL

- URL sẽ có dạng: `https://user-registration-backend-xxxx.onrender.com`
- **LƯU LẠI URL NÀY** để dùng cho Frontend!

---

## 🎯 BƯỚC 3: DEPLOY FRONTEND LÊN VERCEL

### 3.1. Cài đặt Vercel CLI

```powershell
npm install -g vercel
```

### 3.2. Deploy bằng Vercel CLI

Mở terminal tại thư mục **frontend**:

```powershell
cd "d:\Dai hoc\Nam 4\Web nâng cao\22127074_10\Source\frontend"

# Login Vercel (sẽ mở browser)
vercel login

# Deploy
vercel
```

### 3.3. Trả lời các câu hỏi:

```
? Set up and deploy? [Y/n] Y
? Which scope? → Chọn account của bạn
? Link to existing project? [y/N] N
? What's your project's name? user-registration-frontend
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### 3.4. Deploy lên Production

```powershell
vercel --prod
```

### 3.5. Cấu hình Environment Variables

1. Vào: https://vercel.com/dashboard
2. Chọn project `user-registration-frontend`
3. Settings → Environment Variables
4. Thêm biến:
   ```
   Name: VITE_API_URL
   Value: https://user-registration-backend-xxxx.onrender.com
   ```
   (Thay bằng URL backend từ bước 2.5)
5. Click **"Save"**
6. Redeploy:
   ```powershell
   vercel --prod
   ```

### 3.6. Lấy Frontend URL

- URL sẽ có dạng: `https://user-registration-frontend-xxxx.vercel.app`
- Đây là URL cuối cùng của bạn!

---

## 🎯 BƯỚC 4: CẬP NHẬT CORS TRONG BACKEND

### 4.1. Quay lại Render

1. Vào Render Dashboard → Service `user-registration-backend`
2. Environment → Edit `FRONTEND_URL`
3. Cập nhật thành URL Frontend từ Vercel:
   ```
   FRONTEND_URL=https://user-registration-frontend-xxxx.vercel.app
   ```
4. Save Changes
5. Render sẽ tự động redeploy

---

## ✅ BƯỚC 5: KIỂM TRA DEPLOYMENT

### 5.1. Test Backend API

```powershell
curl -X POST https://user-registration-backend-xxxx.onrender.com/user/register `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"123456"}'
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {...}
}
```

### 5.2. Test Frontend

1. Mở: `https://user-registration-frontend-xxxx.vercel.app`
2. Click **"Sign Up"**
3. Đăng ký user mới
4. Kiểm tra:
   - ✅ Form validation hoạt động
   - ✅ API call thành công
   - ✅ Redirect sang Dashboard
   - ✅ Hiển thị "Xin chào, [email]"
   - ✅ Nút đăng xuất hoạt động

### 5.3. Kiểm tra Database

1. Vào MongoDB Atlas: https://cloud.mongodb.com
2. Database → Browse Collections
3. Collection: `users`
4. Xem user vừa đăng ký

---

## 🎉 HOÀN THÀNH!

### 📊 URLs của bạn:

```
✅ Frontend: https://user-registration-frontend-xxxx.vercel.app
✅ Backend: https://user-registration-backend-xxxx.onrender.com
✅ Database: MongoDB Atlas (Cloud)
```

---

## 🐛 TROUBLESHOOTING

### Lỗi 1: Render backend không start

**Kiểm tra:**
- Logs trong Render Dashboard
- Environment variables đã đúng chưa?
- MongoDB connection string có đúng?

**Giải pháp:**
- Vào Render → Logs → Xem lỗi
- Sửa environment variables
- Manual Deploy

### Lỗi 2: Frontend không gọi được Backend

**Kiểm tra:**
- `VITE_API_URL` trong Vercel đã đúng chưa?
- CORS trong backend đã cấu hình đúng `FRONTEND_URL`?

**Giải pháp:**
- Update `VITE_API_URL` trong Vercel
- Update `FRONTEND_URL` trong Render
- Redeploy cả 2

### Lỗi 3: CORS Error

**Giải pháp:**
- Đảm bảo `FRONTEND_URL` trong Render = Frontend URL từ Vercel
- Redeploy backend

### Lỗi 4: Render Free tier sleep

**Vấn đề:** Render free tier sẽ sleep sau 15 phút không hoạt động

**Giải pháp:**
- Lần đầu truy cập sẽ mất 30-60 giây để wake up
- Đây là bình thường với free tier

---

## 💡 TIPS

### Tự động deploy khi push code

**Render:**
- Tự động deploy khi push lên GitHub main branch
- Bật trong Settings → Build & Deploy

**Vercel:**
- Tự động deploy khi push lên GitHub
- Đã bật mặc định

### Custom Domain (Optional)

**Vercel:**
- Settings → Domains → Add domain
- Miễn phí với domain riêng

**Render:**
- Settings → Custom Domain
- Cần domain riêng

---

## 📝 SUBMISSION INFO

Khi nộp bài, cung cấp:

```
Student ID: 22127074
Project Name: User Registration System

Frontend URL: https://user-registration-frontend-xxxx.vercel.app
Backend URL: https://user-registration-backend-xxxx.onrender.com
GitHub Repository: https://github.com/YOUR_USERNAME/user-registration-system

Test Credentials:
- Email: test@example.com
- Password: 123456

Features:
✅ User Registration with validation
✅ Login (UI + localStorage)
✅ Dashboard after login
✅ Logout functionality
✅ MongoDB Atlas integration
✅ Error handling
✅ Responsive design
✅ Deployed on Render + Vercel
```

---

Good luck! 🚀
