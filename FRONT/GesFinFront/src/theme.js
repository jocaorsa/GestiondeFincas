
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main:"#616A6B"
      /* main: "#3f51b5", */ 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
        contained: {
          backgroundColor: "#616A6B", 
          "&:hover": {
            backgroundColor: "#989898", 
          },
        },
      },
    },
  },
});

export default theme;
