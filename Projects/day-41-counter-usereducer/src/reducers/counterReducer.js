// Action types as constants
export const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
  SET_VALUE: 'set_value'
}

// Reducer function: (state, action) => newState
export function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 }
    
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 }
    
    case ACTIONS.RESET:
      return { count: 0 }
    
    case ACTIONS.SET_VALUE:
      return { count: action.payload }
    
    default:
      return state
  }
}