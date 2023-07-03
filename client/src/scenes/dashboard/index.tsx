import { Box, useMediaQuery } from '@mui/material'; 
import Row1 from './row1';
import Row2 from './row2';



const gridTemplateLargeScreen = '" a b " "c c"';

const gridTemplateSmallScreen = '"a" "b" "c"';

const Dashboard = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box width="200%" height="100%" display="grid" gap="1.5rem"
    sx={
      isAboveMediumScreens ?{
      gridTemplateColumns :"repeat(3, minmax(370px, 1fr))",
      gridTemplateRows: "reapeat(10, minmax(60px, 1fr))",
      gridTemplateAreas: gridTemplateLargeScreen,
        } : {
          gridAutoColumns :"1fr",
          gridAutoRows: "80px",
          gridTemplateAreas: gridTemplateSmallScreen,
        }
      }>
      <Row1 />
      <Row2 />
      
     </Box>
     
  )
}

export default Dashboard