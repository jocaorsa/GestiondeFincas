import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTableSeguros from "./DataTableSeguros";

function Seguros() {
  const [data, setData] = useState([]);

  const handleData = async () => {
    const seguro = await find();
    setData(seguro);
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "70%" }}>
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
            <Box width="100%">
              <Link to="/login/admin/incidencias" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Incidencias
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box width="100%">
              <Link to="/login/admin/comunidades" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Comunidades
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box width="100%">
              <Link to="/login/admin/usuarios" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Usuarios
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box width="100%">
              <Link to="/login/admin/seguros" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Seguros
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box width="100%">
              <Link to="/login/admin/proveedores" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Proveedores
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box width="100%">
              <Link to="/login/admin/propiedades" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  Propiedades
                  </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ flexGrow: 1, p: 4 }}>
        <Card sx={{ mt: 4, minHeight: "60vh" }}>
          <DataTableSeguros data={data} />
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
    </Box>
  );
}

export default Seguros;
