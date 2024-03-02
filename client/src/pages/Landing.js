import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SVGImages } from "../assets";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center gap-16 px-6 text-grey bg-background w-full">
      <div className="h-16 w-full flex justify-between items-center w-full px-12 py-4">
        <Link to="/" className="font-bold text-3xl text-primary w-full">
          E-Society
        </Link>
        <div className="flex gap-2 text-primary font-semibold justify-evenly w-full">
          <Link>About Us</Link>
          <Link>Features</Link>
          <Link>Contact Us</Link>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <button
            onClick={() => navigate("/signup")}
            className=" rounded-md px-4 py-1 border border-primary text-primary font-bold"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className=" rounded-md px-4 py-1 bg-primary text-white font-bold"
          >
            Log In
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-evenly  ">
        <div className="w-full md:w-2/5 px-6 text-center md:text-left flex flex-col gap-4">
          <p className="text-4xl font-bold w-full">
            Your Gateway to Modern and Hassle Free Society Management
          </p>
          <p className="font-semibold">
            Transforming the way you manage finances, payments, and activities
            within your housing society.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="w-1/2 rounded-md px-2 py-2 bg-primary text-white font-bold"
          >
            Get Started Today
          </button>
        </div>
        <div className="w-full md:w-3/5 mt-6 md:mt-0">
          <img className="w-full" src={SVGImages.hero} alt="happy family" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
