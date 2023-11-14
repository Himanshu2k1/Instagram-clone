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
        if (user) {
            if (!user.following[0].following_list.includes(email)) {
              user.following[0].following_list.push(email);
              axios.put(`${baseURL}/users/${userId}`, user);
            }
        }
    },
    unfollowed: (state,action)=>{
      const { userId, email } = action.payload;
        const user = state.users.find(user => user.id === userId);
        if (user) {
            if (user.following[0].following_list.includes(email)) {
              const index=user.following[0].following_list.indexOf(email);
              user.following[0].following_list.splice(index,1)
              axios.put(`${baseURL}/users/${userId}`, user);
            }
        }        
    },
    removed: (state,action)=>{
      const { userId, email } = action.payload;
        const user = state.users.find(user => user.id === userId);
        if (user) {
            if (user.followers[0].followers_list.includes(email)) {
              const index=user.following[0].following_list.indexOf(email);
              user.followers[0].followers_list.splice(index,1)
              axios.put(`${baseURL}/users/${userId}`, user);
            }
        }
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

export const { followed, unfollowed, removed } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
