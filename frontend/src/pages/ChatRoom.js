import React from 'react';
import { Chat } from "../components/Chat.jsx";
//import { Options } from "../components/Options.jsx";
import { ExitX } from "../components/ExitX.jsx";
import { defaultLanguage } from '../constants/userSettings.js' 


export default function ChatRoom() {
  return (
    <div className = "relative flex flex-col h-screen text-base  bg-gradient-to-b from-green-200 to-blue-200 border-l">

    <ExitX />

      <div id ="turtle" className = "flex-grow flex flex-col overflow-hidden mx-28 mt-12  bg-white rounded-md">
        <div className="flex-grow flex overflow-hidden">
          <div className = "flex-grow overflow-auto relative">
            <Chat />
          </div>

        </div>   
      </div>

      <div className = "h-[50px] mt-4 text-gray-800 flex-column text-right gap-4 pr-28 pb-2 ">
        {/*<Options />*/}
        <p>Speak to the chatbot in { localStorage.getItem('learnLanguage' || defaultLanguage) }. Click on a message to see the translation. Powered by GPT AI.</p>
        
      </div>
      

    </div>
  );
}