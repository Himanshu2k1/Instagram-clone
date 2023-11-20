import React from 'react';
import { useParams } from 'react-router-dom';
import {Chip} from '@mui/joy';
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import {Paper} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unfollowed, fetchSuggestions } from '../../../../Slice/suggestionsSlice';

function Following({isXsScreen}) {
  const dispatch=useDispatch();

  const profiles=useSelector(state=>state.suggestions);
  const userId = useParams();
  const email = userId.userId.slice(1);
  const profile=profiles.users.filter(user=>user.email===email)

  useEffect(() => {
    dispatch(fetchSuggestions())
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
    <div style={{ margin: '10px 0' }}>
      {/* following */}
        {profile.map((user)=>(
          <TableContainer component={Paper}>
          <Table sx={{width:'80%', margin:'auto'}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Following</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.following[0].following_list.map((following)=>(
                <TableRow
                  key={following}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {following}
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
                  onClick={()=>dispatch(unfollowed({userId: email, email:following}))}
                  > {isXsScreen ? "":"Unfollow"} </Chip>
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
export default Following;
