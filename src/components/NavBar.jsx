import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const NavBar = () => {
  const handleNavAction = (index) => {
    console.log(index);
  };

  return (
    <div>
      <Box
        sx={{
          width: 250,
          backgroundColor: "#ffb88fff",
          height: "100vh",
          color: "#000000ff",
          fontWeight: "bold",
        }}
        role="presentation"
      >
        <List sx={{ paddingTop: "20px" }}>
          <ListItem disablePadding>
            <ListItemButton href="dashboard">
              <ListItemIcon sx={{ color: "inherit" }}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="students">
              <ListItemIcon sx={{ color: "inherit" }}>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Student List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="register">
              <ListItemIcon sx={{ color: "inherit" }}>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </div>
  );
};

export default NavBar;
