import { Box, Button, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import DataTableIncidencias2 from "../../Pages/AccesoAdmin/Incidencias/DataTableIncidencias2";
import { useEffect } from "react";
import { useState } from "react";
import { getOneUser } from "../../services/usuario.service";

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
    <Box sx={{ display: "flex", heigh:"70%" }}>
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
            backgroundImage: "url(https://source.unsplash.com/random?buildings)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(70%)",
          }}
        />
      </Card>

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/login/admin/incidencias" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Incidencias
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/login/admin/comunidades" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Comunidades
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/login/admin/usuarios" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Usuarios
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/login/admin/seguros" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Seguros
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/login/admin/proveedores" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Proveedores
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/login/admin/propiedades" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Propiedades
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                fullWidth
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" mb={2}>
            Datos de Usuario
          </Typography>
          <Typography variant="body1" mb={2}>
            Nombre: {userData.name}
          </Typography>
        </Box>
        <Card sx={{ mt: 4, minHeight: "60vh" }}>
          <DataTableIncidencias2 data={data} />
        </Card>
      </Box>
    </Box>
  );
}

export default AccesoAdmin;
