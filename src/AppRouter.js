import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Info from './Components/Info';
import Contact from './Components/Contact';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/About" component={About} />
        <Route path="/Info" component={Info} />
        <Route path="/Contact" component={Contact} />
      </Switch>
    </Router>
  );
};

export default AppRouter;