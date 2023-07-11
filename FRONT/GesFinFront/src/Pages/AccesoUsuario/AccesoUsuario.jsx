import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

function AccesoUsuario() {
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
        Informacion de la comunidad
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
                height: "10vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/user/crear"
              >
                <Button variant="contained" DisableElevation>
                  Crear Incidencia
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
                height: "10vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/user/ver"
              >
                <Button variant="contained" DisableElevation>
                  Ver Estado de Incidencias
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
                height: "10vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login/user/historico"
              >
                <Button variant="contained" DisableElevation>
                  Historico
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
                height: "10vw",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/"
              >
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

export default AccesoUsuario;
