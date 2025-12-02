import React from "react";

interface CardProps {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
}

export function Card({ children, padding = "md", shadow = "md" }: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 ${paddingStyles[padding]} ${shadowStyles[shadow]}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className="border-b border-gray-200 pb-4 mb-4">{children}</div>;
}

interface CardBodyProps {
  children: React.ReactNode;
}

export function CardBody({ children }: CardBodyProps) {
  return <div>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className="border-t border-gray-200 pt-4 mt-4">{children}</div>;
}

interface DraggableCardProps {
  children: React.ReactNode;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
}

export function DraggableCard({
  children,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDragEnd,
}: DraggableCardProps) {
  const opacityStyles = isDragging ? "opacity-50" : "";

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-xl border border-gray-200 p-6 shadow-md transition-opacity duration-200 cursor-grab active:cursor-grabbing ${opacityStyles}`}
    >
      {children}
    </div>
  );
}
