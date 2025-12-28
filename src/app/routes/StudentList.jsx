import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

function createData(id, name, lastname, birthdate, enrollmentdate, btn) {
  return { id, name, lastname, birthdate, enrollmentdate, btn };
}

const columns = [
  {
    width: 5,
    label: "ID",
    dataKey: "id",
  },
  {
    width: 100,
    label: "First Name",
    dataKey: "name",
  },
  {
    width: 50,
    label: "Last Name",
    dataKey: "lastname",
  },
  {
    width: 110,
    label: "date_of_birth",
    dataKey: "birthdate",
  },
  {
    width: 130,
    label: "enrollment_date",
    dataKey: "enrollmentdate",
  },
  {
    width: 100,
    label: "",
    dataKey: "btn",
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: column.width }}
          sx={{ backgroundColor: "#696969ff" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  const handleOnDelete = (id) => {
    console.log("OnDelete clicked: ", id);
  };
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.label === "ID" ? "left" : "center"}
        >
          {row[column.dataKey]}
          {column.dataKey === "btn" ? (
            <Button onClick={() => handleOnDelete(row.id)}>Delete</Button>
          ) : (
            ""
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const StudentList = () => {
  const { data } = useQuery({
    queryKey: ["students"],
    queryFn: getStudentList,
  });

  const rows = [];

  for (let i = 0; i < 100; i++) {
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
  }

  return (
    <>
      <Paper style={{ height: "100vh", width: "100%", padding: "30px" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </>
  );
};

const getStudentList = async () => {
  const response = await fetch("https://localhost:7220/api/student");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
};

export default StudentList;
