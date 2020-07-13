import React from 'react';
import Navigation from './components/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Recent from './components/Recent';
import Login from './components/Login';
import Alerts from './components/Alerts';
import setAuthToken from './utils/setAuthToken'
import ThoughtFormContainer from './components/ThoughtFormContainer'
import PrivateRoute from './components/PrivateRoute'
import RecentConnected from './components/RecentConnected';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className='container'>
        <Alerts/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recent" component={Recent} />
          <PrivateRoute exact path="/recentConnected" component={RecentConnected} />
          {/* <Route exact path="/register" component={Register} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/new" component={ThoughtFormContainer} />
        </Switch>
      </div>

    </BrowserRouter>

  );
}

export default App;
