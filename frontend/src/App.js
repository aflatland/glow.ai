import React, { useRef, useState, useEffect } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

const initialMessagesList = [
  {content: "Hallo! Ich bin ein freundlicher, KI-generierter Chatbot. Worüber möchten Sie sprechen?", name: "Chatbot"},
];

function CurrentRoom() {
  const [messages, setMessages] = useState(initialMessagesList);

  const generateResponse = async (userMessage) => {
    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a friendly German. Continue the conversation in A1 German." },
          { role: "user", content: userMessage},
        ],
        model: "gpt-3.5-turbo",
      });

      return response.choices[0].message.content;
    } catch(error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't generate a response.";
    }
  };

  const handleSendMessage = async (userMessage) => {
    setMessages(messages.concat({ content: userMessage, name: 'User' }));
    const chatbotResponse = await generateResponse(userMessage);
    setMessages(prevMessages => prevMessages.concat({ content: chatbotResponse, name: 'Chatbot' }));
  };

  const [text, setText] = useState('');

      useEffect(() => {
        fetch('http://localhost:8000/api/get-text/')
            .then(response => response.json())
            .then(data => setText(data.text))
            .catch(error => console.error('Error fetching text:', error));
    }, []);



  return (
    <div id = "current-room">
      <h1>{text}</h1>
      <CurrentRoomTitle name = {"Welcome to Linglow"} />
      <Messages messages = {messages} />
      <MessageBar onSendMessage = {handleSendMessage} />

    </div>
  );
}


function Message( { content, name } ) {
  return(
    <li id = "message"><span id = "message-sender">{name}</span> {content}</li>
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

function SpecialCharacters() {

  return(
    <div id = "special-characters-keyboard">
      <button class = "char-key">&#xE6;</button>
      <button class = "char-key">&#248;</button>
      <button class = "char-key">&#229;</button>
      <button class = "char-key">&#198;</button>
      <button class = "char-key">&#216;</button>
      <button class = "char-key">&#197;</button>
    </div>
  );
};

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

export default function App() {
  return <CurrentRoom />;
}