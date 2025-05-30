import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Header fijo arriba */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar temporal para móviles */}
      {isMobile ? (
        <Drawer
          anchor="left"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: theme.palette.secondary.main,
              boxSizing: "border-box",
              borderRight: "none",
              transition: "transform 0.3s ease-in-out",
              marginTop: "112px", 
              height: "calc(100% - 112px)",
            },
          }}
        >
          <Sidebar isOpen={mobileOpen} setIsOpen={setMobileOpen} />
        </Drawer>
      ) : (
        // Sidebar permanente en desktop
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: theme.palette.secondary.main,
              boxSizing: "border-box",
              transition: "transform 0.3s ease-in-out",
            },
          }}
          open
        >
          <Sidebar isOpen={mobileOpen} setIsOpen={setMobileOpen} />
        </Drawer>
      )}

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: isMobile ? "112px" : "64px", 
          p: 2,
          ...(isMobile ? {} : { width: `calc(100% - ${drawerWidth}px)` }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
