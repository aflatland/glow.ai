import { Message } from './Message.jsx';
import React, { useRef, useEffect, memo } from 'react';
import { username, botname } from '../constants/userSettings.js';

export const Messages = memo(({ messages }) => {

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
  