import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      console.log("Login form submitted with values:", values);
    },
  });

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
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1 bg-background p-2 w-full border-2 rounded-md ${
                formik.errors.email ? "border-red-500" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
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
