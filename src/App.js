import "./App.css";
import React, { useState } from "react";
import Post from "./Post";

function App() {
  const [post, setPost] = useState([
    {
      username: "Abdul Mutlib",
      caption: "WoW its working",
      imageUrl:
        "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=775&q=80",
    },
    {
      username: "Abdul Mutlib",
      caption: "WoW its working",
      imageUrl:
        "https://images.unsplash.com/photo-1492681290082-e932832941e6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG9wZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    },
    {
      username: "Abdul Mutlib",
      caption: "WoW its working",
      imageUrl:
        "https://www.wonderplugin.com/wp-content/uploads/2016/11/unsplash-dog5.jpeg",
    },
  ]);
  return (
    <div className="app">
      <div className="app_header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <h1>
        Looluptatem eum officia ab mollitia quaerat aspernatur libero pariatur
        eveniet. Dolor, modi! Ab?
      </h1>
      {
        post.map(post =>{
          return(
            <Post username ={post.username} caption={post.caption} imageUrl ={post.imageUrl} />
          )
        })
      }
    </div>
  );
}

export default App;
