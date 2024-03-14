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

const ToggleButton = ({ value }) => {
  const [approved, setApproved] = useState(value);

  const handleToggle = () => {
    setApproved(!approved);
    // Here you can dispatch an action to update the approval status in your Redux store
  };

  return (
    <button
      className={`relative ${
        approved ? "bg-green-500" : "bg-red-500"
      } text-white px-2 py-1 rounded-full w-8 h-4`}
      onClick={handleToggle}
    >
      <div
        className={`absolute ${
          approved ? "right-0" : "left-0"
        } top-0 w-4 h-4 bg-white rounded-full`}
      ></div>
    </button>
  );
};

// export  ToggleButton;

const InvoiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.society.allFamilies);
  const invoiceList = useSelector((state) => state.society?.invoiceList.data);
  console.log(invoiceList);
  const getInvoiceList = (data) =>
    dispatch(SocietyActions.getInvoiceList(data));

  useEffect(() => {
    getInvoiceList();
  }, []);

  const columns = [
    { Header: "Invoice Number", accessor: "invoiceNumber" },
    { Header: "Activity Name", accessor: "activity.name" },
    { Header: "Approve", accessor: "contact", Cell: ToggleButton },
  ];

  return (
    <div className="bg-background text-text h-full">
      <div className="w-full flex justify-between mb-8 ">
        <p className="text-2xl font-bold">Invoice Details</p>
      </div>
      {invoiceList && (
        <Table columns={columns} data={invoiceList} onViewClick={() => {}} />
      )}
      <ToastContainer />
    </div>
  );
};

export default InvoiceList;
