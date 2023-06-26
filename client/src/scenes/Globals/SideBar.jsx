import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import {  useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FolderIcon from "@mui/icons-material/Folder";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();

  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        Navigate(to);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};
const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [addingType,setAddingType]=useState(false);
  const Navigate = useNavigate();
  //////////////////////////////
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    await axios.post("http://localhost:3500/uploadImage", formData, {
      params: { userId: localStorage.getItem("userName") },
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3500/getImageData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        setImageUrl(response.data);
      });
  }, []);
  /////////////

  const logoutHandler = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("currRole");
    Navigate("/");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        "& .css-dip3t8": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button": {
          backgroundColor: "transparent !important",
        },
        "& .ps-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
        },
        "& .ps-active": {
          color: "#6870fa !important",
        },
        "& .css-1wvake5": {
          border : "black !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {imageUrl && (
                  <img
                    src={`http://localhost:3500/${imageUrl}`}
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                )}
                {!imageUrl && (
                  <Box alignItems={"center"} justifyContent={"center"}>
                    <InputBase
                      style={{ paddingLeft: "30px" }}
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                      type="file"
                    ></InputBase>
                    <Button
                      style={{ paddingLeft: "70px" }}
                      color="secondary"
                      onClick={handleSubmit}
                    >
                      Upload Image
                    </Button>
                  </Box>
                )}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Hello!!
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {localStorage.getItem("userName")}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Quick Access
            </Typography> */}

            <Item
              title="Inventory"
              to="/inventory"
              icon={<FolderIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Add Stock"
             
              icon={<AddBoxIcon onClick={()=>{setAddingType(!addingType)}} />}
              selected={selected}
              setSelected={setSelected}
            />
          {addingType&&
          <>
          <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "5px 0 5px 20px", cursor:"pointer" }}
              onClick={()=>Navigate("/addStock")}
              
            >
              Manual
            </Typography>
             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 25px 20px",cursor:"pointer" }}
              onClick={()=>Navigate("/importData")}
            >
              Import
            </Typography>
          </>
          
          }
            
            

            <Item
              title="Add Bill"
              to="/makeBill"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
            <Item
              title="Invoices Balances"
              to="/"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Options
            </Typography> */}
            <Item
              title="Manage Debt"
              to="/debt"
              icon={<AttachFileIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 190px 20px" }}
            >
              
            </Typography>
            <Item
              title="LogOut"
              icon={<PowerSettingsNewIcon  onClick={logoutHandler} />}
              selected={selected}
              setSelected={setSelected}
              onClick={logoutHandler}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
