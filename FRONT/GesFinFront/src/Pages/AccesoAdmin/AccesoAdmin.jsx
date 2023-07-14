import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import DataTableIncidencias from "../../Pages/AccesoAdmin/Incidencias/DataTableIncidencias";
import { useEffect } from "react";
import { useState } from "react";

function AccesoAdmin() {
   const [data, setData] = useState([]);

   const handleData = async () => {
     const incidencia = await find();
     setData(incidencia);
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
     <DataTableIncidencias data={data} />
     </Card>
      <Card
        sx={{
          display: "flex",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "17vw",
          height: "100%",
        }}
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/incidencias"
              >
                <Button variant="contained" DisableElevation>
                  Incidencias
                </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/comunidades"
              >
                <Button variant="contained" DisableElevation>
                  Comunidades
                </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/usuarios"
              >
                <Button variant="contained" DisableElevation>
                  Usuarios
                </Button>
              </Link>
            </Card>
          </Grid>
          {/* <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/propietarios"
              >
                <Button variant="contained" DisableElevation>
                  Propietarios
                </Button>
              </Link>
            </Card>
          </Grid> */}
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/seguros"
              >
                <Button variant="contained" DisableElevation>
                  Seguros
                </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/proveedores"
              >
                <Button variant="contained" DisableElevation>
                  Proveedores
                </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/admin/propiedades"
              >
                <Button variant="contained" DisableElevation>
                  Propiedades
                </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item>
            <Card
              sx={{
                display: "flex",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "5vw",
              }}
            >
              <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                <Button
                  style={{ color: "inherit", textDecoration: "none" }}
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
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default AccesoAdmin;


