import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:4000';

//asynchronous action to fetch posts from the server
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(`${baseURL}/posts`);
    return response.data;
  } catch (err) {
    throw err;
  }
});

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    posted: (state, action) => {
      const maxId = state.posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
        const newPost = {
            id: maxId+1,
            img: action.payload.img,
            caption: action.payload.Caption,
            user: action.payload.user,
            comments: [],
            likes: []
        };
       // Add the new post to the state
       axios.post(`${baseURL}/posts`, newPost)
        .then((response) => {
          state.posts.push(response.data); // Add the new post to the state
        })
        .catch((err) => {
        console.error('Error adding a new post:', err);
        });

    },
    liked: (state, action) => {
        const { postId, email } = action.payload;
        const post = state.posts.find(post => post.id === postId);
        if (post) {
            if (!post.likes.includes(email)) {
              post.likes.push(email);
              axios.put(`${baseURL}/posts/${post.id}`, post);
            }
            else {
              post.likes.pop(email);
              axios.put(`${baseURL}/posts/${post.id}`, post);
            }
            
        }
    },
    commented: (state, action) => {
        const { postId, email, body } = action.payload;
        const post = state.posts.find(post => post.id === postId);
    
        if (post) {
            post.comments.push({ id: email,body: body });
            axios.put(`${baseURL}/posts/${post.id}`, post);
        }
    },
    deleted: (state, action) => {
      const { postId } = action.payload;
      const postIndex=state.posts.findIndex(post=>post.id===postId);
      if(postIndex!==-1){
        state.posts.splice(postIndex,1);
        axios.delete(`${baseURL}/posts/${postId}`)
        .catch((err)=>{
          console.log("error:",err);
        });
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { posted, liked, commented, deleted } = postsSlice.actions;
export default postsSlice.reducer;
