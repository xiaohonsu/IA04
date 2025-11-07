import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome</CardTitle>
          <CardDescription className="text-lg">
            User Registration System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            A complete registration system with NestJS backend and React frontend.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/signup">
              <Button className="w-full" size="lg">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
