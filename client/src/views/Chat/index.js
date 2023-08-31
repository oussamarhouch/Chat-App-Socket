import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState(localStorage.getItem("userId"));
  const [receiver, setReceiver] = useState("");
  const [friends, setFriends] = useState({});
  const api = "http://localhost:5000";

  useEffect(() => {
    fetchMessages();
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = (await axios.get(api + "/users")).data;
      const usernames = response.map((user) => ({
        id: user._id,
        username: user.username,
      }));
      const userId = localStorage.getItem("userId");
      const filteredUsernames = usernames.filter((user) => user.id !== userId);
      setFriends(filteredUsernames);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(api + "api/messages");
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }
    try {
      const response = await axios.post(api + "/api/messages", {
        text: newMessage,
        sender,
        receiver,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat">
      {/* <h1>Chat</h1>
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <strong>{message.sender}</strong>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message ..."
        />
        <button type="submit">Send</button>
      </form> */}

      <div className="friends">
        <ul>
          {friends.map((username) => (
            <li
              className="friendsList"
              onClick={() => {
                setReceiver(username.id);
              }}
              key={username.id}
            >
              {username.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="chatBox">
        <form className="login-form" onSubmit={handleSubmit}>
          {receiver === "" ? null : (
            <>
              <h3>Login Here</h3>
              <div className="messages">
                <ul>
                  <li className="message">dv</li>
                  <li className="message">dv</li>
                  <li className="message">dv</li>
                  <li className="message">dv</li>
                  <li className="message">dv</li>
                  <li className="message">dv</li>
                  <li className="message">dv</li>
                </ul>
              </div>
              <input
                type="text"
                placeholder="Enter Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                id="password"
              />
              <button className="buttonForm">Send</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Chat;
