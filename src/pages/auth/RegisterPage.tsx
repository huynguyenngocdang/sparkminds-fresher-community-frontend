import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useToggleValues from "hooks/useToggleValues";
import FormGroup from "components/ui/formGroup/FormGroup";
import Label from "components/ui/label/Label";
import Input from "components/ui/input/Input";
import EyeToggleIcon from "components/icons/EyeToggleIcon";
import Button from "components/ui/button/Button";
import { TRegisterResponse, TSignUpProps } from "types";
import { register } from "api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValues();
  const navigate = useNavigate();

  const handleRegister = async ({ username, password }: TSignUpProps) => {
    const registerData: TSignUpProps = { username, password };
    const response: TRegisterResponse | undefined = (
      await register(registerData)
    )?.data;
    if (response && response.status === "CREATED") {
      toast.success(response.message || "Register successful");
      navigate("/login");
    } else if (response && response.error) {
      toast.error(response.error);
    } else {
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <>
      <div className="relative w-full min-h-screen p-10 bg-lite isolate">
        <div className="w-full max-w-[556px] bg-white rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto">
          <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1">
            Register
          </h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormGroup>
              <Label htmlFor="username">Username*</Label>
              <Input
                control={control}
                name="username"
                placeholder="Input your username here"
                error={errors.username?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input
                control={control}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Input your password"
                error={errors.password?.message}
              >
                <EyeToggleIcon
                  open={showPassword}
                  onClick={handleTogglePassword}
                ></EyeToggleIcon>
              </Input>
            </FormGroup>
            <Button type="submit" className="w-full bg-primary">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
