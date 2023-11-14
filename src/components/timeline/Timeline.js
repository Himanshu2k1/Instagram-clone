/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import {Typography ,Card} from '@mui/joy';

import { useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import { fetchPosts } from '../../Slice/postsSlice';
import { fetchSuggestions} from '../../Slice/suggestionsSlice';

import PostComponent from './PostComponent';

export default function Timeline() {

  const logger=useSelector((state)=>state.user);
  const posts=useSelector((state)=>state.posts);
  const suggestions=useSelector((state)=>state.suggestions);
  const logger_followers=suggestions.users.filter(user=>user.email===logger.email)
  const dispatch=useDispatch();

  // const [posts, setPosts]=useState([]);
  console.log('check posts fetched',posts)

  useEffect(()=>{
    if(posts.status==='idle'){
      dispatch(fetchPosts())
    }
    dispatch(fetchSuggestions())
},[posts,dispatch])

// posts.map(post=>(
//   console.log(post.comments)
// ))

  return (
    <div className='timeline'>
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        m:'auto',
        width:'80%',
        height: '10',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        mb:1,
        backgroundColor:'Highlight'
      }}
    >
    <Typography textAlign={'center'} m='auto'>Your Feed</Typography>
    </Card>
    {posts.posts.map((post)=>(
      <PostComponent post={post} logger={logger} logger_followers={logger_followers}/>
    ))
  }</div>
  );
}
