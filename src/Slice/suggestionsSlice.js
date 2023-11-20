import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000';

//asynchronous action to fetch posts from the server
export const fetchSuggestions = createAsyncThunk('users/fetchSuggestions', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`);
    return response.data;
  } catch (err) {
    throw err;
  }
});

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

export const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    followed: (state, action) => {
        const { userId, email } = action.payload;
        const user = state.users.find(user => user.id === userId);
        const targetUser = state.users.find(user => user.id === email); 
        if (user) {
            if (!user.following[0].following_list.includes(email)) {
              user.following[0].following_list.push(email);
              targetUser.followers[0].followers_list.push(userId);
              axios.put(`${baseURL}/users/${userId}`, user);
              axios.put(`${baseURL}/users/${email}`, targetUser);
            }
        }
    },
    unfollowed: (state,action)=>{
      const { userId, email } = action.payload;
        const user = state.users.find(user => user.id === userId);
        const targetUser = state.users.find(user => user.id === email); 
        if (user) {
            if (user.following[0].following_list.includes(email)) {
              const index=user.following[0].following_list.indexOf(email);
              user.following[0].following_list.splice(index,1)
              const index2=targetUser.followers[0].followers_list.indexOf(email);
              targetUser.followers[0].followers_list.splice(index2,1)
              axios.put(`${baseURL}/users/${userId}`, user);
              axios.put(`${baseURL}/users/${email}`, targetUser);
            }
        }        
    },
    removed: (state,action)=>{
      const { userId, email } = action.payload;
        const user = state.users.find(user => user.id === userId);
        const targetUser = state.users.find(user => user.id === email); 
        if (user) {
            if (user.followers[0].followers_list.includes(email)) {
              const index=user.followers[0].followers_list.indexOf(email);
              user.followers[0].followers_list.splice(index,1)
              const index2=targetUser.following[0].following_list.indexOf(email);
              targetUser.following[0].following_list.splice(index2,1)
              axios.put(`${baseURL}/users/${userId}`, user);
              axios.put(`${baseURL}/users/${email}`, targetUser);
            }
        }
    },
    updated: (state, action) => {
      const { id, email, fname, lname, bio } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      console.log("            ",userIndex);
      if (userIndex !== -1) {
        const updatedUser = { ...state.users[userIndex] };
        if (email) updatedUser.email = email;
        if (fname) updatedUser.fname = fname;
        if (lname) updatedUser.lname = lname;
        if (bio) updatedUser.bio = bio;
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = updatedUser;
        axios.put(`${baseURL}/users/${id}`, updatedUser);
        return {
          ...state,
          users: updatedUsers,
        }
      }
      return state;
      
    }
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.map((user) => ({
          ...user,
          followers: [
            {
              ...user.followers[0],
              followers_list: user.followers[0].followers_list.sort(),
            },
          ],
          following: [
            {
              ...user.following[0],
              following_list: user.following[0].following_list.sort(),
            },
          ],
        }));
        state.users = action.payload.sort((a, b) => a.id.localeCompare(b.id));
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { followed, unfollowed, removed, updated } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
