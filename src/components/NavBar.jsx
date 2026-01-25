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
import { Link } from "react-router-dom";

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
            <ListItemButton component={Link} to="dashboard">
              <ListItemIcon sx={{ color: "inherit" }}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="students">
              <ListItemIcon sx={{ color: "inherit" }}>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Student List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="teachers">
              <ListItemIcon sx={{ color: "inherit" }}>
                <Face4Icon />
              </ListItemIcon>
              <ListItemText primary="Teacher List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="classes">
              <ListItemIcon sx={{ color: "inherit" }}>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="grades">
              <ListItemIcon sx={{ color: "inherit" }}>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Grades" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="settings">
              <ListItemIcon sx={{ color: "inherit" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="family-tree">
              <ListItemIcon sx={{ color: "inherit" }}>
                <FamilyIcon />
              </ListItemIcon>
              <ListItemText primary="Family tree" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="learning-material">
              <ListItemIcon sx={{ color: "inherit" }}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Learning material" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="calendar">
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
