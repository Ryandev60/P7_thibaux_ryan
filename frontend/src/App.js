import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Sign from './pages/Sign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connexion" exact element={<Sign/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
