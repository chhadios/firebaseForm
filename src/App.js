import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homemultiple from "./components/home_multiple";
import DetailsMultiple from "./components/detailsMultiple";
import Seller from "./components/seller";
const App =()=>(
  
  <BrowserRouter>
    <Switch>
      <Route path="/details/:id/:seller/:catagory" component={DetailsMultiple}/>
      <Route path="/seller" component={Seller}/>
      <Route path="/" component={Homemultiple}/>
    </Switch>
  </BrowserRouter>
)

export default App;
