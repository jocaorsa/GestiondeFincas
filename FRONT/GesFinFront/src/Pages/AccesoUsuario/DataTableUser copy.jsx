import * as React from "react";
import NuevaIncidenciaModal from "../../Pages/AccesoUsuario/CrearIncidencia/NuevaIncidenciaModal";

import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getOneUserAll } from "../../services/usuario.service";
import { Link } from "react-router-dom";
import ModalCrearIncidencia from "../../Pages/AccesoUsuario/CrearIncidencia/NuevaIncidenciaModal";

export default function DataTableUser({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(undefined);
  const [actualizar, setActualizar] = useState(false);

  const showUser = async () => {
    const userData = await getOneUserAll(data.userId); // 
    setUser(userData);
  };

  useEffect(() => {
    showUser();
  }, [actualizar]);

  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    if (query.length > 0) {
      // Código omitido para simplificar
    } else {
      return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row" size="small">
            {user.name}
          </TableCell>
          <TableCell size="small" align="right">
            {user.apellidos}
          </TableCell>
          <TableCell size="small" align="right">
            {user.tlf_usu}
          </TableCell>
          <TableCell size="small" align="right">
            {user.email}
          </TableCell>
          <TableCell size="small" align="right">
            {user.role}
          </TableCell>
          <TableCell size="small" align="right">
            {user.comunidad_id.nombre}
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <Grid item>
        <Card>
          {user && (
            <Typography variant="h6" gutterBottom>
              Bienvenido, {user.name}
            </Typography>
          )}
          <TableContainer component={Paper} style={{ height: 400 }}>
          </TableContainer>
          <Link
            to={"/login/user"}
            style={{ color: "inherit", padding: "5px", textDecoration: "none" }}
          ></Link>
        <Card>
        </Card>
        <ModalCrearIncidencia />
        </Card>
      </Grid>
    </>
  );
}
