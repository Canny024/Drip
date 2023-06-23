import {
  Box,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./logo.png";
import avatar from "./avatar.png";

import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [currTab, setCurrtab] = useState("stock");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const Navigate = useNavigate();

  // const logoutHandler = () => {
  //   localStorage.removeItem("userName");
  //   localStorage.removeItem("currRole");
  //   Navigate("/");
  //   window.location.reload();
  // };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="60%"
          height="12vh"
          p={2}
          bgcolor={colors.primary[400]}
        >
          {/* SEARCH BAR */}
          <Box display="flex" pl={5}>
            <img
              style={{ width: "120px", height: "70px" }}
              src={logo}
              alt="Logo"
            />
          </Box>
          <Box
            display="flex"
            backgroundColor={colors.primary[300]}
            justifyContent="space-between"
            width="25vw"
            height="5vh"
            borderRadius="100px"
            fontSize="2px"
          >
            <InputBase
              size="small"
              sx={{ ml: 2, borderRadius: 1000 }}
              placeholder="What are you looking for?"
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          display="flex"
          width="40%"
          justifyContent="space-between"
          height="12vh"
          alignItems="center"
          pl="3vw"
          pr="2vw"
          bgcolor={colors.primary[400]}
        >
          <Box display="flex" gap="1.5vw" justifyContent="space-between">
            <IconButton
              onClick={() => {
                Navigate("/notifications");
              }}
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <WalletIcon />
            </IconButton>
            <IconButton>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" pl={5}>
              <img
                style={{ width: "70px", height: "70px" }}
                src={avatar}
                alt="avatar"
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Below Part */}
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="60%"
          height="6vh"
          p={2}
          bgcolor={colors.primary[400]}
        >
          <Box display="flex" pl={5} gap={3.5}>
            <Box>
              <Typography
                onClick={() => {
                  setCurrtab("stock");
                  Navigate("/dashboard");
                }}
                style={{ cursor: "pointer" }}
                fontSize="4vh"
              >
                Stock
              </Typography>
            </Box>
            <Box>
              <Typography
                onClick={() => {
                  setCurrtab("sale");
                  Navigate("/dashboard");
                }}
                style={{ cursor: "pointer" }}
                fontSize="4vh"
              >
                Sale
              </Typography>
            </Box>
            <Box>
              <Typography
                onClick={() => {
                  setCurrtab("order");
                  Navigate("/makeBill");
                }}
                style={{ cursor: "pointer" }}
                fontSize="4vh"
              >
                Order
              </Typography>
            </Box>
            <Box>
              <Typography
                onClick={() => {
                  setCurrtab("ledger");
                  Navigate("/ledger");
                }}
                style={{ cursor: "pointer" }}
                fontSize="4vh"
              >
                Ledger
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          width="40%"
          justifyContent="space-between"
          height="6vh"
          alignItems="center"
          pl="3vw"
          pr="2vw"
          bgcolor={colors.primary[400]}
        >
          <Box display="flex" gap="1.5vw" justifyContent="space-between">
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={"admin"}
              // onChange={handleChange}
            >
              <FormControlLabel
                value="admin"
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#39ff14",
                      },
                    }}
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                value="moderator"
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#39ff14",
                      },
                    }}
                  />
                }
                label="Moderator"
              />
               <FormControlLabel
                value="operator"
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#39ff14",
                      },
                    }}
                  />
                }
                label="Operator"
              />
            </RadioGroup>
          </Box>
        </Box>
      </Box>

      {/* Progressive Bar */}
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="1vh"
          pl={2}
          pb={1}
          bgcolor={colors.primary[400]}
        >
          <Box display="flex" pl={5}>
            <Box
              bgcolor={
                currTab === "stock" ? colors.primary[100] : colors.primary[300]
              }
              height={4}
              width={97}
            ></Box>
            <Box
              bgcolor={
                currTab === "sale" ? colors.primary[100] : colors.primary[300]
              }
              height={4}
              width={97}
            ></Box>
            <Box
              bgcolor={
                currTab === "order" ? colors.primary[100] : colors.primary[300]
              }
              height={4}
              width={97}
            ></Box>
            <Box
              bgcolor={
                currTab === "ledger" ? colors.primary[100] : colors.primary[300]
              }
              height={4}
              width={97}
            ></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
