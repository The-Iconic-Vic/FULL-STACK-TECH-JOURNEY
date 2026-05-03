import React, { createContext, useContext, useReducer, useMemo } from 'react'
import { cartReducer, initialState, CART_ACTIONS } from '../reducers/cartReducer'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const itemCount = state.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = useMemo(() => ({
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice
  }), [state])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}