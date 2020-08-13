import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';

const App = () => (
  <div style={{ backgroundColor: '##fff'}}>
    <ToastContainer />
    <Home />
  </div>
)

export default App;