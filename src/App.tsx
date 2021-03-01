import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./app/comoponents/home";
import Login from "./app/comoponents/login";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/home" render={(props) => <Home {...props} />}></Route>
    </Switch>
  );
}

export default App;
