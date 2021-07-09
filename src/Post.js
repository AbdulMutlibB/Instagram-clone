import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Abdul Mutlib"
          src="/static/images/avatar/1.jpg"
        />
        <h2>{username} </h2>
      </div>
      <img
        className="post__image"
        src={imageUrl}
        alt=""
      />
      <h4 className="post__text">
        <strong>{username} :</strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
