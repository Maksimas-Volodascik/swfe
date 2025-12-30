import * as React from "react";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import UserTable from "../../components/UserTable";
import loading from "../../assets/loading.svg";

function createData(id, name, lastname, birthdate, enrollmentdate, btn) {
  return { id, name, lastname, birthdate, enrollmentdate, btn };
}
const StudentList = () => {
  const { data, refetch, isPending, error } = useQuery({
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
          <UserTable rows={rows} refetch={refetch} />
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
