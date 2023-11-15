import React from "react";
import { Formik, Field, Form } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSuppliers } from "../api/suppliers";



function AddFruit() {
  const queryClient = useQueryClient();

  const {isPending, isError, data } = useQuery({
    queryKey: ["suppliersData"],
    queryFn: fetchSuppliers,
  });

  if (isPending) return "Loading...";
  if (isError) return "An error has occurred: " + error.message;

  return (
    <div className="max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
      <Formik>
        <Form>
          <div>
            <Field name="name" type="text" placeholder="Fruit"></Field>
          </div>

          <div>
            <Field name="price" type="text" placeholder="Price"></Field>
          </div>

          <Field as="select" name="supplier">
            <option value="">Supplier</option>
            {data.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.id}
              </option>
            ))}
          </Field>
          <div>
          <button type="submit" >
                Add Fruit
            </button>
          </div>
            
        </Form>
      </Formik>
    </div>
  );
}

export default AddFruit;
