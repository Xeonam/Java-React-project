import React from "react";
import { useParams } from "react-router-dom";
import { fetchSupplier, updateSupplier } from "../api/suppliers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";

function EditSupplier() {
  const params = useParams();
  const queryClient = useQueryClient();

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
    <div>
      <Formik
        initialValues={{
          name: supplier.name,
          address: supplier.address,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          address: Yup.string().required("Address is required"),
        })}
        onSubmit={(values, actions) => {
          updateSupplier(params.id, values);
          queryClient.invalidateQueries({ queryKey: ["supplier"] });

          actions.resetForm({
            values: {
              name: "",
              address: "",
            },
          });

          toast.success("Edited");
        }}
      >
        <Card className="">
          <Form className="grid space-y-3">
            <Field
              name="name"
              type="text"
              placeholder="Supplier"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            ></Field>
            <ErrorMessage
              component="label"
              name="name"
              className="text-red-600"
            />

            <Field
              name="address"
              type="text"
              placeholder="Address"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            ></Field>
            <ErrorMessage
              component="label"
              name="price"
              className="text-red-600"
            />

            <div className="grid justify-center">
              <button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="submit"
              >
                Edit Supplier
              </button>
            </div>
            <Toaster richColors />
          </Form>
        </Card>
      </Formik>
    </div>
  );
}

export default EditSupplier;
