import React, { useState } from "react";
import { UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const learnLanguages = [
    ["Norsk", "Norwegian"],
    ["Français","French"],
    ["Deutsch","German"],
    ["Italiana","Italian"],
    ["Magyar","Hungarian"],
];

const useLanguages = [
    ["English", "English"],
];

function Login() {
    return(
    <UserIcon className="absolute top-8 right-10 h-6 w-6 text-gray-600 cursor-pointer" />
    );
}

function DropDown(props) {

    return (
        <div className = "flex space-x-4">
            <h1 className = "w-20 p-4 bg-red-100 justify-left">{ props.label }</h1>
            <select defaultValue = {localStorage.getItem('learnLanguage')} id = {props.id} className = "w-32 p-4 bg-red-100 cursor-pointer" onChange={(e) => props.onSelectValue(e.target.value)}>
                {props.list.map((opt) => {
                    return(
                        <option value={opt[1]}>{opt[0]}</option>
                    ) 
                })}
            </select>
        </div>
    );
}

function Button(props) {

    const handleButtonClick = () => {
        localStorage.setItem('learnLanguage', props.selectedLanguage);
    }

    return(
        <Link to = "/chat">
            <button onClick = {handleButtonClick} className = "bg-red-300 mt-8 w-56 p-4">{props.label}</button>
        </Link>
    );
}
 
const Home = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('learnLanguage') || learnLanguages[0][1]);
    
    return (
        <div className = "flex flex-col justify-center items-center h-screen">
            <Login />
            <div className ="space-y-8">
            <DropDown label="Learn" id = "learn" list={learnLanguages} onSelectValue = {setSelectedLanguage} />
            <DropDown label="Using" id = "using" list = {useLanguages} />
            <Button label="Launch ChatRoom" selectedLanguage = {selectedLanguage} />
            </div>
        </div>
    );
};
 
export default Home;