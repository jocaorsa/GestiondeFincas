import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTableUsuarios from "./DataTableUsuarios";

function Usuarios() {
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
        height: "45vw",
      }}
    >
      <Card
        sx={{
          display: "flex",
          backgroundImage: "url(https://source.unsplash.com/random?buildings)",
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
      <Card
        sx={{
          display: "flex",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "50vw",
          height: "100%",
        }}
      >
        Pequeño listado de incidencias
        <DataTableUsuarios data={data} />
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to="/login/admin/"
        >
          <Button variant="contained" DisableElevation>
            volver
          </Button>
        </Link>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to="/login/admin/usuarios"
        >
          <Button variant="contained" DisableElevation>
            editar
          </Button>
        </Link>
      </Card>
    </Box>
  );
}

export default Usuarios;
