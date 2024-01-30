import React from 'react';
import { Chat } from "../components/Chat.jsx";
import { Options } from "../components/Options.jsx";
import { ExitX } from "../components/ExitX.jsx";

function Correction() {

  return(
    <>
      <p className = "text-gray-800 m-5">Coming soon! Text Correction~~</p>
    </>
  );
}

export default function ChatRoom() {
  return (
    <div className = "relative flex flex-col h-screen text-base  bg-gradient-to-b from-green-200 to-blue-200 border-l">

    <ExitX />

      <div id ="turtle" className = "flex-grow flex flex-col overflow-hidden mx-28 mt-12  bg-white rounded-md">
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
        <Options />
        
      </div>

    </div>
  );
}