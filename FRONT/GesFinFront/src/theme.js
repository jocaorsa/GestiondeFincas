
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Cambia el color principal aquí
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Ajusta el radio de los bordes aquí
        },
        contained: {
          backgroundColor: "#424949", // Cambia el color de fondo aquí
          "&:hover": {
            backgroundColor: "#616A6B", // Cambia el color de fondo al pasar el ratón por encima aquí
          },
        },
      },
    },
  },
});

export default theme;
