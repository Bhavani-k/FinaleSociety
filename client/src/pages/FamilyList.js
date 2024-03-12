import React, { useDebugValue, useEffect, useState } from "react";
import { Table } from "../components";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import * as SocietyActions from "../store/society/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const initialValues = {
  familyName: "",
  flatNumber: "",
  // numResidents: "",
  contact: "",
  email: "",
  // members: "",
};

const validationSchema = Yup.object().shape({
  familyName: Yup.string().required("Family Name is required"),
  flatNumber: Yup.string().required("Flat Number is required"),
  // numResidents: Yup.number().required("Number of Residents is required"),
  contact: Yup.string().required("Contact Details is required"),
  // members: Yup.string().required("Family members is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const FamilyList = () => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const data = useSelector((state) => state.society.allFamilies);
  const society = useSelector((state) => state.society);
  // const [paymentStatus, setPaymentStatus] = useState(
  //   Array(data.length).fill("Pending") // Initialize with default value
  // );
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createFamily = (data) => dispatch(SocietyActions.createFamily(data));
  const getAllFamilies = (data) =>
    dispatch(SocietyActions.getAllFamilies(data));

  console.log(data);

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
  const columns = [
    { Header: "Family Name", accessor: "name" },
    { Header: "Flat Number", accessor: "flatNumber" },
    { Header: "Contact Details", accessor: "contact" },
    // { Header: "Email", accessor: "head" },
    // { Header: "Members", accessor: "members" },
    // { Header: "Residents", accessor: "numResidents" },
    { Header: "Total Amount to Pay", accessor: "totalAmountToPay" }, // New column
  ];

  const handleAddFamily = (values) => {
    // Handle adding family to the data array
    // You can update the state, make an API call, etc.
    console.log("Adding family:", values);
    createFamily({
      name: values.familyName,
      flatNumber: values.flatNumber,
      head: values.email,
      societyId: id,
      contact: values.contact,
    });

    // Close the modal after adding the family
    closeModal();
  };
  const handleViewFamily = (activityId) => {
    navigate(`${window.location.pathname}/${activityId}`);
  };

  useEffect(() => {
    getAllFamilies({
      id,
    });
    if (SocietyActions.createFamilySuccess === true) {
      toast("family created successfully");
    }
    if (SocietyActions.createActivityFailure === true) {
      toast("family creation failed");
    }
  }, [society?.createFamilySuccess]);

  return (
    <div className="bg-background text-text h-full">
      <div className="w-full flex justify-between mb-8 ">
        <p className="text-2xl font-bold">Family Details</p>
        <div>
          <button
            onClick={openModal}
            className="bg-cta text-white p-2 rounded-md"
          >
            Add Family
          </button>
        </div>
      </div>
      {data && (
        <Table columns={columns} data={data} onViewClick={handleViewFamily} />
      )}
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
            {/* <div className="mb-4">
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
            </div> */}

            <div className="mb-4">
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Details:
              </label>
              <Field
                type="text"
                id="contact"
                name="contact"
                className="mt-1 bg-background p-2 w-full border-2 rounded-md"
              />
              <ErrorMessage
                name="contact"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Head Email:
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
                className="bg-primary text-white p-2 rounded w-full"
              >
                Add Family
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default FamilyList;
