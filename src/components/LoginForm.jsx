import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { SignInPage } from "@toolpad/core/SignInPage";
import { saveAccessToken } from "../lib/tokenService";
const providers = [{ id: "credentials", name: "Email and Password" }];

const LoginForm = () => {
  const navigate = useNavigate();

  const signIn = async (provider, formData) => {
    const response = await fetch("https://localhost:7220/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    }).catch((error) => {
      console.log("error: " + error);
      return { error: "Network Error" };
    });

    if (!response.ok) {
      if (response.status === undefined) return { error: "Network Error" };
      else return { error: "Invalid Email or Password" };
    }

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
      <SignInPage
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
