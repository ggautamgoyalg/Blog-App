
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React,{useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

function AddBlog() {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title : "",
    description : "",
    image : ""
  })
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const handleChange = (e) =>{
    const newInput = {...inputs, [e.target.name] : e.target.value};
    setInputs(newInput)
  }
  const sendRequest = async () => {
    const user = localStorage.getItem("userId");
    console.log(user);
    try{
      const res = await axios.post(`${baseUrl}/api/blog/add`, {title : inputs.title, description : inputs.description, imageUrl : inputs.image, user})
      alert("blog added succesfully");

      setInputs({title : "", description : "", image : ""});
        console.log(res);
    }
    catch(err){
          console.log(err);
      }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest();
  }
  return (
    <div>
      {
        !isLoggedIn ? <h1> please login to add blogs !!</h1> :  <>
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
               
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel   sx={labelStyles}>
              Title
            </InputLabel>
            <TextField
               
              name="title"
             onChange={handleChange}
             value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel   sx={labelStyles}>
              Description
            </InputLabel>
            <TextField
               
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
            />
            <InputLabel   sx={labelStyles}>
              ImageURL
            </InputLabel>
            <TextField
               
              name="image"
             onChange={handleChange}
             value={inputs.image}
              margin="auto"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
        </>
      }
     
      
    </div>
  )
}

export default AddBlog
