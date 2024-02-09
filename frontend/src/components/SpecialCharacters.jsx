import React from 'react';

const SpecialCharacters = ({ onClickCharacter, characters }) => {

    return(
      <div className="flex gap-1 mt-1">
        {characters.map((c, index) => {
          return(
          <button 
          key = {index}
          onClick = {()=> onClickCharacter(c) } 
          className = "bg-[#D9E5EF] px-2 hover:bg-[#c5cfd7]">
            {c}
            </button>
          )
  
        })}
  
  
      </div>
    );
  };

  export default SpecialCharacters;