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
import { getAllComunidades } from "../../../services/comunidad.service";
import { Link } from "react-router-dom";
import ModalCrearComunidad from "../../../components/ModalComunidad/NuevaComunidadModal";
import Search from "../../../components/Search/search";
import SpringComunidadModal from "../../../components/ModalComunidad/SpringComunidadModal";
import { getOneUser } from "../../../services/usuario.service";

export default function DataTableComunidades({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUser(); // Obtén los datos del usuario
    setUser(userData);
  };

  const showComunidades = async () => {
    const data = await getAllComunidades();
    setComunidades(data);
  };

  useEffect(() => {
    showUser(); // Llama a la función para obtener los datos del usuario
    showComunidades();
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
      const filteredComunidades = comunidades.filter((ele) => {
        return Object.values(ele).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      });
      return filteredComunidades.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="small" component="th" scope="ele">
              {ele.nombre}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.direccion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_com}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.cif}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.per_contacto}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.ascensor}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.localizacion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.img}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.seguro_id}
            </TableCell> */}
            <TableCell>
              <SpringComunidadModal
                comunidad={ele}
                hadleUpdate={handleUpdate}
              />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return comunidades.map((ele) => {
        console.log(ele);
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="small" component="th" scope="ele">
              {ele.nombre}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.direccion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_com}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.cif}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.per_contacto}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.ascensor}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.localizacion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.img}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.seguro_id}
            </TableCell> */}
            <TableCell>
              <SpringComunidadModal
                comunidad={ele}
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
        <TableContainer component={Paper} style={{ height: 400 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell size="small" align="right">
                  Nombre
                </TableCell>
                <TableCell size="small" align="right">
                  Direccion
                </TableCell>
                <TableCell size="small" align="right">
                  Telefono
                </TableCell>
                <TableCell size="small" align="right">
                  Cif
                </TableCell>
                <TableCell size="small" align="right">
                  Contacto
                </TableCell>
                <TableCell size="small" align="right">
                  Ascensor
                </TableCell>
                <TableCell size="small" align="right">
                  Localizacion
                </TableCell>
                <TableCell size="small" align="right">
                  IMG
                </TableCell>
                {/* <TableCell size="small" align="right">
                  Seguro
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        <Button>
          <ModalCrearComunidad handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
