import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    email:'',
    password:''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
        return{...state,
        email:action.payload.email,
        password:action.payload.password
        }
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, register} = userSlice.actions
export default userSlice.reducer