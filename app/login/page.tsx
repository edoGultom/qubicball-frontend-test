"use client";

import { FormField } from "@/components/form/FormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginFormData, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const {
    register: formField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        reset();
        router.push("/dashboard");
        router.refresh();
      } else {
        setApiError(result.message || "Login gagal");
      }
    } catch (err) {
      console.error(err);
      setApiError("Terjadi kesalahan. Silakan coba lagi.");
    }
    // try {
    //   const response = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   const data = await response.json();

    //   if (data.success) {
    //     router.push("/dashboard");
    //     router.refresh();
    //   } else {
    //     setError(data.message || "Login failed");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setError("An error occurred. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-4">
            {apiError && (
              <Alert variant="destructive">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <FormField
                label="Username"
                type="text"
                placeholder="testuser"
                registration={formField("username")}
                error={errors.username}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <FormField
                label="Password"
                type="password"
                placeholder="testpass"
                registration={formField("password")}
                error={errors.password}
                disabled={isSubmitting}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Demo:</p>
              <p>
                Username:{" "}
                <span className="font-mono font-semibold">testuser</span>
              </p>
              <p>
                Password:{" "}
                <span className="font-mono font-semibold">testpass</span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
