import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import loading from "../../assets/loading.svg";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../lib/types";

const Classes = () => {
  const { data, isPending } = useQuery({
    queryKey: ["class-subjects"],
    queryFn: getClassSubjectsAsync,
  });

  const onHandleClick = (i) => {
    console.log("Clicked add for class: " + i);
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
      {isPending ? (
        <img
          src={loading}
          alt="Loading"
          style={{
            width: "50px",
            height: "50px",
            marginLeft: "40vw",
            marginTop: "20px",
          }}
        />
      ) : (
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
          {data.map((data) => (
            <Paper
              key={data.subjectCode}
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
                  {data.subjectName}
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
                  {data.subjectCode}
                  <br />
                  <Typography
                    sx={{ fontSize: "12px" }}
                    component="span"
                    color="text.secondary"
                  >
                    Room:
                  </Typography>{" "}
                  {data.room}
                  <br />
                  <Typography
                    sx={{ fontSize: "12px" }}
                    component="span"
                    color="text.secondary"
                  >
                    Academic Year:
                  </Typography>{" "}
                  {data.academicYear}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "62%",
                  paddingTop: "5px",
                }}
              >
                <Typography sx={{ fontSize: "12px", textAlign: "left" }}>
                  <Typography
                    sx={{ fontSize: "12px" }}
                    component="span"
                    color="text.secondary"
                  >
                    Description:
                  </Typography>{" "}
                  {data.description}
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
      )}
    </Box>
  );
};

const getClassSubjectsAsync = async () => {
  let response = [];
  try {
    response = await fetch(API_URL + "/class-subjects");
  } catch (err) {
    console.log("Error: ", err);
  }
  return await response.json();
};

export default Classes;
