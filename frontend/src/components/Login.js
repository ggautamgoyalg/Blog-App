import { Button, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import {authActions} from '../store/index'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const rootUrl = "http://localhost:3000";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [inputs, setInputs] = useState({
    name : "",
    email : "",
    password : ""
  })
  const [isSignUp, setIsSignUp] = useState(false);

  const handelChange = (e) =>{
    const newInput = {...inputs, [e.target.name] : e.target.value}
    setInputs(newInput);
    //console.log(newInput);
  }

  const sendRequest = async ()=>{
    axios.post(`${rootUrl}/api/user/${isSignUp?"signup" : "login"}`, inputs)
    .then((res)=>{
        console.log("respone data is ",res);
        localStorage.setItem("userId", res.data.user._id);
        dispatch(authActions.login());
    })
    .then(()=>navigate("/blogs"))
    .catch((err)=>{
      console.log(err);
      return <>please enter valid email / password</>
      
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop= {5}
          borderRadius={5}
        maxWidth={400}
        >
          <Typography variant="h2" padding = {3} textAlign="center">{!isSignUp ? "Login" : "Signup"}</Typography>
          {isSignUp && <TextField name = "name" onChange = {handelChange} value = {inputs.name} placeholder = "Enter your name" margin = "normal"/>}
          <TextField type = {"email"} name = "email" onChange = {handelChange} value = {inputs.email} placeholder = "Enter your email" margin = "normal"/>
          <TextField type = {"password"} name = "password" onChange = {handelChange} value = {inputs.password} placeholder = "Enter your password" margin = "normal"/>
          <Button type = "submit" variant="contained" sx = {{borderRadius : 3, marginTop : 3}} color="warning"> Submit </Button>
          <Button sx = {{borderRadius : 3, marginTop : 3}} onClick = {()=>setIsSignUp(!isSignUp)}> {isSignUp ? "Change to Login" : "Change to Signup"} </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
