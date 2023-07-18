import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DataTableUser from "./DataTableUser";

function AccesoUsuario() {
  const [data, setData] = useState([]);

  const handleData = async () => {
    const user = await find();
    setData(user);
  };
  
  useEffect(() => {
    handleData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F5F5F5",
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        sx={{
          flex: "0 0 20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url(https://source.unsplash.com/random?buildings)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(70%)",
          }}
        />
      </Card>

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Card sx={{ mt: 4, minHeight: "60vh" }}>
          <DataTableUser data={data} />
        </Card>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" DisableElevation>
              Cerrar sesión
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default AccesoUsuario;
