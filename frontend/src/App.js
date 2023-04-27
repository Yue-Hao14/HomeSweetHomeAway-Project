// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSingleSpot from "./components/GetSingleSpot";
import CreateASpot from "./components/CreateASpot";
import ManageSpots from "./components/ManageSpots";
import EditSpot from "./components/EditSpot";
import GetTrips from "./components/Trips";
import EditTrip from "./components/Trips/EditTrip";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route exact path="/spots/new">
            <CreateASpot />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpots />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route path="/spots/:spotId">
            <GetSingleSpot />
          </Route>
          <Route path="/trips/:bookingId/edit">
            <EditTrip />
          </Route>
          <Route path="/trips">
            <GetTrips />
          </Route>
          <Route path="/">
            <div>Unable to retrieve spots. Please try again shortly.</div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
