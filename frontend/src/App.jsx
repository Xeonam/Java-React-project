import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { DefaultNavbar, FruitTable } from './components';

function App() {
  

  return (
    <div>
      <DefaultNavbar></DefaultNavbar>
      <Routes>
        <Route path='/fruits' element={<FruitTable/>} />
      </Routes>

    </div>
  );
}

export default App;
