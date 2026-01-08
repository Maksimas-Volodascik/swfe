import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { Box } from "@mui/material";
import { useState } from "react";
import ModalUser from "./ModalUser";
import ModalAlert from "./ModalAlert";

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
      }}
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

function fixedHeaderContent(columns) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "#e2e2e2ff",
            typography: "body2",
            fontWeight: "bold",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

const UserTable = ({ rows, columns, onDelete, onEdit }) => {
  function rowContent(_index, row) {
    return (
      <>
        <React.Fragment>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              align={column.label === "ID" ? "left" : "center"}
            >
              {row[column.dataKey]}
              {column.dataKey === "btn" ? (
                <Box>
                  <IconButton
                    onClick={() => onEdit(row)}
                    aria-label="delete"
                    size="large"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(row)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              ) : (
                ""
              )}
            </TableCell>
          ))}
        </React.Fragment>
      </>
    );
  }

  return (
    <>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => fixedHeaderContent(columns)}
        itemContent={rowContent}
      />
    </>
  );
};

export default UserTable;
