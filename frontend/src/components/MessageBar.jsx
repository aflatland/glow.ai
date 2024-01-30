import React, { useState } from 'react';
import SpecialCharacters from "../components/SpecialCharacters.jsx";

export const MessageBar = ({ onSendMessage, characters }) => {
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
          <input className = "flex-grow p-3 bg-[#EBF3FA]"
            type = "text"  
            placeholder = 
            "Enter Message here..."
            autoComplete="off"
            value = {input}
            onChange ={(e) => setInput(e.target.value)}
            >
  
            </input>
            <button className="px-5  bg-[#D9E5EF]" type = "submit">Send</button>
        </form>
  
        <div >
            <SpecialCharacters characters = {characters} onClickCharacter = {typeSpecialCharacter} />
        </div>
        
      </>
    );
  }