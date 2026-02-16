import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { SignInPage } from "@toolpad/core/SignInPage";
import { saveAccessToken } from "../lib/tokenService";
import { API_URL } from "../lib/types";

const providers = [{ id: "credentials", name: "Email and Password" }];

const LoginForm = () => {
  const navigate = useNavigate();

  const signIn = async (provider, formData) => {
    //refactor login form and function
    try {
      const response = await API_URL.post("/user/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const { accessToken } = response.data;
      saveAccessToken(accessToken);
      navigate("/dashboard");
      return {};
    } catch (e) {
      if (e.response) {
        const status = e.response.status;

        if (status === 401) {
          return { error: "Invalid Email or Password" };
        }
      }
      return { error: "Network Error" };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <SignInPage //TODO: Remake login form form scratch without using toolpad
        signIn={signIn}
        providers={providers}
        localeText={{
          signInTitle: "Welcome to Student Gradebook",
          signInSubtitle: "Please login to continue",
          providerSignInTitle: () => "Log in",
        }}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </Box>
  );
};

export default LoginForm;
