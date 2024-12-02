// import React from "react";
// import { LogInIcon } from "lucide-react";
// import { Link } from "react-router-dom";

// const LoginForm = () => {
//   return (
//     <>
//       <section className="bg-gray-100 py-6">
//         <div className="container mx-auto px-4 xl:w-[40%] lg:w-1/2 md:w-4/5">
//           <div className="bg-white shadow-md rounded-lg px-4 py-8">
//             <div className="flex justify-center mb-4">
//               <div className="bg-purple-100 text-blue-600 p-3 rounded-full">
//                 <LogInIcon />
//               </div>
//             </div>

//             <h2 className="text-center text-2xl font-bold">
//               Sign up with us today
//             </h2>
//             <p className="text-center text-gray-500 text-base font-semibold mt-2">
//               Enter your email and password to sign up your account
//             </p>

//             <form className="mt-6">
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>
//               <div className="mb-6">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-600 transition"
//               >
//                 Sign In
//               </button>
//             </form>

//             <div className="flex items-center my-4">
//               <hr className="flex-grow border-gray-300" />
//               <span className="px-3 text-sm text-gray-500">OR</span>
//               <hr className="flex-grow border-gray-300" />
//             </div>

//             <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
//               <img
//                 src="https://www.imagetotext.info/web_assets/frontend/img/icons/google-login.svg"
//                 alt="Google logo"
//                 className="h-5 w-5 mr-2"
//               />
//               <span className="font-medium text-gray-600">
//                 Continue with Google
//               </span>
//             </button>

//             <p className="text-center text-sm text-gray-500 mt-6">
//               Already have an account?{" "}
//               <Link to={'/login'} className="text-blue-600 font-medium hover:underline">
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>

//     </>
//   );
// };

// export default LoginForm;

import CommonForm from "@/components/common/form";
import { useToast } from "@/hooks/use-toast";
import { registerFormControls } from "../../data/data";
import {registerUser} from "../../store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <section className="bg-gray-100 py-10">
      <div className="mx-auto w-full max-w-md space-y-6 bg-white px-6 py-6 rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}

export default AuthRegister;
