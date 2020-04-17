import React from 'react';
import { BrowserRouter as Router , Route, Switch, Redirect } from 'react-router-dom'
import './App.scss';

import Header from './component/Header'
import Home from './views/home'
import Login from './views/login'
import Register from './views/register'
import Post from './views/post'
import AuthRoute from './utils/authRoute'

function App() {
  return (
    <Router>
       <div className='container'>
          <Header />
          <Switch>
            <AuthRoute path='/login' exact component={Login} />
            <AuthRoute path='/register' exact component={Register} />
            <Route path='/post/:id' exact component={Post} />
            <Route path='/home' exact render={() => <Redirect to='/' />} />
            <Route path='/'  component={Home} />
          </Switch>
       </div>
    </Router>
  );
}

export default App;
