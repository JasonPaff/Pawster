import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../../services/user/createUser";

export default function Register() {
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function handleCreateAccount(e) {
    e.preventDefault();

    // TODO: validation of email and password
    // REFACTOR: alert - modal or under field message
    if (user.password !== password2) {
      alert("not matching");
      return;
    }

    const response = await createUser(user);

    if (response.data.createUser.success) {
      navigate("/");
    } else {
      alert(response.data.createUser.message);
    }
  }

  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex w-full  justify-center items-center align-middle">
      <div className="flex mt-10 mx-4 flex-col border border-slate-300 rounded shadow-md w-[440px]">
        <h3 className="text-center p-2 mb-4 bg-background-darker">Register New Account</h3>
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-3  bg-background-lighter px-8 pb-8 ">
          <div>
            <label htmlFor="">First Name:</label>
            <input type="text" name="firstName" onChange={handleTextChange} required />
          </div>
          <div>
            <label htmlFor="">Last Name:</label>
            <input type="text" name="lastName" onChange={handleTextChange} required />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" name="email" onChange={handleTextChange} required />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input type="password" name="password" onChange={handleTextChange} required />
          </div>

          <div>
            <label htmlFor="">Confirm Password</label>
            <input type="password" onChange={(e) => setPassword2(e.target.value)} required />
          </div>
          <button type="submit" className=" py-2 bg-accent-green text-white rounded-md mt-4 mb-3">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
