import './App.css'
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Importa tu tema personalizado
import router from './Router/index'
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

function App() {
    const cld = new Cloudinary({ cloud: { cloudName: "da8ojgryp" } });

  return (
    <>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </>

  );
}

export default App
