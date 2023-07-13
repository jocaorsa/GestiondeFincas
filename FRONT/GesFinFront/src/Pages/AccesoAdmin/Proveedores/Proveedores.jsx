import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTableProveedores from "./DataTableProveedores";

function Proveedores() {
      const [data, setData] = useState([]);

      const handleData = async () => {
        const comunidad = await find();
        setData(comunidad);
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
        <DataTableProveedores data={data} />
      </Card>
    </Box>
  );
}

export default Proveedores;
