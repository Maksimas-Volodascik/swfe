import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserTable from "./UserTable";

function createData(id, name, lastname, birthdate, enrollmentdate, btn) {
  return { id, name, lastname, birthdate, enrollmentdate, btn };
}

const UserTableRow = ({ data, columns }) => {
  console.log(data);
  const rows = [];
  data?.forEach((student) => {
    const { id, firstName, lastName, dateOfBirth, enrollmentDate } = student;
    rows.push(
      createData(
        id,
        firstName,
        lastName,
        dateOfBirth.substring(0, 10),
        enrollmentDate.substring(0, 10)
      )
    );
  });
  return <UserTable rows={rows} columns={columns} />;
};

export default UserTableRow;
