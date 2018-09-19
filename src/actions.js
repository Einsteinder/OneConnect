import axios from 'axios'

export function itemIsLoading(bool) {
    return {
        type: 'ITEM_IS_LOADING',
        isLoading: bool
    };
  }
  export const receiveUsers = users=>({
    type:'RECEIVE_USERS',
    users
  })

  export const searchUsers =(query) =>{
    
    return async (dispatch)=>{
        dispatch(itemIsLoading(true))

        let data = await axios.get(`http://${window.location.hostname}:8080/api/users/search/${query}`)
        
        dispatch(itemIsLoading(false))
        dispatch(receiveUsers(data.data))
      
 };
 }

  export const fetchUsers =() =>{
    
    return async (dispatch)=>{
        dispatch(itemIsLoading(true))

        let data = await axios.get(`http://${window.location.hostname}:8080/api/users`)
        
        dispatch(itemIsLoading(false))
        dispatch(receiveUsers(data.data))
      
 };
 }

