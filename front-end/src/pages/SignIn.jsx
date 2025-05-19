import React, { useEffect } from "react";
import { useState } from "react";
import { backendURL } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setToken, setSellertoken }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessScale, setBusinessScale] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      try {
        const res = await axios.post(backendURL + "/api/user/sign-in", {
          email,
          password,
        });
        if (res.data.status === "successful") {
          setToken(res.data.userObject.token);
          navigate("/");
          if (res.data.userObject.userType === "seller") {
            setSellertoken(res.data.userObject.sellertoken);
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {}, [userType]);

  return (
    <div className="border-t border-gray-300">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-140 text-gray-700 m-auto mt-14 gap-6 mb-10"
      >
        <div className="inline-flex gap-2 items-center mb-10 mt-7">
          <p className="barlow-regular-italic text-5xl">{currentState}</p>
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl"
            placeholder="Name"
            required
          />
        )}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl"
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl"
          placeholder="Password"
          required
        />
        {currentState === "Login" ? (
          ""
        ) : (
          <select
            onChange={(e) => setUserType(e.target.value)}
            defaultValue={""}
            value={userType}
            name="user_type"
            className="w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl"
            required
          >
            <option value="" disabled hidden>
              ARE YOU HERE AS A BUYER OR SELLER?
            </option>
            <option value="buyer">BUYER</option>
            <option value="seller">SELLER</option>
          </select>
        )}
        {currentState === "Sign Up" && userType === "seller" ? (
          <select
            name="business_scale"
            onChange={(e) => setBusinessScale(e.target.value)}
            defaultValue={""}
            value={businessScale}
            className="w-full sm:min-h-14 px-3 py-2 border border-gray-500 rounded-xl"
            required
          >
            <option value="" disabled hidden>
              PLEASE SELECT THE SCALE OF YOUR BUSINESS
            </option>
            <option value="small">SMALL</option>
            <option value="medium">MEDIUM</option>
            <option value="large">LARGE</option>
          </select>
        ) : (
          ""
        )}
        <div className="w-full flex justify-between px-2 text-md mt-[-4px]">
          <p className="cursor-pointer">FORGOT YOUR PASSWORD?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              CREATE AN ACCOUNT
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              SIGN IN
            </p>
          )}
        </div>

        <button className="text-lg bg-black text-white rounded-xl sm:min-w-60 mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer">
          {currentState === "Login" ? "SIGN IN" : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
