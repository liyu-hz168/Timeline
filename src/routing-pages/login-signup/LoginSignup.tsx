import { useState } from "react";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import person_icon from "./assets/person.png";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="mx-auto w-full max-w-md scale-150 transform text-center">
        <div className="mb-5 text-4xl font-bold">{action}</div>
        <div className="mx-auto mb-12 mt-2 h-1 w-20 rounded bg-gray-500"></div>

        <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
          <div className="mb-2 flex items-center rounded border bg-white px-4 py-2 shadow">
            <img src={person_icon} alt="" className="mr-3 h-5 w-5" />
            <input
              type="text"
              placeholder="Name"
              className="flex-1 outline-none"
            />
          </div>
          <div className="mb-2 flex items-center rounded border bg-white px-4 py-2 shadow">
            <img src={email_icon} alt="" className="mr-3 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 outline-none"
            />
          </div>
          <div className="mb-10 flex items-center rounded border bg-white px-4 py-2 shadow">
            <img src={password_icon} alt="" className="mr-3 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setAction("Sign Up");
              navigate(`/timeline`);
            }}
            className={`mr-7 min-w-[123px] rounded-xl px-6 py-2 transition ${
              action == "Login"
                ? "bg-gray-200"
                : "min-w-[123px] rounded-xl bg-gray-500 px-6 py-2 text-white transition hover:bg-gray-700"
            }`}
          >
            Sign Up
          </button>
          {/* <button className="min-w-[123px] bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"> */}
          <button
            onClick={() => {
              setAction("Login");
              navigate(`/timeline`);
            }}
            className={`mr-7 min-w-[123px] rounded-xl px-6 py-2 transition ${
              action == "Sign Up"
                ? "bg-gray-200"
                : "min-w-[123px] rounded-xl bg-gray-500 px-6 py-2 text-white transition hover:bg-gray-700"
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
