import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DataTableUser from "./DataTableUser";
import logo from "../../../public/GF.png";

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
        margin: "0 auto",
        display: "flex",
        backgroundColor: "#F5F5F5",
        width: "75vw",
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
              "url(https://source.unsplash.com/random?house)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <img src={logo} width={200}></img>
          {/*      <h1>#GesFin</h1>
          <p>Gestor de Incidencias</p> */}
        </div>
      </Card>

      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" DisableElevation>
              Cerrar sesión
            </Button>
          </Link>
        </Box>
        <Card sx={{ mt: 4, minHeight: "60vh" }}>
          <DataTableUser data={data} />
        </Card>
      </Box>
    </Box>
  );
}

export default AccesoUsuario;
