import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSuppliers } from "../api/suppliers";
import { createFruit } from "../api/fruits";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

function AddFruit() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["suppliersData"],
    queryFn: fetchSuppliers,
  });

  const createFruitMutation = useMutation({
    mutationFn: createFruit,
  });

  const handleAddFruit = (fruit) => {
    createFruitMutation.mutate({
      ...fruit,
    });
  };

  if (isPending) return "Loading...";
  if (isError) return "An error has occurred: " + error.message;

  return (
    <div className="h-screen w-full grid place-items-center">
      <Formik
        initialValues={{
          name: "",
          price: "",
          supplier: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          price: Yup.number("Number")
            .typeError("You must specify a number")
            .required("Price is required")
            .positive("Must be a positive number"),
          supplier: Yup.number()
            .oneOf(
              data.map((supplier) => supplier.id),
              "Please select a valid supplier"
            )
            .required("Supplier is required"),
        })}
        onSubmit={(values, actions) => {
          const modifiedValues = {
            ...values,
            supplier: {
              id: parseInt(values.supplier),
            },
          };

          handleAddFruit(modifiedValues);
          actions.resetForm({
            values: {
              name: "",
              price: "",
              supplier: "",
            },
          });

          toast.success("Added");
        }}
      >
        <Card className="">
          <Form className="grid space-y-3">
            <Field
              name="name"
              type="text"
              placeholder="Fruit"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            ></Field>
            <ErrorMessage
              component="label"
              name="name"
              className="text-red-600"
            />

            <Field
              name="price"
              type="text"
              placeholder="Price"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            ></Field>
            <ErrorMessage
              component="label"
              name="price"
              className="text-red-600"
            />

            <Field
              as="select"
              name="supplier"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <option value="">Choose a supplier</option>
              {data.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              component="label"
              name="supplier"
              className="text-red-600"
            />
            <div className="grid justify-center">
              <button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 active:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="submit"
              >
                Add Fruit
              </button>
              <Link to={"/fruits"}>
                <button
                  className="focus:outline-none text-white bg-[#ff7400] hover:bg-[#ffa700] active:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  type="submit"
                >
                  Back to Fruits
                </button>
              </Link>
            </div>
            <Toaster richColors />
          </Form>
        </Card>
      </Formik>
    </div>
  );
}

export default AddFruit;
