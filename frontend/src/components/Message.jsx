import { useState, memo, useEffect, useRef } from 'react';
import { translateText } from '../utils/translateText.js';
import { sayHello } from '../utils/sayHello.js'
import { correctText } from '../utils/correctText.js'

// handles translate
// memoization prevents renders of messages that haven't changed
export const Message = memo(({ content, name }) => {
 
    // state controlling translation visibility
    const [isTranslatedMessageVisible, setIsTranslatedMessageVisible] = useState(false);
    
    // state for storing translated text
    const [translatedMessage, setTranslatedMessage] = useState(" . . .");
    
    // state for checking if text has been translated
    const [messageIsTranslated, setMessageIsTranslated] = useState(false);



    // state for storing corrected text
    const [correctedMessage, setCorrectedMessage] = useState(" . . .");

    const correctionMade = useRef(false);


    // handle message click event
    const handleMessageClick = async () => {
  
      // toggle visibility of translated message
      setIsTranslatedMessageVisible(prev => !prev);
  
      // each message is translated only once
      if(!messageIsTranslated) {
        try {
          console.log("Requesting translation...")
          const translated = await translateText(content);
          setTranslatedMessage(translated);
          setMessageIsTranslated(true);
        } catch (error) {
          console.error('Translation failed:', error);
        }
      }
    };

    const handleSayHello = async () => {
      try {
        sayHello(content);
      } catch (error) {
        console.error('Say Hello failed:', error);
      }
    }

    const handleCorrection = async () => {

      if (!correctionMade.current) {
        try {
          console.log("Requesting correction...")
          const correction = await correctText(content);
          setCorrectedMessage(correction);
          correctionMade.current = true;

        } catch (error) {
          console.error("Correcting text failed: ", error);
        }
      }

    }

    // correction created for every user message
    useEffect(() => {
      if (name === "User" && !correctionMade.current){
        handleCorrection();
      }
    }, []);

    const [correctionBubbleColor, setCorrectionBubbleColor] = useState("text-gray-500");

    useEffect(()=> {
      if (correctedMessage.correction_exists === true) {
        setCorrectionBubbleColor("text-red-400");
      } else if (correctedMessage.correction_exists === 'False') {
        setCorrectionBubbleColor("text-green-400");
      }
    }, [correctedMessage])
  
    
    // render message component
    return(
      <div className = "flex">

        {/* click to see correction */}

        {name === "User" ? (
          <>
              <p className = {"w-6 cursor-pointer " + correctionBubbleColor} >O</p>
          </>
            
        ): 
          (<p className = "w-6 cursor-pointer" ></p>)
        }



        {/* message and possibly the translated content */}
        <li className = "hover:bg-[#f1f6f9] pb-4" onClick={handleMessageClick}>
          <span className = "text-amber-500 block">{name} </span>
          <span style={{color:'black', cursor:'auto'}} >
          {content}
          </span>
    
          {/* translation appears when users click on message */}
          {isTranslatedMessageVisible && (
            <p className = " text-[#98a0a7]">
              {'|--'} {translatedMessage}
            </p>
          )}

          {/* correction appears when users click on circle */}
          {name === "User" && (
            <>
            <p className = " text-[#98a0a7]">
            {'|--Corrected Text: '} {correctedMessage.corrected_text}
            </p>
            <p className = " text-[#98a0a7]">
            {'|--Explanation: '} {correctedMessage.explanation}
            </p>
            </>
          )}

        </li>
      </div>
    );
  });