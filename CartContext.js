import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => {
        
        const existingBookIndex = prevCart.findIndex(item => item.id === book.id);
        if (existingBookIndex !== -1) {
          
          const updatedCart = [...prevCart];
          updatedCart[existingBookIndex].quantity += 1;
          return updatedCart;
        } else {
          
          return [...prevCart, { ...book, quantity: 1 }];
        }
      });
    };
  
    const removeFromCart = (bookId) => {
        setCart((prevCart) => {
          return prevCart.filter(item => item.id !== bookId);
        });
      };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
