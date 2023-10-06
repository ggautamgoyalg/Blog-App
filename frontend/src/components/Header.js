import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {authActions} from '../store/index'
function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log("isLoggedIn", isLoggedIn)
  const [value, setValue] = useState(null);

  return (
    <AppBar position="sticky" sx={{ background: "rgb(58, 157, 180)" }}>
      <Toolbar>
        <Typography variant="h4">BlogApp</Typography>
        <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to = "/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to = "/myBlogs" label="My Blogs" />
            <Tab LinkComponent={Link} to = "/blogs/add" label="Add Blogs" />
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
        { !isLoggedIn && <> <Button LinkComponent={Link} to = "/login"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Login
          </Button>
          <Button LinkComponent={Link} to = "/signup"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Signup
          </Button>
          </>}
         { isLoggedIn && <Button LinkComponent={Link} to = "/auth"
            onClick = {()=>dispatch(authActions.logout())}
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Logout
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
