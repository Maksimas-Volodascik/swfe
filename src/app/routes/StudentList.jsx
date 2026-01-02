import * as React from "react";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import UserTable from "../../components/UserTable";
import loading from "../../assets/loading.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModalUser from "../../components/ModalUser";
import { useState } from "react";
import UserTableRow from "../../components/UserTableRow";
import { API_URL } from "../../lib/types";

const StudentList = () => {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: getStudentList,
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
const getStudentList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL + "/api/student");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
};
export default StudentList;
