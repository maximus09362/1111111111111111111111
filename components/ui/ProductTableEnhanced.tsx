"use client"

import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
}

interface ProductTableProps {
  products: Product[]
  onPriceChange: (id: number, newPrice: number) => void
}

export function ProductTable({ products, onPriceChange }: ProductTableProps) {
  // Guardamos el ID del producto que está en edición
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<number | null>(null);

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setTempPrice(product.price);
  };

  const savePrice = (
\
