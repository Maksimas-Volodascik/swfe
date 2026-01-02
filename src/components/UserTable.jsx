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

function fixedHeaderContent() {
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

const UserTable = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userData, setUserData] = useState();
  const [deleteUser, setDeleteUser] = useState();

  function rowContent(_index, row) {
    const handleOnDelete = (id) => {
      setDeleteUser(id);
      setOpenDelete(true);
      console.log("onDelete action was performed");
    };
    const handleOnEdit = (row) => {
      setUserData(row);
      setOpen(true);
    };

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
                    onClick={() => handleOnEdit(row)}
                    aria-label="delete"
                    size="large"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOnDelete(row.id)}
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
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
      <ModalUser
        userData={userData}
        open={open}
        onClose={() => setOpen(false)}
      />
      <ModalAlert
        userId={deleteUser}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  );
};

export default UserTable;
/*
TODO: rewrite TableVirtuoso
<TableVirtuoso
      data={data}
      components={{
        Table: (props) => <table {...props} className="my-table" />,
        TableRow: (props) => <tr {...props} className="my-row" />,
        TableCell: (props) => <td {...props} className="my-cell" />
      }}
      fixedHeaderContent={() => (
        <tr className="my-header">
          <th>ID</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      )}
      itemContent={(index, item) => (
        <>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.value}</td>
        </>
      )}
    /> */
