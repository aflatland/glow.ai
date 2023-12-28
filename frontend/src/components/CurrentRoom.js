import React, { useState, useEffect } from 'react';
import { fetchText, sendMessageToOpenAI } from './api'; // API interactions abstracted
//import MessageBar from './MessageBar';
//import Messages from './Messages';
//import CurrentRoomTitle from './CurrentRoomTitle';

const initialMessagesList = [
    {
        content: "Hello! I am a friendly AI-generated chatbot. What do you want to talk about?",
        name: "Chatbot",
    },
];


function CurrentRoom() {
    const[messages, setMessages] = useState(initialMessagesList);

    // get response from chatgpt
    useEffect(() => {
        fetch('http://localhost:8000/api/get-text/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: messages })
        })
            .then(response => response.json())
            .then(data => setMessages( messages.append({"role":"user", "content":data.text}) ))
            .catch(error => console.error('Error fetching text:', error));
    }, [messages]);


    return (
        <div id="current-room">
          <h1>Test</h1>
        </div>
    );

}

export default CurrentRoom;