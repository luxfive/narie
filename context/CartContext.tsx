import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export type ProductVariant = 'standard' | 'gift';

interface CartItem {
  product: Product;
  quantity: number;
  variant: ProductVariant;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variant: ProductVariant) => void;
  updateQuantity: (productId: string, variant: ProductVariant, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, quantity: number = 1, variant: ProductVariant = 'standard') => {
    setItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id && item.variant === variant);
      if (existingItem) {
        return prev.map(item => 
          (item.product.id === product.id && item.variant === variant)
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity, variant }];
    });
  };

  const removeItem = (productId: string, variant: ProductVariant) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.variant === variant)));
  };

  const updateQuantity = (productId: string, variant: ProductVariant, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, variant);
      return;
    }
    setItems(prev => 
      prev.map(item => 
        (item.product.id === productId && item.variant === variant)
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      isOpen, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      toggleCart,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};