import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../../index";
import appwriteService from "../../../appwrite/db_Service";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  return (
    <div>
      <Container>
        <div className="allpost-grid">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
