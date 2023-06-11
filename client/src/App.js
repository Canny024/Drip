import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/Others/Dashboard";
import Register from "./Validation/Register";
import Login from "./Validation/Login";
import AddStockPage from "./pages/AddStockPage";
import MakeBillPage from "./pages/MakeBillPage"
import InventoryPage from "./pages/InventoryPage";
import NotificationPage from "./pages/NotificationPage"
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addStock" element={<AddStockPage />} />
            <Route path="/makeBill" element={<MakeBillPage/>} />
            <Route path="/inventory" element={<InventoryPage/>} />
            <Route path="/notifications" element={<NotificationPage/>} />

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

export default App;
