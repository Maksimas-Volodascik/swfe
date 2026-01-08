import * as React from "react";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import UserTable from "../../components/UserTable";
import loading from "../../assets/loading.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModalUser from "../../components/ModalUser";
import { useState } from "react";
import { API_URL } from "../../lib/types";
import ModalAlert from "../../components/ModalAlert";

function createData(id, name, lastname, birthdate, enrollmentdate, btn) {
  return { id, name, lastname, birthdate, enrollmentdate, btn };
}

const StudentList = () => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: getStudentList,
  });

  const columns = [
    { width: 5, label: "ID", dataKey: "id" },
    { width: 100, label: "First Name", dataKey: "name" },
    { width: 50, label: "Last Name", dataKey: "lastname" },
    { width: 110, label: "date_of_birth", dataKey: "birthdate" },
    { width: 130, label: "enrollment_date", dataKey: "enrollmentdate" },
    { width: 100, label: "", dataKey: "btn" },
  ];

  const rows =
    data?.map((student) =>
      createData(
        student.id,
        student.firstName,
        student.lastName,
        student.dateOfBirth.substring(0, 10),
        student.enrollmentDate.substring(0, 10)
      )
    ) || [];

  const handleOnDelete = (data) => {
    setSelectedUser(data);
    setOpenAlertModal(true);
  };

  const handleOnEdit = (rows) => {
    setSelectedUser(data);
    setOpenUserModal(true);
  };

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
                onClick={() => setOpenUserModal(true)}
              >
                + Add new
              </Button>
              <ModalUser
                userData={selectedUser}
                open={openUserModal}
                onClose={() => (setOpenUserModal(false), setSelectedUser(null))}
              />
              <ModalAlert
                userData={selectedUser}
                open={openAlertModal}
                onClose={() => (
                  setOpenAlertModal(false), setSelectedUser(null)
                )}
              />
            </Box>
            <UserTable
              rows={rows}
              columns={columns}
              onDelete={(data) => handleOnDelete(data)}
              onEdit={(data) => handleOnEdit(data)}
            />
          </>
        )}
      </Paper>
    </>
  );
};
const getStudentList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL + "/student");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
};
export default StudentList;
