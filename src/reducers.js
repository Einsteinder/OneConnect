const initialState = {
    users : [],
    itemIsLoading:false
}

const data = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_USERS':
        return action.users
      default:
        return state
  
    }
  }
  
    
  
function itemIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEM_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export default function combineReducers(state = initialState, action) {
    return {
        users: data(state.users, action),
        itemIsLoading:itemIsLoading(state.itemIsLoading,action),
  
    }
  }