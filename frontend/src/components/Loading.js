import React from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";

function Loading() {

    const DisabledBackground = styled(Box)({
        width: "200vw",
        height: "200vh",
        position: "fixed",
        background: "#ccc",
        opacity: 0.5,
        zIndex: 1,
        margin : "-100vh"
      });
      

    const SkeletonLoading = () => (
        <Box sx={{ p: 1 }}>
          <Typography variant="h4" marginLeft = "20vw">
            <Skeleton  width="60vw"/>
          </Typography>
          <Grid container wrap="nowrap">
            {Array.from(new Array(1)).map((item, index) => (
                <>
              <Box key={index} sx={{ width: "25vw", marginRight: "20vw", marginLeft : "20vw" ,my: 2 }}>
                <Skeleton variant="rectangular" width={"60vw"} height={"60vh"} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
                
              </Box>
              <br/>
              </>
            ))}
          </Grid>
        </Box>
      );

    const CircularLoading = () => (
        <>
          <CircularProgress
            size={70}
            sx={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2
            }}
          />
          <DisabledBackground />
        </>
      );
      
  return (
   <>
   {/* {CircularLoading()} */}
   {SkeletonLoading()}
   </>
  )
}

export default Loading
