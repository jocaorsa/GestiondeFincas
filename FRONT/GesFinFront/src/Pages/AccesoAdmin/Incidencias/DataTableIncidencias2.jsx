import * as React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllIncidenciasAll } from "../../../services/incidencia.service";
import { Link } from "react-router-dom";
import ModalCrearIncidencia from "../../../components/ModalIncidencia/NuevaIncidenciaModal";
import Search from "../../../components/Search/search";
import SpringIncidenciaModal from "../../../components/ModalIncidencia/SpringIncidenciaModal";
import { getOneUser } from "../../../services/usuario.service";

export default function DataTableIncidencia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [incidencia, setIncidencia] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUser(); // Obtén los datos del usuario
    setUser(userData);
  };

  const showIncidencias = async () => {
    const data = await getAllIncidenciasAll();
    console.log(data);
    setIncidencia(data);
  };

  useEffect(() => {
    showUser(); // Llama a la función para obtener los datos del usuario
    showIncidencias();
  }, [actualizar]);

  const handleUpdate = () => {
    setActualizar(!actualizar);
  };
  const handleCreate = () => {
    setActualizar(!actualizar);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getStatusColor = (status) => {
    if (status === "Nueva") {
      return "green";
    } else if (status === "En Proceso") {
      return "orange";
    } else if (status === "Terminada") {
      return "red";
    }
    return "";
  };

  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    if (query.length > 0) {
      const filteredIncidencia = incidencia.filter((ele) => {
        return Object.values(ele).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      });
      return filteredIncidencia.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {incidencia}
            <TableCell size="small" component="th" scope="ele">
              {ele.num_incidencia}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id.nombre}
            </TableCell>
            {/*  <TableCell size="small" align="right">
              {ele.propiedad_id}
            </TableCell> */}
            <TableCell size="small" align="right">
              {ele.email}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.seguro}
            </TableCell>
            <TableCell
              size="small"
              align="right"
              style={{ color: getStatusColor(ele.estado) }}
            >
              {ele.estado}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.descripcion}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.img}
            </TableCell> */}
            <TableCell size="small" align="right">
              {ele.proveedor_id.nombre}
            </TableCell>
            <TableCell>
              <SpringIncidenciaModal
                incidencia={ele}
                hadleUpdate={handleUpdate}
              />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return incidencia.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ele" size="small">
              {ele.num_incidencia}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id.nombre}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.propiedad_id}
            </TableCell> */}
            <TableCell size="small" align="right">
              {ele.fecha_creacion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.seguro}
            </TableCell>
            <TableCell
              size="small"
              align="right"
              style={{ color: getStatusColor(ele.estado) }}
            >
              {ele.estado}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.descripcion}
            </TableCell>
            {/*   <TableCell size="small" align="right">
              {ele.img}
            </TableCell> */}
            <TableCell size="small" align="right">
              {ele.proveedor_id.nombre}
            </TableCell>
            <TableCell>
              <SpringIncidenciaModal
                incidencia={ele}
                hadleUpdate={handleUpdate}
              />
            </TableCell>
          </TableRow>
        );
      });
    }
  };

  return (
    <>
      <div>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {user && `Bienvenido, ${user.name}`}
            </Typography>
          </Grid>
          <Grid item>
            <Search
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper} style={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell size="small">Num incidencia</TableCell>
                <TableCell size="small" align="right">
                  Comunidad
                </TableCell>
                {/* <TableCell size="small" align="right">
                  Propiedad
                </TableCell> */}
                <TableCell size="small" align="right">
                  Fecha de Creacion
                </TableCell>
                <TableCell size="small" align="right">
                  Seguro
                </TableCell>
                <TableCell size="small" align="right">
                  Estado
                </TableCell>
                <TableCell size="small" align="right">
                  Descripcion
                </TableCell>
                {/*  <TableCell size="small" align="right">
                  Img
                </TableCell> */}
                <TableCell size="small" align="right">
                  Proveedor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        {/* <Link
          to={"/login/admin"}
          style={{ color: "inherit", padding: "5px", textDecoration: "none" }}
        >
          <Button variant="contained" DisableElevation>
            volver
          </Button>
        </Link> */}
        <Button>
          <ModalCrearIncidencia handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
