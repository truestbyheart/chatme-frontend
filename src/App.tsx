import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./app/comoponents/home";
import Login from "./app/comoponents/login";
import SignUp from "./app/comoponents/Signup";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Login {...props}/>}></Route>
      <Route path="/home" render={(props) => <Home {...props} />}></Route>
      <Route path="/signup" render={(props) => <SignUp {...props} />}></Route>
    </Switch>
  );
}

export default App;
