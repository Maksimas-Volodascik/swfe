import * as React from "react";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import UserTable from "../../components/UserTable";
import loading from "../../assets/loading.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModalView from "../../components/ModalView";
import { useState } from "react";

function createData(id, name, lastname, birthdate, enrollmentdate, btn) {
  return { id, name, lastname, birthdate, enrollmentdate, btn };
}
const StudentList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: getStudentList,
  });
  const rows = [];

  data?.forEach((student) => {
    const { id, first_name, last_name, date_of_birth, enrollment_date } =
      student;
    rows.push(
      createData(
        id,
        first_name,
        last_name,
        date_of_birth.substring(0, 10),
        enrollment_date.substring(0, 10)
      )
    );
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Paper
        style={{
          height: "100vh",
          width: "100%",
          padding: "30px",
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
              <ModalView open={open} onClose={() => setOpen(false)} />
            </Box>
            <UserTable rows={rows} />
          </>
        )}
      </Paper>
    </>
  );
};

const getStudentList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://localhost:7220/api/student");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
};

export default StudentList;
