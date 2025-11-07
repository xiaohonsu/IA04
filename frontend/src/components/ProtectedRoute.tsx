import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Nếu chưa đăng nhập, redirect về trang login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
