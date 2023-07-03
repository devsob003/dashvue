import { Box, useMediaQuery } from "@mui/material";


const gridTemplateLargeScreen = '"a b""c d"';

const gridTemplateSmallScreen = '"a" "c"' ;

const Prediction = () => {

    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

    return(
        <Box width ="100%" height="100%" display = "grid" gap = "1.5rem">
            

        </Box>
    )
}

export default Prediction