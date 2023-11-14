import React from 'react';
import { useParams } from 'react-router-dom';

import {Chip} from '@mui/joy';
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow} from '@mui/material';

import {Paper} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {removed, fetchSuggestions } from '../../../../Slice/suggestionsSlice';

function Followers({isXsScreen}) {
  const dispatch=useDispatch();

  const profiles=useSelector(state=>state.suggestions);
  const userId = useParams();
  const email = userId.userId.slice(1);
  const profile=profiles.users.filter(user=>user.email===email)
  // console.log("all users for profile",profile);
  // const [profile, setProfile] = useState([]);

  useEffect(() => {
    dispatch(fetchSuggestions())
  }, [dispatch]);
  // console.log('from profile page',profile)
  // console.log("posts fetched after updation",posts)

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
    <div style={{ margin: '10px 0' }}>
      {/* followers */}
        {profile.map((user)=>(
            <TableContainer component={Paper}>
            <Table sx={{width:'80%', margin:'auto'}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Followers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.followers[0].followers_list.map((follower)=>(
                  <TableRow
                    key={follower}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {follower}
                    </TableCell>
                    <TableCell align="right">
                    <Chip
                      variant="outlined"
                      color="primary"
                      size="sm"
                      startDecorator={<PersonRemoveIcon />}
                      sx={{ pointerEvents:'visibleFill' , alignSelf:'end', mr:3 ,"&:hover": {
                        backgroundColor: 'white',
                        color:'black'
                      }}}
                    onClick={()=>dispatch(removed({userId: email, email:follower}))}
                    >{isXsScreen ? "":"Remove"}</Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </div>
    </div>
  );
}
export default Followers;
