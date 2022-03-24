import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateUserLogin from "../../services/authentication/validateUserLogin";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleAccountLogin() {
    // check for email or password
    if (password.length <= 0 || email.length <= 0) return;

    const response = await validateUserLogin(email, password);

    if (response.data.validateUserLogin.success) {
      navigate("/");
    } else {
      alert(response.data.validateUserLogin.message);
    }
  }

  return (
    <div className="flex w-full  justify-center items-center align-middle">
      <div className=" flex m-20 flex-col gap-4  bg-background-light p-8 border border-grayout rounded shadow-md ">
        <div className="flex flex-col text-sm text-slate-500 text-center">
          <label htmlFor="">Email:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col text-sm text-slate-500 text-center">
          <label htmlFor="">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleAccountLogin} className="py-2 bg-accent-green text-white rounded-md">
          Login
        </button>
      </div>
    </div>
  );
}
