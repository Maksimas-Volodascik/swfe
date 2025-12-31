import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserTable from "./UserTable";

function createData(id, name, lastname, birthdate, enrollmentdate, btn) {
  return { id, name, lastname, birthdate, enrollmentdate, btn };
}

const UserTableRow = ({ data }) => {
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
  return <UserTable rows={rows} />;
};

export default UserTableRow;
