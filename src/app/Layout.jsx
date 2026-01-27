import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: "60px 1fr",
          gridTemplateColumns: "250px 1fr",
          overflow: "hidden",
        }}
      >
        <Box sx={{ gridColumn: "1/-1", position: "relative", zIndex: 10 }}>
          <Header />
        </Box>
        <Box sx={{ gridRow: 2 }}>
          <NavBar />
        </Box>
        <Box sx={{ gridRow: 2, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
