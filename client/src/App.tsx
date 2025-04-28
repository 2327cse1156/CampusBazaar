import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { ProductProvider } from "./context/ProductContext";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductPage";
import ProductDetailPage from './pages/ProductDetailPage';
import DashboardPage from './pages/DashboardPage';
import SellProductPage from './pages/SellProductPage';
import MessagesPage from "./pages/MessagePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProfileSetupPage from './pages/ProfileSetupPage';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl={"/"}>
      <Router>
        <AuthProvider>
          <ProductProvider>
            <ChatProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} /> 

                {/* Auth Routes */}
                 <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> 

                {/* Protected Routes */}
                 <Route
                  path="/profile-setup"
                  element={
                    <>
                      <SignedIn>
                        <ProfileSetupPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      <SignedIn>
                        <ProfilePage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <>
                      <SignedIn>
                        <DashboardPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/sell"
                  element={
                    <>
                      <SignedIn>
                        <SellProductPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <>
                      <SignedIn>
                        <MessagesPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
              </Routes>
            </ChatProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
    </ClerkProvider>
  );
}

export default App;
