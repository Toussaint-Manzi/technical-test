import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "label";
  color?: "primary" | "secondary" | "muted" | "error" | "success";
  align?: "left" | "center" | "right";
}

export function Text({
  children,
  variant = "body",
  color = "primary",
  align = "left",
}: TextProps) {
  const variantStyles = {
    h1: "text-3xl font-bold tracking-tight",
    h2: "text-2xl font-semibold tracking-tight",
    h3: "text-xl font-semibold",
    body: "text-base",
    caption: "text-sm",
    label: "text-sm font-medium",
  };

  const colorStyles = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    muted: "text-gray-500",
    error: "text-red-600",
    success: "text-green-600",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Component =
    variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : "p";

  return (
    <Component
      className={`${variantStyles[variant]} ${colorStyles[color]} ${alignStyles[align]}`}
    >
      {children}
    </Component>
  );
}
