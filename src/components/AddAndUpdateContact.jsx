import React from "react";
import Model from "./Model";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation =Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added successfully")
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) =>
            isUpdate
              ? updateContact(
                  { name: values.name, email: values.email },
                  contact.id
                )
              : addContact({ name: values.name, email: values.email })
          }
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="flex border h-10 px-2 items-center"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">email</label>
              <Field
                name="email"
                className="flex border h-10 px-2 items-center"
                type="email"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-orange px-3 py-1.5 border rounded-[10px]">
                {isUpdate ? "Update Contact" : "Add Contact"}
              </button>
            </div>{" "}
          </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdateContact;
