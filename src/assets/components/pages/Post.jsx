import React, { useState, useEffect } from "react";
import { Button, Container } from "../../index";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../../appwrite/db_Service";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.user === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          console.log(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/all-posts");
      }
    });
  };

  return post ? (
    <div className="post-page">
      <Container>
        <div className="poster">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
                <Button> Edit</Button>
              </Link>
              <Button onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div>
          <h1>{post.title}</h1>
        </div>
        <div>{parse(post.post)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
