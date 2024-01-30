import { useState, memo } from 'react';
import { translateText } from '../utils/translateText.js';

// handles translate
// memoization prevents renders of messages that haven't changed
export const Message = memo(({ content, name }) => {
 
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
      <li className = "hover:bg-[#f1f6f9] pb-4" onClick={handleMessageClick}>
        <span className = "text-amber-500 block">{name} </span>
        <span style={{color:'black', cursor:'auto'}} >
        {content}
        </span>
  
        {isTranslatedMessageVisible && (
          <p className = " text-[#98a0a7]">
            {'|--'} {translatedMessage}
          </p>
        )}
  
      </li>
    );
  });