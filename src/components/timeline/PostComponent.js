import * as React from 'react';
import {AspectRatio, Avatar, Box, Card, CardContent, CardOverflow, Link, IconButton, Input, Typography} from '@mui/joy';

import MessageIcon from '@mui/icons-material/Message';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { liked, commented} from '../../Slice/postsSlice';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {followed, unfollowed } from '../../Slice/suggestionsSlice';
import { useDispatch} from 'react-redux';
import {useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';



function PostComponent({post , logger, logger_followers}) {
    const dispatch=useDispatch();
    const [newComment,setNewComment]=useState('');
    const isXsScreen = useMediaQuery('(max-width:600px)');
  return (
    <Card
      id={post.user}
      variant="outlined"
      sx={{
        width:'85%',
        m:'auto',
        mb:1,
        '--Card-radius': (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <Avatar
            size="sm"
            src={post.img}
          />
        </Box>
        <Typography fontWeight="lg" fontSize={ isXsScreen ? 13 : 18}>{post.user}</Typography>
        {logger_followers[0] && !logger_followers[0].following[0].following_list.includes(post.user) ? (
        <IconButton variant="plain" color='success' size="sm" sx={{ ml: 'auto' }} onClick={()=>dispatch(followed({userId:logger.email,email:post.user}))} title="Follow">
          <AddCircleOutlineIcon />
        </IconButton>
        ) :
        (
          <IconButton variant="plain" color='neutral' size="sm" sx={{ ml: 'auto' }} onClick={()=>dispatch(unfollowed({userId:logger.email,email:post.user}))} title="Unfollow">
          <RemoveCircleOutlineIcon />
          </IconButton>
        )
      }

      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src='https://source.unsplash.com/random?wallpapers' alt="" loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
        <Box sx={{display: 'flex' ,flexDirection:'row',alignItems:'center', gap: 0.5 }}>
        <IconButton variant="plain" color={post.likes.includes(logger.email)? 'danger':'neutral'} size="sm"
          onClick={() => dispatch(liked({ postId: post.id, email: logger.email }))}>
            {post.likes.includes(logger.email) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography>{post.likes.length} Likes</Typography>
        </Box>
      </CardContent>
      <CardContent>
        
        <Typography fontSize={ isXsScreen ? 13 : 18}>
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          >
          {post.user}
          </Link>{' '}
           {post.caption}
        </Typography>
      <Typography fontSize={ isXsScreen ? 12 : 16}>
        {post.comments.map(comment=>(
          <div>
          <Typography> 
            <Link
              component="button"
              color="neutral"
              fontWeight="lg"
              textColor="text.primary"
              mr={1}
            >
            {comment.id}
            </Link>   
            {comment.body}
          </Typography>
          </div>
        ))}
      </Typography>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        {/* <IconButton size="sm" variant="plain" sx={{ ml: -1 }}> */}
          <MessageIcon size={ isXsScreen ? "xs" : "lg"} />
        {/* </IconButton> */}
        <Input
          variant="plain"
          id={newComment}
          size="sm"
          value={newComment}
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
          onChange={(event)=>setNewComment(event.target.value)}
          onKeyDown={(event)=>{
            if(event.key === 'Enter' && newComment.trim() !== ''){
              dispatch(commented({ postId: post.id, email: logger.email, body:newComment}));
              setNewComment('')}
            }
          }
        />
        <Link underline="none" role="button" fontSize={ isXsScreen ? 14 : 18}
         onClick={() => {
          if (newComment.trim() !== ''){
            dispatch(commented({ postId: post.id, email: logger.email, body:newComment}));
            setNewComment('')}}
          }
         >
          Post
        </Link>
      </CardContent>
    </Card>
  )
}

export default PostComponent