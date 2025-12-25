import React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import LoginForm from "../../components/LoginForm";

const providers = [{ id: "credentials", name: "Email and Password" }];

const Login = () => {
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
          <LoginForm />
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
