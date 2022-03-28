import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../../services/user/createUser";
import { connect } from "react-redux";
import * as actionCreators from "../../store/action_creators/actionCreators";

function Register(props) {
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState({});
  const [render, setRender] = useState(true);
  const navigate = useNavigate();
  const passwordLabel = useRef(null);
  const emailLabel = useRef(null);

  async function handleCreateAccount(e) {
    e.preventDefault();

    //validatingEmail
    if (
      !String(user.email)
        .toLowerCase()
        .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ) {
      emailLabel.current.innerText = "Enter Valid Email";
      emailLabel.current.className = "text-red-500";
    } else {
      emailLabel.current.innerText = "Email";
      emailLabel.current.className = "text-inherit";
      setRender(true);
    }

    // validatingPassword
    if (user.password !== password2) {
      passwordLabel.current.innerText = "Passwords dose not match";
      passwordLabel.current.className = "text-red-500";
      return;
    } else {
      passwordLabel.current.innerText = "Confirm Password";
      passwordLabel.current.className = "text-inherit";
      setRender(true);
    }

    //registeringUser
    const response = await createUser(user);

    if (response.data.createUser.success) {
      props.onRegister(response.data.createUser.token);
      navigate("/");
    } else {
      // if account already exists
      emailLabel.current.innerText = "Email Already Registered";
      emailLabel.current.className = "text-red-500";
      console.log(response.data.createUser.message);
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
      <div className="flex mt-10 mx-4 flex-col border border-slate-300 rounded shadow-md w-[440px] ">
        <h3 className="text-center p-2 mb-4 bg-background-darker">Register New Account</h3>
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-3  bg-background-lighter px-8 pb-8 ">
          <div>
            <label htmlFor="">First Name:</label>
            <input type="text" name="firstName" pattern="^[a-zA-Z]+$" onChange={handleTextChange} required />
          </div>
          <div>
            <label htmlFor="">Last Name:</label>
            <input type="text" name="lastName" pattern="^[a-zA-Z]+$" onChange={handleTextChange} required />
          </div>
          <div>
            <label htmlFor="" ref={emailLabel}>
              Email
            </label>
            <input type="email" name="email" className="" onChange={handleTextChange} required />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input type="password" name="password" onChange={handleTextChange} required />
          </div>

          <div>
            <label htmlFor="" ref={passwordLabel}>
              Confirm Password
            </label>
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
const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (token) => dispatch(actionCreators.login(token)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
