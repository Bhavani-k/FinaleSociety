import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../store/auth/actions";
import * as SocietyActions from "../store/society/actions";

const Signup = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [societyName, setSocietyName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUp = (data) => dispatch(AuthActions.signUp(data));
  const createSociety = (data) => dispatch(SocietyActions.createSociety(data));
  const auth = useSelector((state) => state.auth);
  const society = useSelector((state) => state.society);

  console.log(society);

  const formikSignup = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // Handle signup logic here
      console.log("Signup form submitted with values:", values);
      // Simulating signup success
      signUp({
        username: values.email,
        email: values.email,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    if (auth.signUpSuccess === true) {
      setSignupSuccess(true);
    }
    if (auth.signUpFailure == true) {
      console.log(error);
    }
  }, [auth?.signUpSuccess]);

  useEffect(() => {
    if (society.createSocietySuccess === true) {
      console.log(society.societyDetails);
      navigate(`/${society.societyDetails.society._id}`);
    }
    if (society.createSocietyFailure == true) {
      console.log("error");
    }
  }, [society?.createSocietySuccess]);

  const formikSociety = useFormik({
    initialValues: {
      societyName: "",
    },
    validationSchema: Yup.object({
      societyName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle society creation logic here
      console.log("Society form submitted with values:", values);
      createSociety({
        name: values.societyName,
      });
      // You can redirect or perform further actions after society creation
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center gap-16 px-6 text-grey bg-background w-full">
      <div className="h-16 w-full flex justify-between items-center px-12 py-4">
        <Link to="/" className="font-bold text-3xl text-primary w-full">
          E-Society
        </Link>
      </div>
      <div className="border shadow-md rounded-md p-8 w-1/4 bg-white">
        {signupSuccess ? (
          // Render society creation form if signup is successful
          <form onSubmit={formikSociety.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="societyName"
                className="block text-sm font-medium text-gray-600"
              >
                Society Name
              </label>
              <input
                id="societyName"
                name="societyName"
                type="text"
                onChange={formikSociety.handleChange}
                onBlur={formikSociety.handleBlur}
                value={formikSociety.values.societyName}
                className={`mt-1 p-2 w-full border rounded-md ${
                  formikSociety.errors.societyName ? "border-red-500" : ""
                }`}
              />
              {formikSociety.touched.societyName &&
                formikSociety.errors.societyName && (
                  <div className="text-red-500 text-sm mt-1">
                    {formikSociety.errors.societyName}
                  </div>
                )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded-md mb-4"
              disabled={!formikSociety.isValid}
            >
              Create Society
            </button>
          </form>
        ) : (
          // Render signup form if not successful
          <>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={formikSignup.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={formikSignup.handleChange}
                  onBlur={formikSignup.handleBlur}
                  value={formikSignup.values.email}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formikSignup.errors.email ? "border-red-500" : ""
                  }`}
                />
                {formikSignup.touched.email && formikSignup.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formikSignup.errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formikSignup.handleChange}
                  onBlur={formikSignup.handleBlur}
                  value={formikSignup.values.password}
                  autoComplete="new-password"
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formikSignup.errors.password ? "border-red-500" : ""
                  }`}
                />
                {formikSignup.touched.password &&
                  formikSignup.errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {formikSignup.errors.password}
                    </div>
                  )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formikSignup.handleChange}
                  onBlur={formikSignup.handleBlur}
                  value={formikSignup.values.confirmPassword}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formikSignup.errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {formikSignup.touched.confirmPassword &&
                  formikSignup.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {formikSignup.errors.confirmPassword}
                    </div>
                  )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white p-2 rounded-md mb-4"
                disabled={!formikSignup.isValid}
              >
                Sign Up
              </button>
              <p className="">
                Already have an account?{" "}
                <Link to="/login" className=" font-semibold">
                  Login here
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
