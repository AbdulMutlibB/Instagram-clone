import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        console.log(authUser);
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("post")
      .orderBy("timestamp", "desc")
      .onSnapshot((Snapshot) => {
        setPosts(
          Snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setUsername("");
    setEmail("");
    setPassword("");
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((doc) => {
        db.collection("users").doc(doc.user.uid).set({
          Email: email,
          Password: password,
          UserId: doc.user.uid,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form class="app__signUp">
            <center>
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" onClick={signUp}>
              SignUp
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form class="app__signUp">
            <center>
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" onClick={signIn}>
              SignIn
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <Button variant="contained" onClick={() => auth.signOut()}>
            Log Out
          </Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
      

        {posts.map(({ id, post }) => {
          return (
            <Post
              key={id}
              user={user}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          );
        })}
      </div>

      <InstagramEmbed
        url="https://www.instagram.com/a.mutlib195/"
        clientAccessToken="123|456"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />


      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Please login for uploading image</h3>
      )}
    </div>
  );
}
export default App;
