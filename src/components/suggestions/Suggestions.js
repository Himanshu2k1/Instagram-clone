import React, { useState } from 'react'
import "./Suggestions.css"

import {Card, Typography} from '@mui/joy';

import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import { fetchSuggestions} from '../../Slice/suggestionsSlice';
import { Input } from '@mui/material';
import SuggestionPost from './SuggestionPost';
// import Newpost from '../../pages/post/Newpost';

function Suggestions() {
  const logger=useSelector((state)=>state.user);

  const dispatch=useDispatch();
  const suggestions=useSelector((state)=>state.suggestions);
  const [find,setFind]=useState('');

  const logger_followers=suggestions.users.filter(user=>user.email===logger.email)
  // console.log("checking my logic ",logger_followers)
useEffect(()=>{
  dispatch(fetchSuggestions())
  console.log('suggestions from slice check :',suggestions,"logger is",logger)
},[dispatch])

  return (
    <>
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: '80%',
        height: '10',
        m:'auto',
        mb:1,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        backgroundColor:'Highlight'
      }}
    >
    <Typography textAlign={'left'}  m={'auto'}>You may follow.</Typography>
    <Input value={find} onChange={(event)=>(setFind(event.target.value))} placeholder='Search'></Input>
    </Card>


    {suggestions.users.filter(suggestion=>suggestion.email.toLowerCase().startsWith(find.toLowerCase())).map(suggestion=>(     
      (suggestion.email!==logger.email) && (logger_followers[0] ? !logger_followers[0].following[0].following_list.includes(suggestion.email):'') &&
      <SuggestionPost suggestion={suggestion}/>
  ))}

  {/* <Newpost /> */}
</>
)
}

export default Suggestions