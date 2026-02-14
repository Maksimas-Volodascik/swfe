import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Box sx={{ width: "100%", height: "95vh" }}>
      <Paper
        sx={{
          height: "5%",
          marginTop: 2,
          marginX: 2,
          backgroundColor: "#fafafa",
        }}
      >
        filter row (TBA)
      </Paper>
      <Box
        sx={{
          width: "100%",
          height: "40%",
          display: "flex",
          gap: 2,
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
            gap: 2,
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>A Attendance graph donut chart</Typography>
          </Paper>

          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>B Average grade</Typography>
          </Paper>
        </Box>

        <Paper
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography>Logs/table for recent grades</Typography>
          <Typography>
            Class Name - Class Code/Assignment Title - Grading date - Grade
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "40%",
          display: "flex",
          gap: 2,
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
            gap: 2,
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>Completed assignments column chart</Typography>
          </Paper>

          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>Daily performance</Typography>
            <Typography>Linear graph</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
