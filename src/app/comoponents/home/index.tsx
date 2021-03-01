import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Message from "./messageContainer";

const Home: FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/:username`}
          render={(match) => <Message {...match} />}
        />
        <Route
          path={`/`}
          render={(match) => <Message {...match} />}
        />
      </Switch>
    </>
  );
};

export default Home;
