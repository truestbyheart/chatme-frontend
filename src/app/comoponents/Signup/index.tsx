import React, { FC, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { signUpPending, signUpSuccess, signUpFailure } from "./signup.slice";
import {  userSignUp } from "../../../helper/rest.api";

const SignUp: FC<RouteComponentProps> = ({ history }) =>  {
  // redux setup
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.signup);

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // send creds to server
  const sendAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpPending());
    console.log({ username, password });
    try {
      const result = await userSignUp({ username, password, email });
      console.log(result);
      dispatch(signUpSuccess());
      history.push('/home')
    } catch (error) {
      let e = error.response.data.message || error.message;
      dispatch(signUpFailure(e));
    }
  };

  return (
    <div className="container">
      <div className="center">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="card login-card">
          <div className="card-header">
            <h2>ChatMe</h2>
          </div>
          <form onSubmit={(e) => sendAuth(e)}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={isLoading}
              >
                SignUp
              </button>
            </div>
            <div className="form-group">
              <div className="text-center mb-2">
                <Link to="/">Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
