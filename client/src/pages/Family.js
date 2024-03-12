import React, { useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import * as SocietyActions from "../store/society/actions";
import toast, { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const Family = () => {
  const dispatch = useDispatch();
  const oneFamily = useSelector((state) => state?.society?.oneFamily);
  const allFamilyActivities = useSelector(
    (state) => state?.society?.allFamilyActivities
  );
  const getOneFamily = (data) => dispatch(SocietyActions.getOneFamily(data));
  const getOneFamilyInit = (data) =>
    dispatch(SocietyActions.getOneFamilyInit(data));
  const getAllFamilyActivities = (data) =>
    dispatch(SocietyActions.getAllFamilyActivities(data));
  const { familyId } = useParams();
  console.log(oneFamily);
  console.log(allFamilyActivities);
  useEffect(() => {
    getOneFamilyInit();
    getOneFamily({
      id: familyId,
    });
    getAllFamilyActivities({
      familyId,
    });
  }, [familyId]);
  return <div>Family</div>;
};

export default Family;
