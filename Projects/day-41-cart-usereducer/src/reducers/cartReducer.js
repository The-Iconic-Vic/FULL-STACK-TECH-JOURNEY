// Action types as constants
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
}

// Helper function to save to localStorage
const saveToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// Load initial state from localStorage
const loadInitialState = () => {
  const saved = localStorage.getItem('cart')
  return saved ? JSON.parse(saved) : []
}

// Reducer function: (state, action) => newState
export function cartReducer(state, action) {
  let newState

  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product } = action.payload
      const existingItem = state.find(item => item.id === product.id)
      
      if (existingItem) {
        newState = state.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newState = [...state, { ...product, quantity: 1 }]
      }
      saveToLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { id } = action.payload
      newState = state.filter(item => item.id !== id)
      saveToLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        newState = state.filter(item => item.id !== id)
      } else {
        newState = state.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      }
      saveToLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS.CLEAR_CART:
      saveToLocalStorage([])
      return []

    default:
      return state
  }
}

// Initial state
export const initialState = loadInitialState()