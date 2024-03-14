import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../store/auth/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const signIn = (data) => dispatch(AuthActions.signIn(data));
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      console.log("Login form submitted with values:", values);
      signIn({
        username: values.username,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    if (auth?.signInSuccess === true) {
      toast("Sign In success");
      console.log(">>>>>>>>>>>>>>>>>");

      navigate(`/${auth?.userDetails?.user?.society}`);
    }
  }, [auth?.signInSuccess]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-16 px-6 text-grey bg-background w-full">
      <div className="h-16 w-full flex justify-between items-center px-12 py-4">
        <Link to="/" className="font-bold text-3xl text-primary w-full">
          E-Society
        </Link>
      </div>
      <div className="border bg-white rounded-md p-8 shadow-md w-1/4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`mt-1 bg-background p-2 w-full border-2 rounded-md ${
                formik.errors.username ? "border-red-500" : ""
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1 p-2 w-full border border-2 bg-background rounded-md ${
                formik.errors.password ? "border-red-500" : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-md w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
