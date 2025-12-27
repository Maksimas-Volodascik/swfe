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
    label: "Buttons",
    dataKey: "btn",
  },
];

const rows = [
  createData("1", "Name", "LastName", "date of birth", "2025 today"),
  createData("2", "Name", "LastName", "date of birth", "2025 today"),
  createData("3", "Name", "LastName", "date of birth", "2025 today"),
  createData("4", "Name", "LastName", "date of birth", "2025 today"),
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
          {column.label === "Buttons" ? (
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
  return (
    <>
      <Paper style={{ height: 400, width: "100%" }}>
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

export default StudentList;
