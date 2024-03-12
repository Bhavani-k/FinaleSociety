import React, { useEffect, useState } from "react";
import { Table } from "../components";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import * as SocietyActions from "../store/society/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const columns = [
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ value }) => new Date(value).toLocaleDateString(),
  },
  { Header: "Activity Name", accessor: "name" },
  { Header: "Cost Amount", accessor: "cost" },
  // { Header: "Settled", accessor: "settled" },
];

const initialValues = {
  name: "",
  date: "",
  costRelated: "No",
  costAmount: 0,
  description: "",
  families: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Activity Name is required"),
  date: Yup.date().required("Date is required"),
  costRelated: Yup.string().required("Activity type is required"),
  costAmount: Yup.number().required("Cost Amount is required"),
  description: Yup.string().required("Description is required"),
  // families: Yup.array().required("Please select at least one family"),
});

const ActivityList = () => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const [step, setStep] = useState("one");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const society = useSelector((state) => state.society);
  const families = useSelector((state) => state.society.allFamilies);
  const data = useSelector((state) => state.society.allSocietyActivities);
  const getAllFamilies = (data) =>
    dispatch(SocietyActions.getAllFamilies(data));
  const getAllSocietyActivities = (data) =>
    dispatch(SocietyActions.getAllSocietyActivities(data));
  const createActivity = (data) =>
    dispatch(SocietyActions.createActivity(data));
  const createActivityInit = (data) =>
    dispatch(SocietyActions.createActivityInit(data));
  console.log(families);
  console.log(society?.allSocietyActivities);
  useEffect(() => {
    getAllFamilies({ id });
    getAllSocietyActivities({ id });
  }, []);
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
    setStep("one");
    createActivity({
      name: values.name,
      date: values.date,
      costCategory: values.costRelated,
      cost: values.costAmount,
      families: values.families,
      description: values.description,
      societyId: id,
    });
    closeModal();
  };

  useEffect(() => {
    if (society?.createActivitySuccess === true) {
      toast("Activity created successfully");
      createActivityInit();
    } else if (society?.createActivityFailure === true) {
      toast("Try again after some time");
      createActivityInit();
    }
  }, [society?.createActivitySuccess]);

  const handleNext = () => {
    setStep("two");
  };
  const handleBack = () => {
    setStep("one");
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
      {data && (
        <Table columns={columns} data={data} onViewClick={handleViewActivity} />
      )}
      <Modal
        isOpen={isModelOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Activity Modal"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddActivity}
        >
          <Form>
            {step === "one" && (
              <>
                <div className="flex w-full justify-between items-center">
                  <h2 className="text-2xl font-bold mb-4">Add Activity</h2>
                  <button onClick={closeModal} className="text-2xl">
                    <MdOutlineClose />
                  </button>
                </div>

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
                    // type="submit"
                    onClick={handleNext}
                    className="bg-primary text-white p-2 rounded w-full"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === "two" && (
              <>
                <div className="flex w-full justify-between items-center">
                  <h2 className="text-xl font-bold mb-4">Select Families</h2>
                  <button onClick={handleBack} className="text-2xl">
                    <IoMdArrowRoundBack />
                  </button>
                </div>
                <div className="mb-4 max-h-48 overflow-y-auto">
                  {/* Assuming families is an array of available options */}
                  {families?.map((family, index) => (
                    <div key={family._id} className="mb-2">
                      <Field
                        type="checkbox"
                        id={`family_${family.id}`}
                        name="families" // Use array index as the name
                        className="mr-2"
                        value={family._id}
                      />
                      <label htmlFor={`family_${family.id}`}>
                        {family.name}
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="submit"
                    // You may want to handle the submission here
                    // onClick={handleSubmit}
                    className="bg-primary text-white p-2 rounded w-full"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </Form>
        </Formik>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ActivityList;
