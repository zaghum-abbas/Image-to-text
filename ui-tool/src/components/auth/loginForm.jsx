import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "../../data/data";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (window.location.pathname !== "/profile") {
        navigate("/profile", { replace: true });
      }
    }
  }, [navigate]);

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        localStorage.setItem("authToken", data.payload.token);
        navigate("/profile");
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
      <div className="mx-auto w-full max-w-md space-y-6 px-6 py-6 bg-white rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2">
            Don't have an account
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}

export default AuthLogin;
