import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFruit, updateFruit } from "../api/fruits";
import { fetchSuppliers } from "../api/suppliers";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";

const EditFruit = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingFruit,
    isError: isErrorFruit,
    data: fruit,
    error: fruitError,
  } = useQuery({
    queryKey: ["fruit"],
    queryFn: () => fetchFruit(params.id),
  });

  const {
    isLoading: isLoadingSuppliers,
    isError: isErrorSuppliers,
    data: suppliersData,
    error: suppliersError,
  } = useQuery({
    queryKey: ["suppliersData"],
    queryFn: fetchSuppliers,
  });

  if (isLoadingFruit) return "Loading...";
  if (isErrorFruit) return "An error has occurred: " + fruitError.message;

  if (isLoadingSuppliers) return "Loading...";
  if (isErrorSuppliers)
    return "An error has occurred: " + suppliersError.message;

  return (
    <div className="h-screen w-full grid place-items-center">
      <Formik
        enableReinitialize
        initialValues={{
          name: fruit.name,
          price: fruit.price,
          supplier: fruit.supplier.id,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          price: Yup.number("Number")
            .typeError("You must specify a number")
            .required("Price is required")
            .positive("Must be a positive number"),
          supplier: Yup.number()
            .oneOf(
              suppliersData
                ? suppliersData.map((supplier) => supplier.id)
                : undefined,
              "Please select a valid supplier"
            )
            .required("Supplier is required"),
        })}
        onSubmit={(values, actions) => {
          const fruitId = params.id;

          const updatedFruit = {
            name: values.name,
            price: values.price,
            supplier: {
              id: values.supplier,
            },
          };
          
          updateFruit(fruitId, updatedFruit);
          queryClient.invalidateQueries({ queryKey: ["fruit"] });

          toast.success("Edited!");

          actions.resetForm({
            values: {
              name: "",
              price: "",
              supplier: "",
            },
          });
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
              {suppliersData.map((supplier) => (
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
                Edit Fruit
              </button>
            </div>
            <Toaster richColors />
          </Form>
        </Card>
      </Formik>
    </div>
  );
};

export default EditFruit;
