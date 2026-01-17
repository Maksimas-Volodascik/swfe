import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const Classes = () => {
  const x = [
    "Mathematics",
    "Programming",
    "Art",
    "Music",
    "Artificial Intelligence",
    "Cooking",
    "Video Editing",
    "Engineering",
    "Chemistry",
    "English",
  ];

  const onHandleClick = (i) => {
    console.log(i);
  };

  return (
    <Box
      sx={{
        width: "80vw",
        height: "90vh",
        marginTop: "60px",
        marginLeft: "60px",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        {x.map((num) => (
          <Paper
            key={num}
            sx={{
              width: "330px",
              height: "400px",
              textAlign: "center",
              border: "4px solid",
              borderImage:
                "linear-gradient(150deg, #e6e6e6, #e6e6e6, #575757, #575757) 1",
              position: "relative",
            }}
          >
            <Box
              sx={{
                borderBottom: "2px solid #e6e6e6",
                borderRadius: "10px",
                height: "9%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  maxWidth: "85%",
                  whiteSpace: "initial",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                {num}
                <Button
                  color="success"
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "-2px",
                    borderRadius: "10px",
                  }}
                  onClick={() => onHandleClick(num)}
                >
                  <AddIcon />
                </Button>
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: "2px solid #b9b9b9",
                borderRadius: "10px",
                height: "20%",
                alignContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "left",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                <Typography
                  sx={{ fontSize: "12px" }}
                  component="span"
                  color="text.secondary"
                >
                  Code:
                </Typography>{" "}
                MATH101
                <br />
                <Typography
                  sx={{ fontSize: "12px" }}
                  component="span"
                  color="text.secondary"
                >
                  Room:
                </Typography>{" "}
                101,102
                <br />
                <Typography
                  sx={{ fontSize: "12px" }}
                  component="span"
                  color="text.secondary"
                >
                  Academic Year:
                </Typography>{" "}
                2026-2027
              </Typography>
            </Box>
            <Box
              sx={{
                height: "62%",
                paddingTop: "5px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                <Typography
                  sx={{ fontSize: "12px" }}
                  component="span"
                  color="text.secondary"
                >
                  Description:
                </Typography>{" "}
                Our classes are designed to provide a dynamic and engaging
                learning experience tailored to a variety of skill levels. Each
                session combines theoretical knowledge with practical
                application, encouraging participants to actively explore
                concepts and develop new competencies.
              </Typography>
            </Box>
            <Box
              sx={{
                borderTop: "2px solid #808080",
                borderRadius: "10px",
                height: "9%",
              }}
            >
              <Stack
                sx={{ flexDirection: "row", width: "100%", height: "100%" }}
              >
                <Button color="secondary" sx={{ flex: 1 }}>
                  Find Teachers
                </Button>
                <Button color="secondary" sx={{ flex: 1 }}>
                  Find Material
                </Button>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Grid>
    </Box>
  );
};

export default Classes;
