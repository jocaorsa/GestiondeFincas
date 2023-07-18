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
import { getAllProveedores } from "../../../services/proveedor.service";
import { Link } from "react-router-dom";
import ModalCrearProveedor from "../../../components/ModalProveedores/NuevoProveedorModal";
import Search from "../../../components/Search/search";
import SpringProveedorModal from "../../../components/ModalProveedores/SpringProveedorModal";
import { getOneUser } from "../../../services/usuario.service";

export default function DataTableProveedores({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUser(); // Obtén los datos del usuario
    setUser(userData);
  };
  const showProveedores = async () => {
    const data = await getAllProveedores();
    setProveedores(data);
  };
  console.log(proveedores)
  useEffect(() => {
    showProveedores();
    showUser();

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

  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    if (query.length > 0) {
      const filteredProveedores = proveedores.filter((ele) => {
        return Object.values(ele).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      });
      return filteredProveedores.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="medium"
    > component="th" scope="ele">
              {ele.nombre}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.direccion}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.tlf_prov}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.cif}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.per_contacto}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.email}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.puntuacion}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.servicio}
            </TableCell>
            <TableCell>
              <SpringProveedorModal user={ele} hadleUpdate={handleUpdate} />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return proveedores.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ele" size="medium"
    >
              {ele.nombre}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.direccion}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.tlf_prov}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.cif}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.per_contacto}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.email}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.puntuacion}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.servicio}
            </TableCell>
            <TableCell>
              <SpringProveedorModal proveedor={ele} hadleUpdate={handleUpdate} />
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
          width="100%"
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
        <TableContainer component={Paper} style={{ height: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell size="medium" align="right">
                  Nombre
                </TableCell>
                <TableCell size="medium" align="right">
                  Direccion
                </TableCell>
                <TableCell size="medium" align="right">
                  Telefono
                </TableCell>
                <TableCell size="medium" align="right">
                  Cif
                </TableCell>
                <TableCell size="medium" align="right">
                  Contacto
                </TableCell>
                <TableCell size="medium" align="right">
                  Email
                </TableCell>
                <TableCell size="medium" align="right">
                  Puntuacion
                </TableCell>
                <TableCell size="medium" align="right">
                  Servicio
                </TableCell>
                <TableCell size="medium" align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        <Button>
          <ModalCrearProveedor handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
