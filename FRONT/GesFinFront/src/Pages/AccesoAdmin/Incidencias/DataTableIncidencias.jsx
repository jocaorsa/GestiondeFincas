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
import { getOneUserAll } from "../../../services/usuario.service";

export default function DataTableIncidencia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [incidencia, setIncidencia] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUserAll();
    setUser(userData);
  };

  const showIncidencias = async () => {
    const data = await getAllIncidenciasAll();
    console.log(data);
    setIncidencia(data);
  };

  useEffect(() => {
    showUser();
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
            key={ele._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {incidencia}
            <TableCell size="medium" component="th" scope="ele">
             <Typography fontSize={18}> {ele.num_incidencia}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
             <Typography fontSize={18}> {ele.comunidad_id?.nombre}</Typography>
            </TableCell>
            {/*  <TableCell size="medium" align="right">
             <Typography fontSize={18}> {ele.propiedad_id}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium" align="right">
             <Typography fontSize={18}> {ele.email}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium" align="right">
             <Typography fontSize={18}> {ele.seguro}</Typography>
            </TableCell> */}
            <TableCell
              size="medium"
            
              align="right"
              style={{ color: getStatusColor(ele.estado) }}
            >
             <Typography fontSize={18}> {ele.estado}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
             <Typography fontSize={18}> {ele.descripcion}</Typography>
            </TableCell>
            {/* <TableCell size="medium" align="right">
             <Typography fontSize={18}> {ele.img}</Typography>
            /* </TableCell> 
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.proveedor_id.nombre}</Typography>
          </TableCell> */}
            <TableCell >
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
            key={ele._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ele" size="medium">
              <Typography fontSize={18}>{ele.num_incidencia}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.comunidad_id?.nombre}</Typography>
            </TableCell>
            {/* <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.propiedad_id}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.fecha_creacion}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.seguro}</Typography>
            </TableCell> */}
            <TableCell
              size="medium"
              align="right"
            
              style={{ color: getStatusColor(ele.estado) }}
            >
              <Typography fontSize={18}>{ele.estado}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.descripcion}</Typography>
            </TableCell>
            {/*   <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.img}</Typography>
            </TableCell> */}
            {/*  <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.proveedor_id.nombre}</Typography>
            </TableCell> */}
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
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          width="60vw"
        >
          <Grid item padding={2}>
            <Typography variant="h5" gutterBottom>
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
        <TableContainer component={Paper} style={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell size="medium">
                  <Typography fontSize={20}>Num incidencia</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Comunidad</Typography>
                </TableCell>
                {/* <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Propiedad</Typography>
                </TableCell> */}
                {/* <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Fecha de Creacion</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Seguro</Typography>
                </TableCell> */}
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Estado</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Descripcion</Typography>
                </TableCell>
                <TableCell
                  size="medium"
                  align="right"
                
                ></TableCell>
                {/*  <TableCell size="medium" align="right">
                  Img
                </TableCell>
                <TableCell size="medium" align="right">
                  Proveedor
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        {/*         <Link
          to={"/login/admin"}
          style={{ color: "inherit", padding: "5px", textDecoration: "none" }}
        >
         <Button variant="contained" fullWidth>            volver
          </Button>
        </Link> */}
        <Button>
          <ModalCrearIncidencia handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
