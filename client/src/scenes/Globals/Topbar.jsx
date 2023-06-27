import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import logo from "./logo.png";
import avatar from "./avatar.png";
import axios from "../../api/axios";


import {InputLabel,Input,FormControl} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationPopupBox from "../../components/NotificationPopupBox";

const Topbar = () => {
  const [currTab, setCurrtab] = useState("stock");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const Navigate = useNavigate();
  const [lessStock, setLessStock] = useState([]);
  const [soonExpiryStock, setSoonExpiryStock] = useState([]);


  const [title, setTitle]=useState("");
  useEffect(() => {
    let res = axios
      .get("http://localhost:3500/lessStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        console.log(response.data);
        setLessStock(response.data);
      });

    axios
      .get("http://localhost:3500/soonExpiryStock", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        console.log(response.data);
        setSoonExpiryStock(response.data);
      });
  }, []);
  // const logoutHandler = () => {
  //   localStorage.removeItem("userName");
  //   localStorage.removeItem("currRole");
  //   Navigate("/");
  //   window.location.reload();
  // };

  return (
    <>
      {/* Notifiaction PopUp */}

      {showNotification && (
        <Box
          width="250px"
          height="420px"
          position={"absolute"}
          zIndex={12}
          left="49.5%"
          top="10%"
          borderRadius="20px"
          bgcolor="#3e3e3e"
          border="1px solid #333333"
        >
          <Box
            height="10%"
            width="100%"
            display={"flex"}
            bgcolor="black"
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="20px 20px 0 0"
          >
            <Typography
              variant="h4"
              style={{ fontWeight: "600", color: "white" }}
            >
              Notifications
            </Typography>
          </Box>

  

          <Box height="80%" width="100%" overflow="scroll">
            {lessStock.map((item) => {
              if (item.productname !== "" && item.currentstock !== "") {
                return (
                  <NotificationPopupBox
                    name={item.productname}
                    type={"LESS STOCK"}
                    data={item.currentstock}
                  />
                );
              }
            })}
            {soonExpiryStock.map((item) => {
              if (item.productname !== "" && item.exp !== "") {
                return (
                  <NotificationPopupBox
                    name={item.productname}
                    type={"EXPIRY"}
                    data={item.exp}
                  />
                );
              }
            })}
          </Box>
          <Box
            height="10%"
            width="100%"
            display={"flex"}
            bgcolor="black"
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="0 0 20px 20px"
          >
            <Typography
              variant="h4"
              style={{ cursor: "pointer", color: "#3da58a" }}
              onClick={() => {
                setShowNotification(false);
                Navigate("/notifications");
              }}
            >
              View All
            </Typography>
          </Box>
        </Box>
      )}

      {/* Profile PopUp */}
      {showProfile && (
        <Box
          width="250px"
          height="420px"
          position={"absolute"}
          zIndex={12}
          left="78%"
          top="1%"
          borderRadius="20px"
          bgcolor="#3e3e3e"
        >
          <Box
            height="20%"
            display={"flex"}
            bgcolor="#212121"
            px={3}
            py={1}
            borderRadius="20px 20px 0 0"
          >
            <Box width="30%" p={0} sx={{ cursor: "pointer" }}>
              <img
                style={{ width: "100%", height: "60px" }}
                src={avatar}
                alt="avatar"
                onClick={() => {
                  setShowProfile(false);
                }}
              />
            </Box>

            <Box
              width="55%"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h5">abhay@drip</Typography>
            </Box>
          </Box>
          <Box height="80%">
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <AccountBalanceOutlinedIcon color="white" />
              <Typography variant="h6">Bank</Typography>
            </Box>
            <Box
              width="100%"
              height="2.5px"
              bgcolor={colors.primary[100]}
            ></Box>
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <StoreMallDirectoryOutlinedIcon color="white" />
              <Typography variant="h6">Store</Typography>
            </Box>
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <ReceiptLongOutlinedIcon color="white" />
              <Typography variant="h6">Order</Typography>
            </Box>
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <BallotOutlinedIcon color="white" />
              <Typography variant="h6">Ledger</Typography>
            </Box>
            <Box
              width="100%"
              height="2.5px"
              bgcolor={colors.primary[100]}
            ></Box>
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <HelpOutlineOutlinedIcon color="white" />
              <Typography variant="h6">Help & Support</Typography>
            </Box>
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <SettingsOutlinedIcon color="white" />
              <Typography variant="h6">Setting</Typography>
            </Box>
            <Box
              width="100%"
              height="2.5px"
              bgcolor={colors.primary[100]}
            ></Box>
            <Box
              py={1.5}
              px={5}
              display={"flex"}
              gap={3}
              sx={{ cursor: "pointer" }}
            >
              <LogoutOutlinedIcon color="white" />
              <Typography variant="h6">Logout</Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Main TopBar */}

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
              style={{ width: "110px", height: "65px" }}
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
                setShowNotification(!showNotification);
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
            <Box display="flex" sx={{ cursor: "pointer", zIndex: "10" }}>
              <img
                style={{ width: "60px", height: "60px" }}
                src={avatar}
                alt="avatar"
                onClick={() => {
                  setShowProfile(true);
                }}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <IconButton
              onClick={colorMode.toggleColorMode}
              style={{ width: "2px" }}
            >
              {/* {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )} */}
              <ToggleOffOutlinedIcon color="white" />
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
