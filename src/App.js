import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';

const App = () => (
  <div>
    <NavBar inverted />
    <Home />
  </div>
)

export default App;