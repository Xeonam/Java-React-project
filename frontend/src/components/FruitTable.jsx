import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";

function FruitTable() {
  const { isPending, error, data } = useQuery({
    queryKey: ["fruitsData"],
    queryFn: () =>
      fetch("http://localhost:8080/fruits").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="m-3">
      <h2 className="text-4xl font-extrabold dark:text-white">
        Fruit CRUD Site
      </h2>
      <p className="my-4 text-lg text-gray-500">
        Welcome to the fruit CRUD (Create, Read, Update, Delete) site. Here, you
        can manage a list of fruits and their details.
      </p>
      <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
        Explore, add, modify, or delete fruit entries effortlessly. Make your
        changes and see them in action in real-time!
      </p>

      <button
        type="button"
        className="focus:outline-none text-white bg-green-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        Add new Fruit
      </button>

      {data && (
        <Table hoverable className="text-center">
          <Table.Head>
            <Table.HeadCell>Fruit id</Table.HeadCell>
            <Table.HeadCell>Fruit name</Table.HeadCell>
            <Table.HeadCell>Fruit price</Table.HeadCell>
            <Table.HeadCell>Supplier</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((fruit) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={fruit.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {fruit.id}
                </Table.Cell>
                <Table.Cell>{fruit.name}</Table.Cell>
                <Table.Cell>{fruit.price}</Table.Cell>
                <Table.Cell>{fruit.supplier.id}</Table.Cell>
                <Table.Cell >
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Edit
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default FruitTable;
