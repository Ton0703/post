import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import './App.scss';

import Header from './component/Header'
import Home from './views/home'
import Login from './views/login'
import Register from './views/register'
import Post from './views/post'

function App() {
  return (
    <Router>
       <div className='container'>
          <Header />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/post/:id' exact component={Post} />
            <Route path='/'  component={Home} />
          </Switch>
       </div>
    </Router>
  );
}

export default App;
