import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MicOutlined,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import "./Chat.css";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Chat(props) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, "rooms", roomId);
      let collectionRef = collection(db, "rooms", roomId, "messages");
      const RoomsRef = collection(db, "rooms");
      const messagesRef = collection(db, "messages");
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      onSnapshot(roomRef, (snapshot) => setRoomName(snapshot.data().name));
      onSnapshot(q, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [roomId]);
  useEffect(() => {
    // on click the profile avatar appears in chat.
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("typed", input);
    let collectionRef = collection(db, "rooms", roomId, "messages");
    addDoc(collectionRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${message.name === user.displayName &&
              "chat_receiver"}`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {/* {new Date(message.timestamp.toUTCString())} */}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
}

export default Chat;
