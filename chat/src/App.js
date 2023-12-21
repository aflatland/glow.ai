import React, { useRef, useState, useEffect } from 'react';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

const initialMessagesList = [
  {content: "Hi! I am a friendly AI-generated chatbot. Whatcha wanna talk about?", name: "Chatbot"},
];

function Message( { content, name } ) {
  return(
    <li id = "message">{content} <span id = "message-sender">{name}</span></li>
  );
}

function Messages({ messages }) {
  const messagesEndRef = useRef(null); // reference val not needed for rendering

  useEffect(() => {
    // makes messageEndRef div scroll into view when messages (dependency) is updated
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return(
    <ul id = "messages">
      {messages.map((msg, index) => (
        <Message key = {index} content = {msg.content} name = {msg.name} />
      ))}

      <div ref = {messagesEndRef} />
    </ul>
  );
}

function MessageBar({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(input);
    setInput('');
  };

  return(
    <form id = "messageBar" onSubmit = {handleSubmit}>
      <input id = "messageBar-text"
        type = "text"  
        placeholder = 
        "Enter Message here..."
        autoComplete="off"
        value = {input}
        onChange ={(e) => setInput(e.target.value)}
        />
        <button id = "messageBar-send-button" type = "submit">Send</button>
    </form>
  );
}

function RoomName({name}){
  return(
    <p>{name}</p>
  );
}

function RoomsList({ rooms }){
  const rows = [];

  rooms.forEach((room) => {
    rows.push(
      <RoomName name = {room.name} />
    );
  });

  return(
    <ul>
      {rows}
    </ul>
  );
}

const ROOMS = [
  {name: "fun"},
  {name: "yoga"}
];

function CurrentRoomTitle({ name }){
  return(
    <h1 id = "room-title">{ name }</h1>
  );
  
}

function CurrentRoom() {
  const [messages, setMessages] = useState(initialMessagesList);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, { content: newMessage, name: 'User'}]);
  };

  return (
    <div id = "current-room">
      <CurrentRoomTitle name = {"Welcome to Chat Room"} />
      <Messages messages = {messages} />
      <MessageBar onSendMessage = {handleSendMessage} />

    </div>
  );
}

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

export default function App() {
  //main();
  return <CurrentRoom />;
}