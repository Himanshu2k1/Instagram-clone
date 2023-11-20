import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    email:'',
    password:'',
    validated:false
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
    },
    valid: (state) => {
      return{...state,
        validated:!state.validated
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, register, valid} = userSlice.actions
export default userSlice.reducer