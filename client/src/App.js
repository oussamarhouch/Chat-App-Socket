import React from "react";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Friends from "./views/Friends";
import Chat from "./views/Chat";
import "./assets/css/App.css";

function App() {
  return (
    <div className="App">
      <SignUp />
      <SignIn />
      <Friends />
      <Chat />
    </div>
  );
}

export default App;
