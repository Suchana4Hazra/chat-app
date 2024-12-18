import React, { useState } from 'react'
import "./Join.css"
import logo from "../../images/chatLogo.png";
import { Link } from 'react-router-dom';
import { use } from 'react';

let user;

const sendUser = () =>{

  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
}
const Join = () => {

  const [name,setName] = useState("");
  return (
    <div className='JoinPage'>
      <div className="joinContainer">
        <img src={logo} alt='logo'></img>
        <h1>Welcome to CHAT-WORLD</h1>
        <input onChange={(e) => setName(e.target.value)} type='text' id='joinInput' placeholder='Enter Your Name' ></input>
        <Link onClick={(event) => !name ? event.preventDefault():null} to="/chat">
        <button className='joinBtn' onClick={sendUser}>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Join
export {user}
