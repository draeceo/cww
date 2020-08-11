import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import Home from './pages/Home';

const App = () => (
  <div>
    <ToastContainer />
    <Home />
  </div>
)

export default App;