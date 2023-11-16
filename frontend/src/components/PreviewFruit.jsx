import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFruit } from "../api/fruits";
import { Card } from "flowbite-react";

function PreviewFruit() {
  const params = useParams();
  const {
    isLoading: isLoadingFruit,
    isError: isErrorFruit,
    data: fruit,
    error: fruitError,
  } = useQuery({
    queryKey: ["fruit"],
    queryFn: () => fetchFruit(params.id)
  });

  if (isLoadingFruit) return "Loading...";
  if (isErrorFruit) return "An error has occurred: " + fruitError.message;
  return (
    <div className="h-screen w-full grid place-items-center">
      <Card className=" w-1/5">
        <p className="text-xl">Fruit name:</p>
        <span className="text-center">{fruit.name}</span>
        <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <p className="text-xl">Fruit Price:</p>
        <span className="text-center">{fruit.price}</span>
        <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <p className="text-xl">Supplier:</p>
        <span className="text-center">{fruit.supplier.name}</span>
        <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="grid justify-center">
          <Link to={"/fruits"}>
            <button
              className="focus:outline-none text-white bg-[#ff7400] hover:bg-[#ffa700] active:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              type="submit"
            >
              Back to Fruits
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default PreviewFruit;
