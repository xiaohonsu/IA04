# Script để chạy Frontend
# Mở PowerShell và chạy: .\run-frontend.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STARTING FRONTEND SERVER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra file .env
if (!(Test-Path ".env")) {
    Write-Host "⚠️  WARNING: File .env không tồn tại!" -ForegroundColor Yellow
    Write-Host "Sẽ sử dụng giá trị mặc định: http://localhost:3000" -ForegroundColor Yellow
    Write-Host ""
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

Write-Host "🚀 Đang khởi động frontend server..." -ForegroundColor Green
Write-Host "🌐 Frontend sẽ chạy tại: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📱 Trình duyệt sẽ tự động mở" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Đảm bảo Backend đã chạy trước!" -ForegroundColor Yellow
Write-Host "⚠️  Để dừng server, nhấn Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Chạy frontend
npm run dev
