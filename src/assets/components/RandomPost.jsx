import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/db_Service";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
function RandomPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          let random = Math.floor(Math.random() * posts.total);
          setPosts(posts.documents[random]);
          console.log(posts);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <>
      <div key={posts.$id} className="random-post-card">
        <Link to={`/posts/${posts.$id}`}>
          <div>
            <text className="sub-heading">Trending Artical</text>
            <img
              src={appwriteService.getFilePreview(posts.featuredImage)}
              alt={posts.title}
            />
            <div>
              <h2>{posts.title}</h2> {parse(String(posts.post))}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default RandomPost;
