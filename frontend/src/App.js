import React, { useRef, useState, useEffect, memo } from 'react';
import { translateText, botResponse } from './apiService';

const username = 'User';
const botname = 'Mogi';

const initialChatList = [
  { "role":"system", "content": "You are a friendly Norwegian who speaks A1 Norwegian. Your goal is to help the user improve their Norwegian and keep the conversation going. Repeat words already used in the chat as much as possible." },
  { "role": "assistant", "content":"Hei! Jeg er en vennlig AI-generert språklærer. Hva ønsker du å snakke om?" },
];

const characters = [
  "\u00E6", // Unicode for 'æ'
  "\u00F8", // Unicode for 'ø'
  "\u00E5", // Unicode for 'å'
  "\u00C6", // Unicode for 'Æ'
  "\u00D8", // Unicode for 'Ø'
  "\u00C5"  // Unicode for 'Å'
];

function SpecialCharacters({ onClickCharacter }) {

  return(
    <div className="flex gap-1 mt-1">
      {characters.map((c, index) => {
        return(
        <button 
        key = {index}
        onClick = {()=> onClickCharacter(c) } 
        className = "bg-gray-300 px-2 hover:bg-gray-400">
          {c}
          </button>
        )

      })}


    </div>
  );
};

// translate
// memoization preents renders of messages that haven't changed
const Message = memo(function Message({ content, name }) {
 
  // state controlling translation visibility
  const [isTranslatedMessageVisible, setIsTranslatedMessageVisible] = useState(false);
  
  // state for storing translated text
  const [translatedMessage, setTranslatedMessage] = useState(" . . .");
  
  // state for checking if text has been translated
  const [messageIsTranslated, setMessageIsTranslated] = useState(false);

  // handle message click event
  const handleMessageClick = async () => {

    // toggle visibility of translated message
    setIsTranslatedMessageVisible(prev => !prev);

    // each message is translated only once
    if(!messageIsTranslated) {
      try {
        const translated = await translateText(content);
        setTranslatedMessage(translated);
        setMessageIsTranslated(true);
      } catch (error) {
        console.error('Translation failed:', error);
      }
    }
  };


  // render message component
  return(
    <li className = "hover:bg-gray-100 pb-4" onClick={handleMessageClick}>
      <span className = "text-amber-500 block">{name} </span>
      <span style={{color:'black', cursor:'auto'}} >
      {content}
      </span>

      {isTranslatedMessageVisible && (
        <p className = " text-gray-500">
          {'|--'} {translatedMessage}
        </p>
      )}

    </li>
  );
});


const Messages = memo(function Messages({ messages }) {

  // references the end of the message list
  const messagesEndRef = useRef();
  
  // when the message list is updated, the "end ref"
  // reference scrolls into view
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // render message list
  return(
    <ul className = "">

      {messages.map((msg, index) => {
        if (msg.role !== "system") {
          // unique key for each message
          const key = index;
          return (
            <Message
              key = {key}
              content = {msg.content}
              name={msg.role === 'user' ? username: botname}
            />
          );
        }
          return null;
      })}

      {/* Reference div pins scroll to the bottom */}
      <div ref = {messagesEndRef} />
    </ul>
  );
});

function MessageBar({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(input);
    setInput('');

  };

  // handles special characters
  const typeSpecialCharacter = (character) => {
    setInput(input + character);
  }; 

  return(
    <>
      <form className = "relative flex w-full pr-3" onSubmit = { handleSubmit }>
        <input className = "flex-grow p-3 bg-gray-100"
          type = "text"  
          placeholder = 
          "Enter Message here..."
          autoComplete="off"
          value = {input}
          onChange ={(e) => setInput(e.target.value)}
          >

          </input>
          <button className="px-5  bg-gray-200" type = "submit">Send</button>
      </form>

      <div >
          <SpecialCharacters onClickCharacter = {typeSpecialCharacter} />
      </div>
      
    </>
  );
}

// bot response 
function Chat() {

  // state for storing chat
  const [chatList, setChatList] = useState(initialChatList);

  // handles message responses when user sends message
  const getBotResponse = async (message) => {

    // adds user's latest message to the list of chat messages
    const updatedChatList = [...chatList, { "role": "user", "content": message }];
    setChatList(updatedChatList);

    // updates chat with respones from bot
    try {
      const response = await botResponse(updatedChatList);
      setChatList([...updatedChatList, response]);
      
    } catch (error) {
      console.error('Response failed:', error); // handles errors
    }

  };


  // render room components
  return (
    <div className = "flex flex-col h-full p-3 pr-0">
      <div className = "flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
        <Messages messages = { chatList } />
      </div>

      <div className = "">
        <MessageBar onSendMessage = { getBotResponse } />
      </div>

      
    </div>
  );
}

function NavBar() {

  return (
    <>
        <p className="hover:underline hover:cursor-pointer">Navbar Content</p>
        <p className="hover:underline hover:cursor-pointer">Navbar Content2</p>
        <p className="hover:underline hover:cursor-pointer">Navbar Content3</p>
    </>
  )
}

function Correction() {

  return(
    <>
      <p className = "text-gray-800 m-5">Coming soon! Text Correction~~</p>
    </>
  );
}

export default function App() {
  return (
    <div className = "relative flex flex-col h-screen text-base  bg-gradient-to-b from-green-200 to-blue-200 border-l">
      
      <div id ="turtle" className = "flex-grow flex flex-col overflow-hidden mx-28 mt-12  bg-white rounded-sm">

        <div className="flex-grow flex overflow-hidden">
          <div className = "flex-grow overflow-auto relative">
            <Chat />
          </div>
          <div className = "w-100 bg-[#E7F6F6] rounded-sm">
          <Correction />
          </div>
        </div>

        
      </div>

      <div className = "h-[60px] text-gray-800 flex gap-4 justify-end items-center pr-28 pb-2">
        <NavBar />
      </div>

    </div>
  );
}