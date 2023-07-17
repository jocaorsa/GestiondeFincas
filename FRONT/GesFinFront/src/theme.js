
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
        contained: {
          backgroundColor: "#424949", 
          "&:hover": {
            backgroundColor: "#616A6B", 
          },
        },
      },
    },
  },
});

export default theme;
