import react, { useState } from 'react'
import './App.css';
import Portfolio from './pages/Portfolio'
import Explore from './pages/Explore'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoutes from './pages/PrivateRoutes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CurrentUserProvider } from './components/CurrentUserContext'

function App() {

  return (
    <CurrentUserProvider >
        <Router>
          <PrivateRoutes path='/portfolio'>
            <Portfolio />
          </PrivateRoutes>
          <PrivateRoutes path='/explore'>
            <Explore />
          </PrivateRoutes>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Router>
    </CurrentUserProvider>

  );
}

export default App;
