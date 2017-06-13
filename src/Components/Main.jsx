import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Flights from './Flights.jsx';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Flights}/>
    </Switch>
  </main>
)

export default Main;