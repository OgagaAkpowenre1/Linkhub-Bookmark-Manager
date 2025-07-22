import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { supabase } from "../auth/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const [error, setError] = useState(null);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Check for user-not-found or invalid credentials
      if (error.message.toLowerCase().includes("invalid login")) {
        setShowSignupPrompt(true);
      } else {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setShowSignupPrompt(false);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                    <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative text-center text-sm text-gray-500">
            <span className="px-2 bg-white relative z-10">OR</span>
            <div className="absolute left-0 top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2" />
          </div>

          <Button className="w-full" variant="outline" onClick={handleGoogleLogin}>
            Continue with Google
          </Button>
        </CardContent>
      </Card>

      {/* Signup Prompt Card */}
      {showSignupPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center text-lg">Account not found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center">Do you want to create a new account with this email?</p>
              <div className="flex justify-between gap-4">
                <Button onClick={handleSignup} className="w-full">
                  Yes, create
                </Button>
                <Button
                  onClick={() => setShowSignupPrompt(false)}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
