"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-16">
        <Card className="w-full max-w-md text-center shadow-2xl shadow-primary/10 bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader className="items-center">
            <MailCheck className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="font-headline text-3xl">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to your email address. Please click the link to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Didn't receive an email? Check your spam folder or you can try signing up again. Once verified, you can log in.
            </p>
            <Button asChild>
              <Link href="/login">
                Go to Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
