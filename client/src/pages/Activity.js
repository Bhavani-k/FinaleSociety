import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components"; // Adjust the path based on your project structure
import { ToastContainer, toast } from "react-toastify";

const families = [
  { id: 1, name: "Family1", contact: "1234567890", amountToPay: 5000 },
  { id: 2, name: "Family2", contact: "9876543210", amountToPay: 7500 },
  // Add more families as needed
];

const Activity = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(
    Array(families.length).fill("Pending") // Initialize with default value
  );

  const handleBack = () => {
    var currentUrl = window.location.pathname;
    var urlSegments = currentUrl.split("/");
    urlSegments.pop();
    var newUrl = urlSegments.join("/");
    navigate(newUrl);
  };

  const handlePaymentReminder = (index) => {
    // Handle payment reminder logic here
    toast(`Reminder sent for ${families[index].name}`);
  };

  const columns = [
    { Header: "Family Name", accessor: "name" },
    { Header: "Contact", accessor: "contact" },
    { Header: "Amount to Pay", accessor: "amountToPay" },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      Cell: ({ row }) => (
        <select
          className={`p-2 rounded-md bg-background ${
            paymentStatus[row.original.id - 1] === "Paid"
              ? "text-green-500"
              : "text-red-500"
          }`}
          value={paymentStatus[row.original.id - 1]}
          onChange={(e) => {
            const newPaymentStatus = [...paymentStatus];
            newPaymentStatus[row.original.id - 1] = e.target.value;
            setPaymentStatus(newPaymentStatus);
          }}
        >
          <option value="Pending">Pending</option>
          <option className="text-green-500" value="Paid">
            Paid
          </option>
          {/* Add more options as needed */}
        </select>
      ),
    },
    // {
    //   Header: "Action",
    //   accessor: "action", // Use a unique accessor for Action
    //   Cell: ({ row }) => (
    //     <div>
    //       <button
    //         className={`${
    //           paymentStatus[row.original.id - 1] === "Paid"
    //             ? "bg-gray-400"
    //             : "bg-primary"
    //         } text-white py-1 px-2 rounded-md`}
    //         disabled={paymentStatus[row.original.id - 1] === "Paid"}
    //         onClick={() => handlePaymentReminder(row.original.id - 1)}
    //       >
    //         Remind
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="bg-background flex flex-col gap-2">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-bold">Floor Cleaning</p>
        {/* <button
          onClick={handleBack}
          className="bg-primary text-white p-2 rounded-md"
        >
          Back
        </button> */}
      </div>
      <div>
        <p>
          This month an average 5lak is used to clean the floor, which was very
          dirty.
        </p>
      </div>
      <div>{/* Money details to be added */}</div>
      <Table
        columns={columns}
        data={families}
        onViewClick={(id) => console.log(id)}
      />
      <ToastContainer />
    </div>
  );
};

export default Activity;
