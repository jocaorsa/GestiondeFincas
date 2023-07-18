import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTableUsuarios from "./DataTableUsuarios";
import logo from "../../../../public/GF.png";

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
                "url(https://source.unsplash.com/random?person)",
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
        <Box sx={{ flexGrow: 0, p: 1 }}>
          {/* First row of buttons */}
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <Link
                  to="/login/admin/incidencias"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" fullWidth>
                    Incidencias
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <Link
                  to="/login/admin/comunidades"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" fullWidth>
                    Comunidades
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <Link
                  to="/login/admin/usuarios"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" fullWidth>
                    Usuarios
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>

          {/* Second row of buttons */}
          <Grid
            container
            spacing={1}
            mt={0}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <Link
                  to="/login/admin/seguros"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" fullWidth>
                    Seguros
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <Link
                  to="/login/admin/proveedores"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" fullWidth>
                    Proveedores
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <Link
                  to="/login/admin/propiedades"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" fullWidth>
                    Propiedades
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Grid
              container
              spacing={3}
              justifyContent="right"
              alignItems="right"
            >
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button variant="contained" DisableElevation>
                      Cerrar sesión
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, p: 4 }}>
            <Card sx={{ mt: 4, minHeight: "60vh" }}>
              <DataTableUsuarios data={data} />
            </Card>
          </Box>
        </Box>
      </Box>
    );
}

export default Usuarios;
