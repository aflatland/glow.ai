import React, { useRef, useState, useEffect } from 'react';

const initialMessagesList = [
  { "role":"system", "content": "You are a friendly Norwegian who speaks A1 Norwegian. Your goal is to help the user improve their Norwegian and keep the conversation going. Repeat words already used in the chat as much as possible." },
  { "role": "assistant", "content":"Hei! Jeg er en vennlig AI-generert språklærer. Hva ønsker du å snakke om?" },
];

const username = 'User';
const botname = 'Moby';

function SpecialCharacters() {

  return(
    <div id = "special-characters-keyboard">
      <button className = "char-key">&#xE6;</button>
      <button className = "char-key">&#248;</button>
      <button className = "char-key">&#229;</button>
      <button className = "char-key">&#198;</button>
      <button className = "char-key">&#216;</button>
      <button className = "char-key">&#197;</button>
    </div>
  );
};

function Message({ content, name }) {
  return(
    <li className = "message">
      <span className = "message-sender">{name}</span> {content}
    </li>
  );
}

function Messages({ messages }) {
  const messagesEndRef = useRef(null); // reference val not needed for rendering

  // pin scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return(
    <ul className = "messages">

      {/* Each message contains a 'role'
          Handles 'user', 'system', and 'assistant' roles,
          assigning them to their proper names
      */}

      {messages.map((msg) => (
          msg.role!=="system" && <Message key = {msg.id} content = {msg.content} name = {msg.role === 'user' ? username: botname} />
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
    <div id = "messageBar">
      <form id = "messageBar-form" onSubmit = { handleSubmit }>
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
      <SpecialCharacters />
    </div>
  );
}

function CurrentRoomTitle({ name }){
  return(
    <h1 id = "room-title">{ name }</h1>
  );
  
}

function CurrentRoom() {

  const [chat, setChat] = useState(initialMessagesList);

  // JSON REQUEST TO BACKEND
  const sendMessage = async (message) => {

    // add message to chat
    const updatedChat = [...chat, { "role": "user", "content": message }];
    setChat(updatedChat);

    // get chatbot response from django server
    // message = user input from input field, set where return is
    const server_response = await fetch('http://localhost:8000/chatbot/', {
      method: 'POST', // sending data to server
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatsofar: updatedChat }), // can only send JSON
    });

    // django response is parsed as JSON, and is now a useful JavaScript object?
    const data = await server_response.json();

    // add resopnse to chat
    setChat([...updatedChat, { "role":"assistant", "content": data.reply }]);

  };

  // putting all components together
  return (
    <div id = "current-room">
      <CurrentRoomTitle name = {"Norsk Chat"} />
      <Messages messages = {chat} />
      <MessageBar onSendMessage = {sendMessage} />

    </div>
  );
}

export default function App() {
  return <CurrentRoom />;
}