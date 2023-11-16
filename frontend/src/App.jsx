import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { DefaultNavbar, FruitTable, Hero, SupplierTable, AddFruit, EditFruit, AddSupplier, EditSupplier } from './components';

function App() {
  

  return (
    <div>
      <DefaultNavbar></DefaultNavbar>
      <Routes>
        <Route path='' element={<Hero/>}/>
        <Route path='/fruits' element={<FruitTable/>} />
        <Route path='/suppliers' element={<SupplierTable/>} />
        <Route path='/add-fruit' element={<AddFruit/>}/>
        <Route path='/edit-fruit/:id' element={<EditFruit/>}/>  
        <Route path='/add-supplier' element={<AddSupplier/>}/>  
        <Route path='/edit-supplier/:id' element={<EditSupplier/>}/>  
      </Routes>

    </div>
  );
}

export default App;
