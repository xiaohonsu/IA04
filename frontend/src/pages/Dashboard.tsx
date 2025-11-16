import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/AuthProvider';

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();

  // Lấy thông tin user từ localStorage (đã lưu khi login)
  const userEmail = localStorage.getItem('userEmail') || 'User';

  const handleLogout = () => {
    // Call auth logout which will clear tokens and server refresh token
    auth.logout().then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl">Welcome!</CardTitle>
          <CardDescription className="text-lg">
            You have successfully logged in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Thông báo chào mừng */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Xin chào, {userEmail}!
            </h2>
            <p className="text-green-600">
              Chào mừng bạn đến với hệ thống User Registration
            </p>
          </div>

          {/* Thông tin user */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">Email:</span>
              <span className="text-muted-foreground">{userEmail}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">Status:</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">Login Time:</span>
              <span className="text-muted-foreground">
                {new Date().toLocaleString('vi-VN')}
              </span>
            </div>
          </div>

          {/* Nút đăng xuất */}
          <div className="pt-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Đăng xuất
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
