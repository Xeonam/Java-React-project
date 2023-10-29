import React from "react";
import { NavLink } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";


function DefaultNavbar() {


  return (
    <div className="flex justify-between items-center h-16 mx-auto px-4 bg-blue-900 text-[#00df9a] text-3xl">
      <NavLink to="/" className="w-full font-bold">
        <h1><GiFruitBowl /></h1>
      </NavLink>
      <ul className="flex">
        <li className="p-4">
          <NavLink
            to="/fruits"
            className="hover:text-[#ff6600] hover:bg-[#5ab9be] hover:py-2 px-4 rounded-full"
          >
            Fruits
          </NavLink>
        </li>
        <li className="p-4">
          <NavLink
            to="/suppliers"
            className="hover:text-[#ff6600] hover:bg-[#5ab9be] hover:py-2 px-4 rounded-full"
          >
            Suppliers
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DefaultNavbar;
