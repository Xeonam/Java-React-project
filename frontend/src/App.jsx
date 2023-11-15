import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { DefaultNavbar, FruitTable, Hero, SupplierTable, AddFruit } from './components';

function App() {
  

  return (
    <div>
      <DefaultNavbar></DefaultNavbar>
      <Routes>
        <Route path='' element={<Hero/>}/>
        <Route path='/fruits' element={<FruitTable/>} />
        <Route path='/suppliers' element={<SupplierTable/>} />
        <Route path='/add-fruit' element={<AddFruit/>}/> 
      </Routes>

    </div>
  );
}

export default App;
