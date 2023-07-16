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
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        margin: "auto",
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "15vw",
          height: "100%",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/">
          <Button
            style={{ textDecoration: "none" }}
            variant="contained"
            DisableElevation
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("id");
              localStorage.removeItem("role");
            }}
          >
            Cerrar sesión
          </Button>
        </Link>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "70vw",
          height: "100%",
        }}
      >
        <DataTableUser data={data} />
      </Card>

      <Card
        sx={{
          display: "flex",
          backgroundImage: "url(https://source.unsplash.com/random?house)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "15vw",
          height: "100%",
        }}
      ></Card>
    </Box>
  );
}

export default AccesoUsuario;
