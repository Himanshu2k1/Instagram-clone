import React from 'react'
import {AspectRatio,Link, Card, CardContent, Typography,Avatar, Box, CardOverflow} from '@mui/joy';
import {Button} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch} from 'react-redux';
import { deleted } from '../../../../Slice/postsSlice';

function PostComponent({post,isXsScreen,profile}) {
    const dispatch=useDispatch();
    // console.log("                 ",profile);
  return (
    <Card
        variant="outlined"
        sx={{
          width:'80%',
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
            src={profile[0].img}
            sx={{ border: '2px solid', borderColor: 'background.body' }}
          />
        </Box>
        <Typography fontWeight="lg" fontSize={ isXsScreen ? 14 : 18}>{post.user}</Typography>
        <CardContent ><Button onClick={()=>dispatch(deleted({postId:post.id}))} sx={{alignSelf:'end',"&:hover": {
                    backgroundColor: 'white',
                    color:'black'
                  }}} title="delete post" > {isXsScreen? <DeleteForeverIcon /> : "Delete"} </Button></CardContent>        
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={post.img} alt="post" loading="lazy" style={{objectFit:'contain'}} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
    <Typography fontSize={ isXsScreen ? 14 : 18}> {post.likes.length} Likes </Typography>
        <Typography fontSize={ isXsScreen ? 14 : 18}>
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
      <Typography fontSize={ isXsScreen ? 14 : 18}>
      {post.comments.map(comment=>(
        <div>
        <Typography fontSize={ isXsScreen ? 14 : 18}> 
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
      </Card>
  )
}

export default PostComponent