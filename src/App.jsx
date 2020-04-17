import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'
import './App.scss';

import Header from './component/Header'
import Home from './views/home'
import Login from './views/login'
import Register from './views/register'

function App() {
  return (
    <Router>
       <div className='container'>
          <Header />
          <Route path='/'  component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
       </div>
    </Router>
  );
}

export default App;
