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
import { getAllPropiedad } from "../../../services/propiedad.service";
import { Link } from "react-router-dom";
import ModalCrearPropiedad from "../../../components/ModalPropiedad/NuevoPropiedadModal";
import Search from "../../../components/Search/search";
import SpringPropiedadModal from "../../../components/ModalPropiedad/SpringPropiedadModal";
import { getOneUser } from "../../../services/usuario.service";

export default function DataTablePropiedad({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [propiedades, setPropiedades] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUser(); // Obtén los datos del usuario
    setUser(userData);
  };

  const showPropiedades = async () => {
    const data = await getAllPropiedad();
    setPropiedades(data);
  };
  console.log(propiedades)
  useEffect(() => {
    showPropiedades();
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
      const filteredPropiedades = propiedades.filter((ele) => {
        return Object.values(ele).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      });
      return filteredPropiedades.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="small" component="th" scope="ele">
              {ele.tipo_propiedad}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.piso}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.num}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.letra}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id}
            </TableCell>
            <TableCell>
              <SpringPropiedadModal propiedad={ele} hadleUpdate={handleUpdate} />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return propiedades.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ele" size="small">
              {ele.tipo_propiedad}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.piso}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.num}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.letra}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id}
            </TableCell>
            <TableCell>
              <SpringPropiedadModal propiedad={ele} hadleUpdate={handleUpdate} />
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
        <TableContainer component={Paper} style={{ height: 400 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell size="small">Tipo de Propiedad</TableCell>
                <TableCell size="small" align="right">
                  Piso
                </TableCell>
                <TableCell size="small" align="right">
                  Numero
                </TableCell>
                <TableCell size="small" align="right">
                  Letra
                </TableCell>
                <TableCell size="small" align="right">
                  Comunidad
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        <Button>
          <ModalCrearPropiedad handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
