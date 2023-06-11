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

import useAuth from "./hooks/useAuth";

import Home from "./components/Home";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import { useState } from "react";

const ROLES = {
  Admin: 2001,
  Moderator: 1984,
  Operator: 5150,
};

function App() {
  const [theme, colorMode] = useMode();
  // const {auth, setAuth } = useAuth;
  const [currRole, setCurrRole] = useState(0);
  console.log(currRole);

  if (currRole === 2001) {
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
              <Route path="/addStock" element={<AddStockPage />} />
              <Route path="/makeBill" element={<MakeBillPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
            </Routes>

            {/* <Sidebar  /> 
           
            <main className="content">
              <Topbar  />
              
            </main> */}
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

            {/* <Sidebar  /> 
           
            <main className="content">
              <Topbar  />
              
            </main> */}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
}

export default App;
