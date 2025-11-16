import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { LogOut, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/AuthProvider';
import { getUserProfile } from '@/api/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();

  // Fetch user profile using React Query
  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
    enabled: auth.isAuthenticated, // Only fetch when authenticated
    retry: 1,
  });

  const handleLogout = () => {
    // Call auth logout which will clear tokens and server refresh token
    auth.logout().then(() => {
      navigate('/login');
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Loading profile...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-red-600 mb-4">Failed to load profile</p>
            <Button onClick={() => navigate('/login')}>Back to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              Xin chào, {userProfile.email}!
            </h2>
            <p className="text-green-600">
              Chào mừng bạn đến với hệ thống User Registration
            </p>
          </div>

          {/* Thông tin user */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">Email:</span>
              <span className="text-muted-foreground">{userProfile.email}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">User ID:</span>
              <span className="text-muted-foreground font-mono text-sm">{userProfile.id}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">Status:</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-medium text-secondary-foreground">Account Created:</span>
              <span className="text-muted-foreground">
                {new Date(userProfile.createdAt).toLocaleString('vi-VN')}
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
