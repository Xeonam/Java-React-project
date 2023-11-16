import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";
import { createSupplier } from "../api/suppliers";
import { Link } from "react-router-dom";

function AddSupplier() {
  const createSupplierMutation = useMutation({
    mutationFn: createSupplier,
  });

  const handleAddSupplier = (supplier) => {
    createSupplierMutation.mutate({
      ...supplier,
    });
  };
  return (
    <div className="h-screen w-full grid place-items-center">
      <Formik
        initialValues={{
          name: "",
          address: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          address: Yup.string().required("Address is required"),
        })}
        onSubmit={(values, actions) => {
          handleAddSupplier(values);

          actions.resetForm({
            values: {
              name: "",
              address: "",
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
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 active:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="submit"
              >
                Add Supplier
              </button>
              <Link to={"/suppliers"}>
                <button
                  className="focus:outline-none text-white bg-[#ff7400] hover:bg-[#ffa700] active:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  type="submit"
                >
                  Back to Suppliers
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

export default AddSupplier;
