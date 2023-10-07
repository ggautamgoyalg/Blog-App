import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import Loading from "./Loading";
import { useSelector } from "react-redux/es/hooks/useSelector";

function UserBlogs() {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/blog/user/${userId}`
        );
        setBlogs(res.data.blogs);
        console.log(res.data.blogs);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId]);
  return (
    <>
    {!isLoggedIn? <h1> please login to see your blogs </h1> :  <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {blogs.map((item, index) => (
            <div key={index}>
              <Blog
                title={item.title}
                description={item.description}
                imageURL={item.imageURL}
                userName={item.user.name}
                isUser={true}
                id={item._id}
              />
            </div>
          ))}
          {blogs.length === 0 && (
            <h1>you have not written any blog!! please write some</h1>
          )}
        </>
      )}
      </>}
    </>
  );
}

export default UserBlogs;
