import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import Loading from "./Loading";

function Blogs() {
  // let blogs;
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blog");
        setBlogs(res.data.blogs);
        console.log(res.data.blogs);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {blogs.length > 0 &&
            blogs.map((item, index) => (
              <div key={index}>
                <Blog
                  title={item.title}
                  description={item.description}
                  imageURL={item.imageUrl}
                  userName={item.user.name}
                  isUser={localStorage.getItem("userId") === item.user._id}
                  id={item._id}
                />
              </div>
            ))}
          {blogs.length === 0 && <h1>no blogs found!! please write some</h1>}
        </>
      )}
    </>
  );
}

export default Blogs;
