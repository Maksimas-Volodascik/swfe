import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { API_URL } from "../../lib/types";
import { Box, Button, Paper } from "@mui/material";
import loading from "../../assets/loading.svg";
import ModalUser from "../../components/ModalUser";
import UserTableRow from "../../components/UserTableRow";

const TeacherList = () => {
  const [open, setOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeacherList,
  });

  return (
    <>
      <Paper
        style={{
          height: "100vh",
          width: "100%",
          padding: "25px 50px 75px 50px",
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
          <>
            <Box
              sx={{ width: "100%", textAlign: "right", paddingBottom: "10px" }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => setOpen(true)}
              >
                + Add new
              </Button>
              <ModalUser open={open} onClose={() => setOpen(false)} />
            </Box>

            <UserTableRow data={data} />
          </>
        )}
      </Paper>
    </>
  );
};

const getTeacherList = async () => {
  let response = [];
  try {
    response = await fetch(API_URL + "/teacher");
  } catch (err) {
    console.log("Error: ", err);
  }
  return await response.json();
};

export default TeacherList;
