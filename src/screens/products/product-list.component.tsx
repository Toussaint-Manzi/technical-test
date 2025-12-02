import React, { useState } from "react";
import { Stack } from "@/src/layout/container.layout";
import { Product, ProductInput } from "@/src/types";
import ProductItem from "./product-item.component";

interface ProductListProps {
  products: Product[];
  onUpdate: (id: string, input: Partial<ProductInput>) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (orderedIds: string[]) => Promise<void>;
}

export default function ProductList({
  products,
  onUpdate,
  onDelete,
  onReorder,
}: ProductListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = products.findIndex((p) => p.id === draggedId);
    const targetIndex = products.findIndex((p) => p.id === targetId);

    if (draggedIndex === targetIndex) return;

    const newProducts = [...products];
    const [removed] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, removed);

    onReorder(newProducts.map((p) => p.id));
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <Stack gap="md">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isDragging={draggedId === product.id}
          onDragStart={() => handleDragStart(product.id)}
          onDragOver={(e) => handleDragOver(e, product.id)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </Stack>
  );
}
