import React from "react";

import appwriteService from "../../appwrite/db_Service";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, post }) {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="card">
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
