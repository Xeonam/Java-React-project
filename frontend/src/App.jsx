import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  DefaultNavbar,
  FruitTable,
  Hero,
  SupplierTable,
  AddFruit,
  EditFruit,
  AddSupplier,
  EditSupplier,
  PreviewSupplier,
} from "./components";
import PreviewFruit from "./components/PreviewFruit";

function App() {
  return (
    <div>
      <DefaultNavbar></DefaultNavbar>
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/fruits" element={<FruitTable />} />
        <Route path="/suppliers" element={<SupplierTable />} />
        <Route path="/add-fruit" element={<AddFruit />} />
        <Route path="/edit-fruit/:id" element={<EditFruit />} />
        <Route path="/add-supplier" element={<AddSupplier />} />
        <Route path="/edit-supplier/:id" element={<EditSupplier />} />
        <Route path="/fruit/:id" element={<PreviewFruit />} />
        <Route path="/supplier/:id" element={<PreviewSupplier />} />
      </Routes>
    </div>
  );
}

export default App;
