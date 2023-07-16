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
        height: "45vw",
        margin: "auto",
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

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "55vw",
              height: "14vw",
            }}
          >
            <DataTableUser data={data} />
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "55vw",
              height: "30vw",
            }}
          >
            Informacion de la comunidad2
          </Card>
        </Grid>
      </Grid>
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
              style={{ textDecoration: "none" }}
              to="/login/user/crear"
            >
             <Button variant="contained" fullWidth>                Crear Incidencia
              </Button>
            </Link>
          </Card>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="column">
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
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default AccesoUsuario;
