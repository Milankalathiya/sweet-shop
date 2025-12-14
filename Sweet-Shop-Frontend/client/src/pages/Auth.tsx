import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Candy } from "lucide-react";

export default function Auth() {
  const [location, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(location === "/login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Sync state with URL
  if (location === "/login" && !isLogin) setIsLogin(true);
  if (location === "/register" && isLogin) setIsLogin(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password, email);
      }
      setLocation('/');
    } catch (error) {
      // Error handled in context toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md border-none shadow-xl bg-card/80 backdrop-blur-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary p-3 rounded-full w-fit">
            <Candy className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-display">{isLogin ? "Welcome Back" : "Join the Sweet Life"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Create an account to start ordering delicious treats"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                />
              </div>
            )}
            {isLogin && (
              <div className="text-xs text-muted-foreground mt-2">
                Tip: Use 'admin' to access admin features.
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setLocation(isLogin ? "/register" : "/login")}
              className="text-muted-foreground"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
