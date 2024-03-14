import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components";
import * as SocietyActions from "../store/society/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Activity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activityId } = useParams();
  const oneActivity = useSelector((state) => state?.society?.oneActivity?.data);
  const updateFamily = (data) => dispatch(SocietyActions.updateFamily(data));
  const families = oneActivity?.families || [];
  const society = useSelector((state) => state?.society);
  const [familyId, setFamilyId] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(() => {
    // Initialize paymentStatus for each family based on their payment in the current activity
    const initialPaymentStatus = {};
    console.log(families);
    families.forEach((family) => {
      const activityPayment = family.activitiesPayment.find(
        (payment) => payment.activity === activityId
      );
      console.log(activityPayment);
      initialPaymentStatus[family._id] = activityPayment?.paid
        ? "Paid"
        : "Pending";
    });
    return initialPaymentStatus;
  });

  useEffect(() => {
    if (society?.updatePaymentStatusSuccess === true) {
      toast("update successfull");
      getOneActivity({
        id: activityId,
      });
    } else if (society?.updatePaymentStatusFailure === true) {
      toast(" update failed, try agin later");
    }
  }, [society?.updatePaymentStatusSuccess]);
  console.log(paymentStatus);
  const getOneActivity = (data) =>
    dispatch(SocietyActions?.getOneActivity(data));
  const updatePaymentStatus = (data) =>
    dispatch(SocietyActions?.updatePaymentStatus(data));

  const createInvoice = (data) => dispatch(SocietyActions?.createInvoice(data));
  console.log(oneActivity);

  useEffect(() => {
    getOneActivity({
      id: activityId,
    });
  }, [activityId]);

  const handleBack = () => {
    var currentUrl = window.location.pathname;
    var urlSegments = currentUrl.split("/");
    urlSegments.pop();
    var newUrl = urlSegments.join("/");
    navigate(newUrl);
  };

  const updatePaymentStatusFun = (id, value) => {
    console.log(id, value);
    const data = {
      data: { paid: value === "Paid" ? true : false, activity: activityId },
      id,
    };
    console.log(data);
    updatePaymentStatus(data);
  };

  const handleCreateInvoice = () => {
    createInvoice({
      paymentAmount: oneActivity.cost,
      activityId: activityId,
    });
  };

  const extractActivityCost = (family, activityId) => {
    const activityPayment = family.activitiesPayment.find(
      (payment) => payment.activity === activityId
    );
    return activityPayment ? activityPayment.cost : 0;
  };

  const columns = [
    { Header: "Family Name", accessor: "name" },
    { Header: "Contact", accessor: "contact" },
    {
      Header: "Amount to Pay",
      accessor: (row) => extractActivityCost(row, activityId),
    },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      Cell: ({ row }) => (
        <select
          className={`p-2 rounded-md bg-background ${
            paymentStatus[row.original._id] === "Paid"
              ? "text-green-500"
              : "text-red-500"
          }`}
          value={paymentStatus[row.original._id]}
          onChange={(e) => {
            updatePaymentStatusFun(row.original._id, e.target.value);
            setPaymentStatus((prevStatus) => ({
              ...prevStatus,
              [row.original._id]: e.target.value,
            }));
            console.log(paymentStatus);
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
  ];

  return (
    <>
      {oneActivity && (
        <>
          <div className="bg-background flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <p className="text-2xl font-bold">{oneActivity.name}</p>
              <button
                onClick={handleCreateInvoice}
                className="bg-cta text-white p-2 rounded-md"
              >
                Create Invoice
              </button>
            </div>
            <div>
              <p>{oneActivity.description}</p>
            </div>
            <div>{/* Money details to be added */}</div>
            <Table
              columns={columns}
              data={families}
              onViewClick={(id) => setFamilyId(id)}
            />
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

export default Activity;
