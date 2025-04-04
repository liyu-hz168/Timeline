import { useState } from "react";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import person_icon from "./assets/person.png";

function LoginSignup() {

  const [action, setAction] = useState("Login");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="transform scale-150 w-full max-w-md mx-auto text-center">
        <div className="text-4xl font-bold mb-5">{action}</div>
        <div className="w-20 h-1 bg-gray-500 rounded mt-2 mb-12 mx-auto"></div>

        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <div className="flex items-center border px-4 py-2 bg-white rounded shadow mb-2">
            <img src={person_icon} alt="" className="w-5 h-5 mr-3"/>
            <input type="text" placeholder="Name" className="flex-1 outline-none"/>
          </div>
          <div className="flex items-center border px-4 py-2 bg-white rounded shadow mb-2">
            <img src={email_icon} alt="" className="w-5 h-5 mr-3"/>
            <input type="email" placeholder="Email" className="flex-1 outline-none"/>
          </div>
          <div className="flex items-center border px-4 py-2 bg-white rounded shadow mb-10">
            <img src={password_icon} alt="" className="w-5 h-5 mr-3"/>
            <input type="password" placeholder="Password" className="flex-1 outline-none"/>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => setAction("Sign Up")}
            className={`min-w-[123px] px-6 py-2 rounded-xl transition mr-7 ${
              action == "Login" 
              ? "bg-gray-200"
              : "min-w-[123px] bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
            }`}
          >
            Sign Up
          </button>
          {/* <button className="min-w-[123px] bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"> */}
          <button 
            onClick={() => setAction("Login")}
            className={`min-w-[123px] px-6 py-2 rounded-xl transition mr-7 ${
              action == "Sign Up" 
              ? "bg-gray-200"
              : "min-w-[123px] bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
            }`}
          >
            Login
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup;