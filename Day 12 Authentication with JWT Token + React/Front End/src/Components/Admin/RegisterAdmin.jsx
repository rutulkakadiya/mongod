import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function RegisterUser() {

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const registerUser = async () => {

    const userData = { name, contact, email, password }
    const response = await axios.post("http://localhost:1008/register", userData)

    if (!name || !contact || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (response.data.msg === "User already exist please login") {
      toast.error("User already registered");
    } else if (response.data.msg === "User Registered") {
      toast.success("User register successfully");
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    }



  }

  return (
    <div className='flex justify-center h-[100vh] items-center'>
      <ToastContainer />
      <div className="form h-[60vh] flex justify-center items-center rounded-[15px] border w-[35%] p-[15px]">
        <div className="formData">
          <p className='text-center text-3xl font-semibold'>Sign Up</p>
          <input type="text" className='w-[100%] border h-[40px] rounded-[5px] outline-none mt-[30px] ps-2' placeholder='Enter name' onChange={(e) => setName(e.target.value)} />
          
          <input type="text" className='w-[100%] border h-[40px] rounded-[5px] outline-none mt-[30px] ps-2' placeholder='Enter contact' onChange={(e) => setContact(e.target.value)} />
          <input type="text" className='w-[100%] border h-[40px] rounded-[5px] outline-none mt-[30px] ps-2' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
          <input type="text" className='w-[100%] border h-[40px] rounded-[5px] outline-none mt-[30px] ps-2' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />

          <center>
          <button className='px-[30px] py-[10px] rounded-[5px] mt-[30px] bg-green-700 text-white' onClick={registerUser}>Submit</button>
          </center>
        </div>
      </div>
    </div>
  )
}
