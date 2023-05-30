import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

//agr user dark mode prefer krta hai then dark theme pehle se hi dikhane ke 
//liye js check, ye code copy kia samaj matt faltu
const getInitialDarkMode=()=>{
  const prefersDarkMode=window.matchMedia('(prefers-color-schema:dark)'
  ).matches;
  // console.log(prefersDarkMode);
  const storedDarkMode = localStorage.getItem("darktheme")==='true';
  return storedDarkMode || prefersDarkMode;//agr kuch stored trhen wo return else check 
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme,setIsDarkTheme]=useState(getInitialDarkMode());
  const [searchTerm,setSearchTerm]=useState('cat');


  const toggleDarkTheme=()=>{
  const newDarkTheme=!isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  const body=document.querySelector('body');
  body.classList.toggle('dark-theme',newDarkTheme);
  // console.log(body);
  localStorage.setItem('darktheme',newDarkTheme);
  }
  
  useEffect(()=>{
    if(isDarkTheme)
    {
       document
         .querySelector("body")
         .classList.toggle("dark-theme", isDarkTheme);
    }
  },[])

  return (
    <AppContext.Provider value={{isDarkTheme, toggleDarkTheme ,searchTerm,setSearchTerm}}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext=()=>useContext(AppContext);
