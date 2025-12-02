import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  PageLayout,
  Container,
  Spacer,
  Centered,
} from "@/src/layout/container.layout";
import { Card } from "@/src/layout/card.layout";
import { Text } from "@/src/layout/text.layout";
import { Input } from "@/src/layout/input.layout";
import { Button } from "@/src/layout/button.layout";
import { useToast } from "@/src/layout/toast.layout";
import { login } from "@/src/service/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    const result = await login(email);

    setLoading(false);

    if (result.success) {
      showToast("Welcome!", "success");
      router.push("/products");
    } else {
      setError(result.error || "Login failed");
      showToast(result.error || "Login failed", "error");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <PageLayout>
      <Container size="sm">
        <LoginContent
          email={email}
          onEmailChange={handleEmailChange}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          loading={loading}
          error={error}
        />
      </Container>
    </PageLayout>
  );
}

interface LoginContentProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
}

function LoginContent({
  email,
  onEmailChange,
  onSubmit,
  onKeyDown,
  loading,
  error,
}: LoginContentProps) {
  return (
    <Centered fullHeight padding="lg">
      <Card padding="lg" shadow="lg">
        <LoginHeader />
        <Spacer size="lg" />
        <LoginForm
          email={email}
          onEmailChange={onEmailChange}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
          loading={loading}
          error={error}
        />
      </Card>
    </Centered>
  );
}

function LoginHeader() {
  return (
    <>
      <Text variant="h1" align="center">
        Product List
      </Text>
      <Spacer size="sm" />
      <Text variant="body" color="muted" align="center">
        Enter your email to access your products
      </Text>
    </>
  );
}

interface LoginFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
}

function LoginForm({
  email,
  onEmailChange,
  onSubmit,
  onKeyDown,
  loading,
  error,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="email"
        value={email}
        onChange={onEmailChange}
        onKeyDown={onKeyDown}
        placeholder="you@example.com"
        label="Email address"
        error={error}
        autoFocus
      />
      <Spacer size="lg" />
      <Button type="submit" fullWidth loading={loading}>
        Continue
      </Button>
    </form>
  );
}
