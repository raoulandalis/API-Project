import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spot"
import SpotId from "./components/SpotId"
import CreateForm from "./components/SpotForm";
import SpotUser from "./components/SpotUser"
import SpotUpdateForm from "./components/SpotUpdateForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path="/">
          <Spots/>
        </Route>
        <Route path="/spots/new">
          <CreateForm/>
        </Route>
        <Route path="/spots/current">
          <SpotUser/>
        </Route>
        <Route path="/spots/:spotId/edit">
          <SpotUpdateForm />
        </Route>
        <Route path="/spots/:spotId">
          <SpotId/>
        </Route>
      </Switch>
      }
    </>
  );
}

export default App;
