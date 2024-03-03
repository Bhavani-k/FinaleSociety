import React, { useState } from "react";
import { Table } from "../components";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const columns = [
  { Header: "Family Name", accessor: "familyName" },
  { Header: "Flat Number", accessor: "flatNumber" },
  { Header: "Contact Details", accessor: "contactDetails" },
  { Header: "Email", accessor: "email" },
  { Header: "Members", accessor: "members" },
  { Header: "Residents", accessor: "numResidents" },
];

const data = [
  {
    familyName: "Gupta family",
    flatNumber: "A101",
    numResidents: 4,
    contactDetails: "+1 123 456 7890",
    email: "john.doe@example.com",
    members: "ganesh, ramu, akku",
  },
  {
    familyName: "bansal",
    flatNumber: "B202",
    numResidents: 3,
    contactDetails: "+1 987 654 3210",
    email: "jane.smith@example.com",
    members: "ganesh, ramu, akku",
  },
  // Add more data as needed
];

const initialValues = {
  familyName: "",
  flatNumber: "",
  numResidents: "",
  contactDetails: "",
  email: "",
  members: "",
};

const validationSchema = Yup.object().shape({
  familyName: Yup.string().required("Family Name is required"),
  flatNumber: Yup.string().required("Flat Number is required"),
  numResidents: Yup.number().required("Number of Residents is required"),
  contactDetails: Yup.string().required("Contact Details is required"),
  members: Yup.string().required("Family members is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Family = () => {
  const [isModelOpen, setisModelOpen] = useState(false);

  const closeModal = () => {
    setisModelOpen(false);
  };

  const openModal = () => {
    setisModelOpen(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "white", // Set the modal background color
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow for better visibility
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)", // Set the overlay background color with transparency
      zIndex: 1000, // Ensure the overlay is above everything else
    },
  };

  const handleAddFamily = (values) => {
    // Handle adding family to the data array
    // You can update the state, make an API call, etc.
    console.log("Adding family:", values);

    // Close the modal after adding the family
    closeModal();
  };

  return (
    <div className="bg-background text-text h-full">
      <div className="w-full flex justify-between mb-8 ">
        <p className="text-2xl font-bold">Family Details</p>
        <button
          onClick={openModal}
          className="bg-primary text-white p-2 rounded-md"
        >
          Add Family
        </button>
      </div>
      <Table columns={columns} data={data} />

      <Modal
        isOpen={isModelOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Family Modal"
      >
        <div className="flex w-full justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Add Family</h2>
          <button onClick={closeModal} className="text-2xl">
            <MdOutlineClose />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddFamily}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="familyName"
                className="block text-sm font-medium text-gray-600"
              >
                Family Name:
              </label>
              <Field
                type="text"
                id="familyName"
                name="familyName"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="familyName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="flatNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Flat Number:
              </label>
              <Field
                type="text"
                id="flatNumber"
                name="flatNumber"
                className="mt-1 p-2 w-full border border-2 bg-background rounded-md"
              />
              <ErrorMessage
                name="flatNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="members"
                className="block text-sm font-medium text-gray-600"
              >
                Family Members:
              </label>
              <Field
                type="text"
                id="members"
                name="members"
                className="mt-1 p-2 w-full border border-2 bg-background rounded-md"
              />
              <ErrorMessage
                name="members"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numResidents"
                className="block text-sm font-medium text-gray-600"
              >
                Number of Residents:
              </label>
              <Field
                type="number"
                id="numResidents"
                name="numResidents"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="numResidents"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactDetails"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Details:
              </label>
              <Field
                type="text"
                id="contactDetails"
                name="contactDetails"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="contactDetails"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Add Family
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default Family;
