import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./logo.png";

import { useNavigate } from "react-router-dom";

const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const Navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("currRole")
    Navigate("/");
    window.location.reload();
    
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      bgcolor={colors.primary[400]}
    >
      {/* SEARCH BAR */}
      <Box display="flex" pl={5}>
        <img style={{ width: "50px", height: "40px" }} src={logo} alt="Logo" />
      </Box>
      <Box
        display="flex"
        backgroundColor={colors.primary[300]}
        borderRadius="3px"
      >
        <InputBase
          size="small"
          sx={{ ml: 2, borderRadius: 300 }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" justifyContent="space-between">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            Navigate("/notifications");
          }}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={logoutHandler}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
