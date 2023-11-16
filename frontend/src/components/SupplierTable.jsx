import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { deleteSupplier, fetchSuppliers } from "../api/suppliers";
import { NavLink, Link } from "react-router-dom";

function SupplierTable() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["suppliersData"],
    queryFn: fetchSuppliers,
  });

  const deleteSupplierMutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliersData"] });
    },
  });

  const handleDelete = (id) => {
    deleteSupplierMutation.mutate(id);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="m-3">
      <h2 className="text-4xl font-extrabold dark:text-white my-5">
        Suppplier CRUD Site
      </h2>
      <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
        Explore, add, modify, or delete supplier entries effortlessly. Make your
        changes and see them in action in real-time!
      </p>

      <div className="flex justify-end h-full">
        <NavLink to="/add-supplier">
          <button
            type="button"
            className="mx-32 focus:outline-none text-white bg-green-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:focus:ring-yellow-900"
          >
            Add new Supplier
          </button>
        </NavLink>
      </div>

      {data && (
        <Table hoverable className="text-center">
          <Table.Head>
            <Table.HeadCell>Supplier id</Table.HeadCell>
            <Table.HeadCell>Supplier name</Table.HeadCell>
            <Table.HeadCell>Supplier address</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((supplier) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={supplier.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {supplier.id}
                </Table.Cell>
                <Table.Cell>{supplier.name}</Table.Cell>
                <Table.Cell>{supplier.address}</Table.Cell>
                <Table.Cell className="w-1/4">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(supplier.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit-supplier/${supplier.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Edit
                    </button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default SupplierTable;
