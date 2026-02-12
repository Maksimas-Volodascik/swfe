import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { API_URL } from "../../lib/types";
import { Box, Button, Paper } from "@mui/material";
import loading from "../../assets/loading.svg";
import ModalUser from "../../components/ModalUser";
import UserTable from "../../components/UserTable";
import ModalAlert from "../../components/ModalAlert";
import { getTeacherList } from "../../lib/services/teachers.services";

function createData(id, name, lastname, subjectName, btn) {
  return { id, name, lastname, subjectName, btn };
}

const TeacherList = () => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true); // "add" or "edit"
  const { data: teachers = [], isPending } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeacherList,
    staleTime: 1000 * 60 * 5,
  });

  const columns = [
    { width: 5, label: "ID", dataKey: "id" },
    { width: 100, label: "First Name", dataKey: "name" },
    { width: 100, label: "Last Name", dataKey: "lastname" },
    { width: 100, label: "Subject", dataKey: "subjectName" },
    { width: 100, label: "", dataKey: "btn" },
  ];
  console.log(teachers);
  const rows =
    teachers?.map((teacher) =>
      createData(
        teacher.id,
        teacher.firstName,
        teacher.lastName,
        teacher.subjectName,
      ),
    ) || [];

  const handleOnDelete = (data) => {
    setSelectedUser(data);
    setOpenAlertModal(true);
  };

  const handleOnEdit = (data) => {
    setSelectedUser(data);
    setOpenUserModal(true);
    setIsEditMode(true);
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
                onClick={() => (setIsEditMode(false), setOpenUserModal(true))}
              >
                + Add new
              </Button>
              <ModalUser
                userType="teacher"
                isEditMode={isEditMode}
                userData={selectedUser}
                open={openUserModal}
                onClose={() => (setOpenUserModal(false), setSelectedUser(null))}
              />
              <ModalAlert
                userType="teacher"
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

export default TeacherList;
