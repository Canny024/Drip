import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/Others/Dashboard";
import Register from "./Validation/Register";
import Login from "./Validation/Login";
import AddStockPage from "./pages/AddStockPage";
import MakeBillPage from "./pages/MakeBillPage";
import InventoryPage from "./pages/InventoryPage";
import NotificationPage from "./pages/NotificationPage";
import Topbar from "./scenes/Globals/Topbar";
import SideBar from "./scenes/Globals/SideBar";
import Unauthorized from "./components/Unauthorized";
import { useEffect, useState ,useMemo} from "react";
import ImageUpload from "./pages/ImageUpload";
import ImportData from "./pages/ImportData";
import Team from "./pages/Team";
import Debt from "./pages/Debt";

const ROLES = {
  Admin: 2001,
  Moderator: 1984,
  Operator: 5150,
};

function App() {
  const [theme, colorMode] = useMode();
  var role=localStorage.getItem("currRole");
  if(role===null) role="0";
  const [currRole, setCurrRole] = useState(Number(role));
  console.log(currRole);

  if (currRole === ROLES.Admin) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          
            <SideBar />

            <main className="content">
              <Topbar setCurrRole={setCurrRole} />
              <Routes>
              <Route path="/" element={<Register />} />
              <Route
                path="/login"
                element={<Login setCurrRole={setCurrRole} />}
              />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addStock" element={<AddStockPage />} />
                <Route path="/makeBill" element={<MakeBillPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/image" element={<ImageUpload />} />
                <Route path="/importData" element={<ImportData />} />
                <Route path="/team" element={<Team />}  />
                <Route path="/debt" element={<Debt />}  />

                {/* <Route path="/*" element={<Unauthorized />} /> */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  } else if (currRole == 0) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route
                path="/login"
                element={<Login setCurrRole={setCurrRole} />}
              />
              
               <Route path="/*" element={<Unauthorized />} />
            </Routes>
            <Routes>
            
            </Routes>
           
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  } else if (currRole == ROLES.Moderator) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setCurrRole={setCurrRole} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/addStock" element={<AddStockPage />} />
              <Route path="/makeBill" element={<MakeBillPage/>} />
              <Route path="/inventory" element={<InventoryPage/>} />
              <Route path="/notifications" element={<NotificationPage/>} /> */}
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  } else if (currRole === ROLES.Operator) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setCurrRole={setCurrRole} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/addStock" element={<AddStockPage />} />
              <Route path="/makeBill" element={<MakeBillPage/>} />
              <Route path="/inventory" element={<InventoryPage/>} />
              <Route path="/notifications" element={<NotificationPage/>} /> */}
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
            
    } else {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
            {/* <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setCurrRole={setCurrRole} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addStock" element={<AddStockPage />} />
              <Route path="/makeBill" element={<MakeBillPage/>} />
              <Route path="/inventory" element={<InventoryPage/>} />
              <Route path="/notifications" element={<NotificationPage/>} /> */}
              <Route path="/*" element={<Unauthorized />} />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
}

export default App;
