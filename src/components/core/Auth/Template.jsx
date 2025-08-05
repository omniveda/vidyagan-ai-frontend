import { FcGoogle } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../services/apiconnector";
import { endpoints } from "../../../services/apis";
import { setToken } from "../../../slices/authSlice";
import { setUser } from "../../../slices/profileSlice";
import toast from "react-hot-toast";

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback(async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const toastId = toast.loading("Logging in with Google...");
      const res = await apiConnector(
        "POST",
        endpoints.GOOGLE_LOGIN_API,
        { credential: response.credential }
      );

      console.log("Google login response:", res);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Google Login Successful!");
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");

    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google Login Failed");
    } finally {
      toast.dismiss(toastId);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "1048242522295-36hp9h7grje5nmaig1adams2es9hf1t4.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      // Render the Google button, but we'll use our custom button
      // window.google.accounts.id.renderButton(
      //   document.getElementById("google-signin-button"),
      //   { theme: "outline", size: "large" }
      // );

      // Prompt the user to select a Google account (optional, for automatic sign-in)
      // window.google.accounts.id.prompt();
    }
  }, [handleCredentialResponse]);

  const handleGoogleSignInClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="grid place-items-center pt-10">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-4xl font-semibold leading-[2.375rem] text-yellow-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-black-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-black-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
            <div className="flex w-full items-center my-4 gap-x-2">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <p className="text-gray-700 font-medium leading-tight">OR</p>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>
            <button
              className="mt-6 flex items-center justify-center rounded-md w-full py-2 bg-gray-100 text-gray-700 transition duration-300 hover:scale-95 border border-gray-300"
              onClick={handleGoogleSignInClick}
            >
              <FcGoogle className="text-xl mr-2" />
              Sign in with Google
            </button>
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template