import React, { useState, useEffect } from 'react';
import { getBotResponse } from '../utils/getBotResponse.js';
import { languageData } from "../constants/languageData.js";
import { Messages } from "../components/Messages.jsx";
import { defaultLanguage } from "../constants/userSettings.js";
import { MessageBar } from "../components/MessageBar.jsx";

// bot response 
export const Chat = () => {

    // state for storing chat
    const [chatList, setChatList] = useState([]);
    const [specialCharacters, setSpecialCharacters] = useState(languageData["Norwegian"].specialCharacters);
      
    // function to initialize chat lsit accroding to language
    const initializeChatList = (lang) => [
      { "role":"system", "content": "You are a friendly " + lang + " speaker who speaks A1 " + lang +". Your goal is to help the user improve their " + lang +  " and keep the conversation going. Repeat words already used in the chat as much as possible." },
      { "role": "assistant", "content": languageData[lang].prompt },
    ];
  
  
    useEffect(() => {
  
      const initialLanguage = localStorage.getItem('learnLanguage' || defaultLanguage);
      setChatList(initializeChatList(initialLanguage));
      setSpecialCharacters(languageData[initialLanguage].specialCharacters);
  
      // listen for changes to local storage, indicating language has changed
      const handleStorageChange = (event) => {
        if (event.key === 'learnLanguage') {
          const newLanguage = event.newValue || defaultLanguage;
          setChatList(initializeChatList(newLanguage));
          setSpecialCharacters(languageData[newLanguage].specialCharacters);
        } 
      };
  
      // when local storage changes, sets new learning language if changed
      window.addEventListener('storage', handleStorageChange);
  
      // clean up event listener
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
  
    }, []);
  
  
  
  
    // handles message responses when user sends message
    const handleBotResponse = async (message) => {
  
      // adds user's latest message to the list of chat messages
      const updatedChatList = [...chatList, { "role": "user", "content": message }];
      setChatList(updatedChatList);
  
      // updates chat with respones from bot
      try {
        const response = await getBotResponse(updatedChatList);
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
          <MessageBar onSendMessage = { handleBotResponse } characters = {specialCharacters} />
        </div>
        
      </div>
    );
  }
  