import React, { useEffect, useState } from "react";
import Model from "./Model";
import InputForm from "./inputForm";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'


const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  let token = localStorage.getItem("token")
  const [isLogin , setIsLogin] = useState(token ? false : true)
  let user=JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    setIsLogin(token ? false : true)
  },[token])


  const checkLogin = () => {
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else{
      setisOpen(true);
    }

  
  };

  return (
    <>
      <header>
         <img src={logo} alt="Description" style={{ width: '10rem', height: '2rem' }}  />
        <ul>
          <li> <NavLink to = '/'>Home</NavLink> </li>
          <li onClick={()=>isLogin && setisOpen(true)}> <NavLink to = {!isLogin ? '/myRecipe':"/"}>MyRecipe</NavLink></li>
          <li onClick={()=>isLogin && setisOpen(true)}> <NavLink to = {!isLogin ? '/favRecipe':"/"}>Favourites</NavLink> </li>
          <li onClick={checkLogin}><p className='login'>{ (isLogin)? "Login": "Logout" }{user?.email ? `(${user?.email})` : ""}</p></li>
        </ul>
      </header>
      {isOpen && (
        <Model onClose={() => setisOpen(false)}>
          <InputForm  setisOpen={()=>setisOpen(false)}/>
        </Model>
      )}
    </>
  );
};

export default Navbar;
