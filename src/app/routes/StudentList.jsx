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
  const response = await fetch("https://localhost:7220/api/student");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
};
export default StudentList;
