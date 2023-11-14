import React from 'react';
import { useParams } from 'react-router-dom';

import {AspectRatio,Link, Card, CardContent, Chip, Typography} from '@mui/joy';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Button} from '@mui/material';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchPosts } from '../../Slice/postsSlice';
import { fetchSuggestions } from '../../Slice/suggestionsSlice';


import useMediaQuery from '@mui/material/useMediaQuery';
import PostComponent from './PostComponent';

function User() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const profiles=useSelector(state=>state.suggestions);
  const posts=useSelector((state)=>state.posts);

  const userId = useParams();
  const email = userId.userId.slice(1);
  const profile=profiles.users.filter(user=>user.email===email)
  const logger=useSelector((state)=>state.user);

  const isXsScreen = useMediaQuery('(max-width:600px)');
    // console.log("all users for profile",profile);
  // const [profile, setProfile] = useState([]);

  useEffect(() => {
    dispatch(fetchSuggestions())
    dispatch(fetchPosts())
  }, [dispatch]);
  // console.log('from profile page',profile)
  // console.log("posts fetched after updation",posts)

  return (
  //user header
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{ marginTop: '10px' , marginBottom:'40px'}}> 
        {profile.map((user) => (
          <Card
            key={user.id}
            variant="outlined"
            orientation="horizontal"
            sx={{
              width: '90%',
              margin: '0 auto', // Center the card horizontally
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
          >
            <AspectRatio ratio="1" objectFit="fill" sx={isXsScreen ? { minWidth:40, borderRadius:'50%'} : { width: 90, borderRadius:'50%'} }>
              <img src={user.img} loading="lazy" alt="" />
            </AspectRatio>
            
            <CardContent >
              <Typography level="title-lg" id="card-description" fontSize={ isXsScreen ? 14 : 18}>
                {user.email}
              </Typography>
              <Typography level="body-sm" aria-describedby="card-description" mb={1} fontSize={ isXsScreen ? 14 : 18}>
                <Link overlay underline="none" href="#interactive-card" sx={{ color: 'text.tertiary' }}>
                  {user.fname} {user.lname}
                </Link>
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row' }}> 
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{ pointerEvents: 'none', alignSelf: 'center', mr: 2 }}
                >
                  Followers: {user.followers[0].followers_list.length}
                </Chip>
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{ pointerEvents: 'none', alignSelf: 'center', mr: 2 }}
                >
                  Following: {user.following[0].following_list.length}
                </Chip>
              </div>
            </CardContent>
            <Button onClick={()=>navigate(`/newpost/:${email}`)}>  {isXsScreen ? "":"Add Post"} <AddPhotoAlternateIcon /> </Button>         
          </Card>
        ))}
        
      </div>

  {/* posts of user */}
    <div className='posts'>
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          m:'auto',
          width:'90%',
          height: '6',
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
          mb:1,
          backgroundColor:'Highlight'
        }}
      >
      <Typography textAlign={'center'} m='auto'>Your Posts</Typography>
      </Card>
      {posts.posts.map((post)=>(
        (post.user===logger.email) && 
        <PostComponent post={post} isXsScreen={isXsScreen} />
      ))}
    </div>
  </div>
  );
}

export default User;
