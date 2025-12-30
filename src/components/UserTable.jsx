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
import { useQueryClient } from "@tanstack/react-query";

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

const UserTable = ({ rows, refetch }) => {
  const queryClient = useQueryClient();
  function rowContent(_index, row) {
    const handleOnDelete = (id) => {
      console.log("OnDelete clicked: ", id);
      fetch("https://localhost:7220/api/student/" + id, {
        method: "DELETE",
      });

      queryClient.invalidateQueries({ queryKey: ["students"] }); //Force table refresh
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

  return (
    <TableVirtuoso
      data={rows}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
    />
  );
};

export default UserTable;
