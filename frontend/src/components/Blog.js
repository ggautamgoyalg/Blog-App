import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Blog = ({ title, description, imageURL, userName,isUser,id}) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isUser);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    try{
      console.log("trying to delete blog !!!", `http://localhost:3000/api/blog/delete/${id}`);
      const res = await axios
      .delete(`http://localhost:3000/api/blog/delete/${id}`)

      navigate("/add")
      navigate("/blogs");
      alert("delete successull");
      console.log(res);
      
    }
    catch(err)
    {
      console.log(err);
    }
        
    // const data = await res.data;
    // return data;
  };
  const handleDelete = () => {
    deleteRequest();
    
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isLoggedIn && isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
             
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Image Not Found"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
       
            variant="body2"
            color="text.secondary"
          >
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
