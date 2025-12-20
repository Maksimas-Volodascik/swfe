import React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve({ error: "Invalid Email or Password" });
    }, 500);
  });
  return promise;
};

const Login = () => {
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <Box
        component="section"
        sx={{
          width: "100%",
          height: "100dvh",
          backgroundColor: "white",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: "40vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Left Panel Title */}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            <img
              src="src\assets\icon.jpg"
              style={{ maxHeight: "40px", width: "40px" }}
            />
            <h1 style={{ margin: 0 }}>Student gradebook</h1>
          </Box>
          {/* Left Panel Sign In Form*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
            theme={theme}
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
        </Box>
        {/* Right Panel/Image */}
        <Box
          sx={{
            flex: 1,
            height: "100%",
            backgroundImage: "url(src/assets/loginBackground.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </>
  );
};

export default Login;
