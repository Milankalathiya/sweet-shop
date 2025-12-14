import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Shop from "@/pages/Shop";
import Auth from "@/pages/Auth";
import AdminPanel from "@/pages/AdminPanel";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ component: Component, adminOnly = false }: { component: React.ComponentType, adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Redirect to="/" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Landing} />

        <Route path="/shop">
          <ProtectedRoute component={Shop} />
        </Route>

        <Route path="/cart">
          <ProtectedRoute component={Cart} />
        </Route>

        <Route path="/orders">
          <ProtectedRoute component={Orders} />
        </Route>

        <Route path="/admin">
          <ProtectedRoute component={AdminPanel} adminOnly={true} />
        </Route>

        <Route path="/login" component={Auth} />
        <Route path="/register" component={Auth} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
