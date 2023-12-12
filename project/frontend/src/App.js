import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import TopBar from "./master/global/TopBar";
import CustomSidebar from "./master/global/Sidebar";
import Dashboard from "./master/dashboard/index";
import Category from "./master/pages/category";
// import Team from "./master/team";
// import Invoices from "./master/invoices";
// import Contacts from "./master/contacts";
// import Bar from "./master/bar";
// import Form from "./master/form";
// import Line from "./master/line";
// import Pie from "./master/pie";
// import FAQ from "./master/faq";
// import Geography from "./master/geography";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <CustomSidebar isSidebar={isSidebar} />
          <main className="content">
            <TopBar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
