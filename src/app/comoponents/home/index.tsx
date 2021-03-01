import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Route } from "react-router-dom";
import Message from "./messageContainer";

const Home: FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Route
        path={`${match.path}/:username`}
        render={(match) => <Message {...match} />}
      />
    </>
  );
};

export default Home;
