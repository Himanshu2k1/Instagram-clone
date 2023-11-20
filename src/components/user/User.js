import React from 'react';
import {AspectRatio, Card, CardContent, Chip, Typography, CardActions} from '@mui/joy';
import Box from '@mui/material/Box';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Button,TextField} from '@mui/material';
import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../Slice/postsSlice';
import { fetchSuggestions, updated } from '../../Slice/suggestionsSlice';
import PostComponent from './usertop/components/PostComponent';
import { posted } from '../../Slice/postsSlice';
import { useMediaQuery } from '@mui/material';

import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'center',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function User() {
  const isXsScreen = useMediaQuery('(max-width:900px)');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const profiles=useSelector(state=>state.suggestions);
  const posts=useSelector((state)=>state.posts);
  const logger=useSelector((state)=>state.user);
  const email=logger.email;
  const profile=profiles.users.filter(user=>user.email===email)
  const [update,setUpdate]=useState(false);
  const [addingPost,setAddingPost]=useState(false);
  const [image,setImage]=useState();
  const [caption,setCaption]=useState('');
  useEffect(() => {
    dispatch(fetchSuggestions())
    dispatch(fetchPosts())
    console.log("api call made");
  }, [dispatch, posted]);

  const convert2base64 = (e) => {
    console.log(e.target.files[0]);
    const file=e.target.files[0];
    const reader=new FileReader();

    reader.onloadend=()=>{
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj={
        id:email,
        email:email,
        fname:data.get('firstName'),
        lname:data.get('lastName'),
        bio: data.get('bio')
    };
    console.log(obj);
    dispatch(updated(obj))
    setUpdate(false);
  };

  return ( 
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      {/* header */}

      {!update ?
      <div style={{ marginTop: '10px' , marginBottom:'40px'}}> 
        {profile.map((user) => (
          <Card
            key={user.id}
            variant="outlined"
            orientation="horizontal"
            sx={{
              width: '90%',
              margin: '0 auto', // Center the card horizontally
              display: 'flex',
              flexDirection:'column',
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
          >
            <CardContent sx={{display: 'flex', flexDirection:'row'}}>
              {/* image */}
              <AspectRatio ratio="1" objectFit="fill" sx={isXsScreen ? { minWidth:40, borderRadius:'50%'} : { width: 90, borderRadius:'50%'} }>
                <img src={user.img} loading="lazy" alt="profile_image" />
              </AspectRatio>

              {/* email */}
              <CardContent sx={{display: 'flex', flexDirection:'column'}}>
                <Typography level="title-lg" id="card-description" fontSize={ isXsScreen ? 14 : 18}>
                  {user.email}
                {/* name */}
                </Typography>
                <Typography>
                  {user.fname} {user.lname}
                </Typography>
                {!isXsScreen && <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', alignSelf: 'center' }}
                  >
                    Followers: {user.followers[0].followers_list.length}
                  </Chip>
                  <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', alignSelf: 'center'}}
                  >
                    Following: {user.following[0].following_list.length}
                  </Chip>
                </CardContent>
                }
              </CardContent>

              {/* add post */}
              <CardContent sx={{backgroundColor:'Highlight', padding:'.5rem', borderRadius:'1rem'}}>
              {!addingPost && <Button 
              // onClick={(e)=>navigate(`/newpost/:${email}`)}
              sx={{mb:'.5rem'}}
              onClick={()=>setAddingPost(!addingPost)}
              >{isXsScreen ? "":"Add Post"} <AddPhotoAlternateIcon /> </Button>
              }
              {addingPost && <Button 
              // onClick={(e)=>navigate(`/newpost/:${email}`)}
              sx={{mb:'.5rem'}}
              onClick={()=>{setCaption(''); setAddingPost(!addingPost)}}
              >Cancel</Button>
              }


              {addingPost && <Box component="form" noValidate sx={{ mt: isXsScreen ? 0 : 0 }}>
                <CardContent sx={{display:'flex', flexDirection: isXsScreen ?'column' : 'row', alignContent:'center'}}>
                  <CardContent xs={4} ls={4}>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ my:'auto'}}>
                    {isXsScreen ? '' : 'Upload Image'}
                    <VisuallyHiddenInput type="file" id="imageUploaded" onChange={(e)=>convert2base64(e)}/>
                      </Button>
                    </CardContent>
                      <CardContent xs={4} ls={4}>
                        <TextField
                          autoComplete="given-name"
                          name="caption"
                          required
                          fullWidth
                          id="caption"
                          label="Caption"
                          value={caption}

                          autoFocus
                          onChange={(event)=>setCaption(event.target.value)}
                        />
                      </CardContent>
                        <CardContent xs={4} ls={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my:'auto'}}
                            onClick={(e)=>{
                            e.preventDefault();
                            setAddingPost(false); 
                            dispatch(posted({
                            img:image,
                            Caption:caption,
                            user:logger.email
                                }))
                            setCaption('');
                                alert("post added");
                              }}>
                            POST
                          </Button>
                        </CardContent>
                      </CardContent>
                    </Box>}

              </CardContent>        
            </CardContent>
            {/* follower following for small screen*/}
            {isXsScreen && <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{ pointerEvents: 'none', alignSelf: 'center' }}
                >
                  Followers: {user.followers[0].followers_list.length}
                </Chip>
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{ pointerEvents: 'none', alignSelf: 'center'}}
                >
                  Following: {user.following[0].following_list.length}
                </Chip>
            </CardContent>
            }
            <CardContent sx={{ justifyContent: 'flex-start'}}>
            <Typography sx={{ whiteSpace: 'pre-line'}}> {user.bio}</Typography>
              <CardActions sx={{display:'inline-block'}}>
                  <Button size="small" sx={{ display:'inline-block' ,textAlign: 'start', '&:hover':{backgroundColor:'Highlight'}}} onClick={()=>setUpdate(true)}>Update Profile</Button>
              </CardActions>
            </CardContent>
          </Card>
        ))} 
      </div>

      : 

      <div style={{ marginTop: '10px' , marginBottom:'40px'}}> 
        {profile.map((user) => (
          <Box component="form" noValidate onSubmit={handleSubmit}>
          <Card
            key={user.id}
            variant="outlined"
            orientation="horizontal"
            sx={{
              width: '90%',
              margin: '0 auto', // Center the card horizontally
              display: 'flex',
              flexDirection:'column',
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
          >
            <CardContent sx={{display: 'flex', flexDirection:'row'}}>
              {/* image */}
              <AspectRatio ratio="1" objectFit="fill" sx={{ width: 90, borderRadius:'50%'} }>
                <img src={user.img} loading="lazy" alt="" />
              </AspectRatio>

              {/* email */}
              <CardContent sx={{display: 'flex', flexDirection:'column'}}>
              <Typography level="title-lg" id="card-description" fontSize={ isXsScreen ? 14 : 17}>
                  {user.email}
                {/* name */}
                </Typography>
                <div style={{display:'flex', flexDirection:'row'}}>
                <TextField sx={{marginRight:'10px'}} variant='standard' id="fname" label="update fname" placeholder={user.fname} name="fname" fontSize={ isXsScreen ? 12 : 16}>
                </TextField>
                <TextField variant='standard' id="lname" label="update lname" placeholder={user.lname} name="lname" fontSize={ isXsScreen ? 12 : 16}>
                </TextField>
                </div>
              </CardContent>
            </CardContent>
            <CardContent sx={{ justifyContent: 'flex-start' }}>
            <TextField variant='standard' multiline row={3} id="bio" label="update bio" placeholder={user.bio} name="bio" fontSize={ isXsScreen ? 14 : 18}></TextField>
              <CardActions sx={{display:'flex', flexDirection:'row'}}>
                  <Button size="small" sx={{ display:'inline-block' ,textAlign: 'start', '&:hover':{backgroundColor:'Highlight'}}} type='submit' >Update</Button>
                  <Button size="small" sx={{ display:'inline-block' ,textAlign: 'start', '&:hover':{backgroundColor:'Highlight'}}} onClick={()=>setUpdate(false)}>Cancel</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
        ))} 
      </div>
      }
      
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
          <PostComponent post={post} isXsScreen={isXsScreen} profile={profile}/>
        ))}
      </div>
    </div>
  );
}

export default User;
