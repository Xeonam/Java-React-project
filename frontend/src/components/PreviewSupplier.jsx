import React from 'react'
import { fetchSupplier } from '../api/suppliers';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "flowbite-react";

function PreviewSupplier() {
    const params = useParams();
    const {
      isLoading: isLoadingSupplier,
      isError: isErrorSupplier,
      data: supplier,
      error: supplierError,
    } = useQuery({
      queryKey: ["supplier"],
      queryFn: () => fetchSupplier(params.id),
    });
  
    if (isLoadingSupplier) return "Loading...";
    if (isErrorSupplier) return "An error has occurred: " + supplierError.message;

    return (
      <div className="h-screen w-full grid place-items-center">
        <Card className=" w-1/5">
          <p className="text-xl">Name:</p>
          <span className="text-center">{supplier.name}</span>
          <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
  
          <p className="text-xl">Address:</p>
          <span className="text-center">{supplier.address}</span>
          <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
  
          
  
          <div className="grid justify-center">
            <Link to={'/suppliers'}>
              <button
                className="focus:outline-none text-white bg-[#ff7400] hover:bg-[#ffa700] active:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                type="submit"
              >
                Back to Suppliers
              </button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

export default PreviewSupplier