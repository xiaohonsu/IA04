# Script để chạy Backend
# Mở PowerShell và chạy: .\run-backend.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STARTING BACKEND SERVER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra file .env
if (!(Test-Path ".env")) {
    Write-Host "❌ ERROR: File .env không tồn tại!" -ForegroundColor Red
    Write-Host "Vui lòng tạo file .env và cấu hình MONGODB_URI" -ForegroundColor Yellow
    Write-Host "Xem hướng dẫn: MONGODB-ATLAS-SETUP.md" -ForegroundColor Yellow
    pause
    exit
}

# Kiểm tra node_modules
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Chưa cài đặt dependencies. Đang cài đặt..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Cài đặt thất bại!" -ForegroundColor Red
        pause
        exit
    }
    Write-Host "✅ Cài đặt thành công!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 Đang khởi động backend server..." -ForegroundColor Green
Write-Host "📡 Backend sẽ chạy tại: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 API Endpoint: http://localhost:3000/user/register" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Để dừng server, nhấn Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Chạy backend
npm run start:dev
