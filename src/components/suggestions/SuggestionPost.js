import React from 'react'
import {AspectRatio, Card , Link, CardContent, Chip, Typography} from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { useSelector, useDispatch} from 'react-redux';
import {followed } from '../../Slice/suggestionsSlice';

function SuggestionPost({suggestion, isXsScreen}) {
  const logger=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: isXsScreen? '95%': '85%',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        m:'auto',
        mt: isXsScreen ? 1 : 0,
        mb:1
      }}
      id={suggestion.email}
    >
      <AspectRatio ratio="1" sx={{ minWidth: isXsScreen ? 60 : 80 }}>
        <img
          src={suggestion.img}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description" fontSize={ isXsScreen ? 14 : 16}>
          {suggestion.email}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1} fontSize={ isXsScreen ? 14 : 16}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
            fontSize={ isXsScreen ? 14 : 18}
          >
            {suggestion.fname} {suggestion.lname}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          startDecorator={<Add />}
          fontSize={ isXsScreen ? 14 : 18}
          sx={{ pointerEvents:'visibleFill' , alignSelf:'end', mr:3 ,"&:hover": {
            backgroundColor: 'white',
            color:'black'
          }}}
          onClick={()=>dispatch(followed({userId:logger.email,email:suggestion.email}))}
        >
        Follow
        </Chip>
      </CardContent>
    </Card>
  )
}

export default SuggestionPost