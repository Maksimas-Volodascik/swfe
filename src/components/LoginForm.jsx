import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { SignInPage } from "@toolpad/core/SignInPage";
import { saveAccessToken } from "../lib/tokenService";
import { API_URL } from "../lib/types";

const providers = [{ id: "credentials", name: "Email and Password" }];

const LoginForm = () => {
  const navigate = useNavigate();
  let response;

  const signIn = async (provider, formData) => {
    try {
      response = await fetch(API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
    } catch (e) {
      console.log("Network error: ", e);
      return { error: "Network Error" };
    }

    if (!response.ok) return { error: "Invalid Email or Password" };

    const { accessToken, refreshToken } = await response.json();
    saveAccessToken(accessToken);
    navigate("/register");
    return {};
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
