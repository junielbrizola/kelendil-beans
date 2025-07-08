// src/components/cart/CartSummary.tsx
'use server';
import React from 'react';
import { fetchCartAction } from '@/actions/cart/fetchCart';
import CartItemRow from './CartItemRow';

interface CartSummaryProps {
  userId: string;
}

export default async function CartSummary({ userId }: CartSummaryProps) {
  const fd = new FormData();
  fd.append('userId', userId);
  const result = await fetchCartAction(fd);
  if (!result.success || !result.data) {
    return <p>Erro ao carregar o carrinho.</p>;
  }
  const { items, subtotal } = result.data;
  if (items.length === 0) {
    return <p>Seu carrinho está vazio.</p>;
  }
  return (
    <div>
      {items.map(item => (
        <CartItemRow key={item.variantId} item={item} userId={userId} />
      ))}
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <strong>Subtotal: R$ {subtotal.toFixed(2)}</strong>
      </div>
    </div>
  );
}
