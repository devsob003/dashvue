import { useState } from 'react'; 
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from '@/components/flexBetween';


type Props = {};

const Navbar = (props: Props) => {
    const{palette} = useTheme();
  return (
    <FlexBetween 
    mb = "0.25rem" 
    p = "0.5rem 0rem"
     color={palette.grey[300]}>
      {/*leftside*/}
      <FlexBetween gap = "0.75rem">
        <LocalShippingIcon sx={{fontSize: "30px"}} style={{color: 'yellow'}}/>
        <Typography variant="h3" sx={{color: 'aqua', fontSize: "22px"}}>
          DASHVUE
        </Typography>
      </FlexBetween>
      {/*rightside*/}
      <FlexBetween gap = "2rem">
        <Box sx={{ "&:hover":{color: palette.primary[100]},  fontSize: "18px", color: 'blue'}}>
           <Link to = "/" >
              DASHBOARD
              </Link>
        </Box>
        <Box sx={{ "&:hover":{color: palette.primary[100]},  fontSize: "18px", color: 'blue'}}>
            <Link to = "/predictions">
              PREDICTIONS
            </Link>
        </Box>
      </FlexBetween>
       </FlexBetween>
  )
};

export default Navbar;
