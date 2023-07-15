import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import DataTableIncidencias2 from "../../Pages/AccesoAdmin/Incidencias/DataTableIncidencias2";
import { useEffect } from "react";
import { useState } from "react";
import {getOneUser} from "../../services/usuario.service";
function AccesoAdmin() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});

  const handleData = async () => {
    const incidencia = await find();
    setData(incidencia);
  };

  const getUserData = async () => {
    const user = { name: "John Doe" };
    setUserData(user);
  };

  useEffect(() => {
    handleData();
    getUserData();
  }, []);

  return (
    <Box
  sx={{
    display: "flex",
    alignItems: "center",
    height: "100%",
  }}
>
<Card
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20vw",
    height: "100%",
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
      backgroundImage: "url(https://source.unsplash.com/random?buildings)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(70%)",
    }}
  />
</Card>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" mt={2}>
          <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/incidencias"
            >
              <Button variant="contained" DisableElevation>
                Incidencias
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/comunidades"
            >
              <Button variant="contained" DisableElevation>
                Comunidades
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/usuarios"
            >
              <Button variant="contained" DisableElevation>
                Usuarios
              </Button>
            </Link>
          </Grid>
          {/* <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/propietarios"
            >
              <Button variant="contained" DisableElevation>
                Propietarios
              </Button>
            </Link>
          </Grid> */}
          <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/seguros"
            >
              <Button variant="contained" DisableElevation>
                Seguros
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/proveedores"
            >
              <Button variant="contained" DisableElevation>
                Proveedores
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/login/admin/propiedades"
            >
              <Button variant="contained" DisableElevation>
                Propiedades
              </Button>
            </Link>
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "69vw",
            height: "80vh",
            mt: 4,
          }}
        >
          <DataTableIncidencias2 data={data} />
        </Card>
      </Box>
    </Box>
  );
}

export default AccesoAdmin;
