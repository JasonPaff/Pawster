import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../../services/user/createUser";

export default function Register() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleCreateAccount(e) {
    // TODO: validation of password strength and empty fields
    e.preventDefault();

    const response = await createUser(email, password);

    if (response.data.createUser.success) {
      navigate("/");
    } else {
      alert(response.data.createUser.message);
    }
  }

  return (
    <div className="flex w-full  justify-center items-center align-middle">
      <div className="flex mt-20 mx-4 flex-col border border-slate-300 rounded shadow-md w-[440px]">
        <h3 className="text-center p-2 mb-4 bg-background-darker">Register New Account</h3>
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-3  bg-background-lighter px-8 pb-8 ">
          <div>
            <label htmlFor="">Name:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="">Last Name:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="">Zip Code:</label>
            <input type="text" pattern="[0-9]*" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="">Confirm Password</label>
            <input type="password" onChange={(e) => setPassword2(e.target.value)} required />
          </div>
          <button type="submit" className=" py-2 bg-accent-green text-white rounded-md mt-4 mb-3">
            Create Account
          </button>
          <div></div>
        </form>
      </div>
    </div>
  );
}
