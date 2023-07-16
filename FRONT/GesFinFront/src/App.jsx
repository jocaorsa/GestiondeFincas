import './App.css'
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Importa tu tema personalizado

import router from './Router/index'
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </>

  );
}

export default App
