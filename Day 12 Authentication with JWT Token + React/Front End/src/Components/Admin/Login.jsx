import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  const loginUser = async () => {
    const loginData = { email, password };
    const response = await axios.get("http://localhost:1008/login", loginData)

    if(response.data.token){
      localStorage.setItem("Token", response.data.token);
    }
    toast.success("User Log In successfully");
    setTimeout(() => {
      navigate("/dashboard")
    }, 2500)

  }

  return (
    <div>
      <ToastContainer />

      <input type="text" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />

      <button onClick={loginUser}>Login</button>
    </div>
  )
}
