import React, { useState } from "react";
import { Table } from "../components";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const columns = [
  { Header: "Date", accessor: "date" },
  { Header: "Activity Name", accessor: "name" },
  { Header: "Description", accessor: "description" },
  { Header: "Cost Related", accessor: "costRelated" },
  { Header: "Cost Amount", accessor: "costAmount" },
  { Header: "Settled", accessor: "settled" },
];

const data = [
  {
    id: 1,
    name: "Yoga Class",
    date: "2024-03-10",
    costRelated: "Yes",
    costAmount: 10,
    description: "Morning yoga session",
    settled: "settled",
  },
  {
    id: 9,
    name: "Community Cleanup",
    date: "2024-03-15",
    costRelated: "Yes",
    costAmount: 90,
    description: "Clean up the neighborhood park",
    settled: "Not Settled",
  },
  // Add more data as needed
];

const initialValues = {
  name: "",
  date: "",
  costRelated: "No",
  costAmount: 0,
  description: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Activity Name is required"),
  date: Yup.date().required("Date is required"),
  costRelated: Yup.string().required("Activity type is required"),
  costAmount: Yup.number().required("Cost Amount is required"),
  description: Yup.string().required("Description is required"),
});

const ActivityList = () => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const navigate = useNavigate();

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
      background: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const handleAddActivity = (values) => {
    // Handle adding activity to the data array
    // You can update the state, make an API call, etc.
    console.log("Adding activity:", values);

    // Close the modal after adding the activity
    closeModal();
  };
  const handleViewActivity = (activityId) => {
    // Navigate to the new URL with the activity id as a query parameter
    // history.push(`/3/activityList?id=${activityId}`);
    const currentURL = window.location.href;
    navigate(`${window.location.pathname}/${activityId}`);
  };

  return (
    <div className="bg-background text-text h-full">
      <div className="w-full flex justify-between mb-8">
        <p className="text-2xl font-bold">Activity Details</p>
        <button
          onClick={openModal}
          className="bg-cta text-white p-2 rounded-md"
        >
          Add Activity
        </button>
      </div>
      <Table columns={columns} data={data} onViewClick={handleViewActivity} />

      <Modal
        isOpen={isModelOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Activity Modal"
      >
        <div className="flex w-full justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Add Activity</h2>
          <button onClick={closeModal} className="text-2xl">
            <MdOutlineClose />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddActivity}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Activity Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description:
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-600"
              >
                Date:
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className="mt-1 p-2 w-full border border-2 bg-background rounded-md"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="costRelated"
                className="block text-sm font-medium text-gray-600"
              >
                Cost Related:
              </label>
              <Field
                as="select"
                id="costRelated"
                name="costRelated"
                className="mt-1 p-2 w-full border-2 bg-background rounded-md"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Field>
              <ErrorMessage
                name="costRelated"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="costAmount"
                className="block text-sm font-medium text-gray-600"
              >
                Cost Amount:
              </label>
              <Field
                type="number"
                id="costAmount"
                name="costAmount"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="costAmount"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded w-full"
              >
                Add Activity
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default ActivityList;
