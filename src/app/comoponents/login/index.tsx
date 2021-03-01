import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'
import { loginPending, loginSuccess, loginFailure} from './login.slice'
import { userLogin } from "../../../helper/rest.api";
import Spinner from "../animations/spinner";

function Login() {
  // redux setup
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.login);

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // send creds to server
  const sendAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginPending());
    console.log({ username, password });
    try {
         const result = await userLogin({ username, password });
         console.log(result);
         if(result.status === 401) {
            dispatch(loginFailure(result.message));
         }
         dispatch(loginSuccess()); 
    } catch (error) {
      let e = error.response.data.message || error.message; 
      dispatch(loginFailure(e));
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
                {isLoading && <Spinner></Spinner>} Login
              </button>
            </div>
            <div className="form-group">
              <div className="text-center mb-2">
                <Link to="/signup">Create account</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
