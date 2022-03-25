import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateUserLogin from "../../services/authentication/validateUserLogin";
import { connect } from 'react-redux'
import * as actionCreators from '../../store/action_creators/actionCreators'

function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleAccountLogin(e) {
    e.preventDefault();
    // check for email or password
    if (password.length <= 0 || email.length <= 0) return;

    const response = await validateUserLogin(email, password);

    if (response.data.validateUserLogin.success) {
      props.onLogin(response.data.validateUserLogin.token)
      navigate("/");
      console.log(response.data.validateUserLogin)
    } else {
      alert(response.data.validateUserLogin.message);
    }
  }

  return (
    <div className="flex w-full  justify-center items-center align-middle">
      <div className="flex mt-20 mx-4 flex-col border border-slate-300 rounded shadow-md w-[440px]">
        <h3 className="text-center p-2 mb-4 bg-background-darker">Existing Account</h3>
        <form onSubmit={handleAccountLogin} className="flex flex-col gap-3  bg-background-lighter px-8 pb-8 ">
          <div>
            <label htmlFor="">Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex flex-col text-xs text-slate-600 text-center">
            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className=" py-2 mt-4 mb-3 bg-accent-green text-white rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token) => dispatch(actionCreators.login(token))
  }
}

export default connect(null, mapDispatchToProps)(Login);