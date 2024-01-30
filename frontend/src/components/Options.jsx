import React, { useState } from 'react';

export const Options = () => {
  const [toggle, setToggle] = useState(false);
  const item1 = toggle ? "greetings!":"hello";

  return (
    <div className = "h-[60px]  text-gray-800 flex gap-4 items-center pr-2">
        <p onClick={() => setToggle(!toggle)} className="hover:underline hover:cursor-pointer text-right">{ item1 }</p>
    </div>
  )
};
