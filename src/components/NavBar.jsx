import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FaceIcon from "@mui/icons-material/Face";
import Face4Icon from "@mui/icons-material/Face4";
import ClassIcon from "@mui/icons-material/Class";
import GradeIcon from "@mui/icons-material/Grade";
import SettingsIcon from "@mui/icons-material/Settings";
import FamilyIcon from "@mui/icons-material/FamilyRestroom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const NavBar = () => {
  const handleNavAction = (index) => {
    console.log(index);
  };

  return (
    <div>
      <Box
        sx={{
          width: 250,
          backgroundColor: "#1C1C1C",
          height: "100vh",
          color: "#FFFFFF",
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
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Student List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="teachers">
              <ListItemIcon sx={{ color: "inherit" }}>
                <Face4Icon />
              </ListItemIcon>
              <ListItemText primary="Teacher List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="classes">
              <ListItemIcon sx={{ color: "inherit" }}>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="grades">
              <ListItemIcon sx={{ color: "inherit" }}>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Grades" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="settings">
              <ListItemIcon sx={{ color: "inherit" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="family-tree">
              <ListItemIcon sx={{ color: "inherit" }}>
                <FamilyIcon />
              </ListItemIcon>
              <ListItemText primary="Family tree" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="learning-material">
              <ListItemIcon sx={{ color: "inherit" }}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Learning material" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="calendar">
              <ListItemIcon sx={{ color: "inherit" }}>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </div>
  );
};

export default NavBar;
