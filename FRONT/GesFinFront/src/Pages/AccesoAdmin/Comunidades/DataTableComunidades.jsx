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
            <TableCell size="medium" component="th" scope="ele">
              <Typography fontSize={18}>{ele.nombre}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.direccion}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.tlf_com}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.cif}</Typography>
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.per_contacto}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.ascensor}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.localizacion}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.img}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.seguro_id}</Typography>
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
            <TableCell size="medium" component="th" scope="ele">
              <Typography fontSize={18}>{ele.nombre}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.direccion}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.tlf_com}</Typography>
            </TableCell>
            <TableCell size="medium" align="right">
              <Typography fontSize={18}>{ele.cif}</Typography>
            </TableCell>
            {/*  <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.per_contacto}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.ascensor}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.localizacion}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.img}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.seguro_id}</Typography>
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
        <TableContainer component={Paper} style={{ height: 500 }}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell size="medium" align="center">
                   <Typography fontSize={20}>Nombre</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                   <Typography fontSize={20}>Direccion</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                   <Typography fontSize={20}>Telefono</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                   <Typography fontSize={20}>Cif</Typography>
                </TableCell>
                {/* <TableCell size="medium"
    align="right">
                  <Typography fontSize={20}> Contacto</Typography>
                </TableCell>
                <TableCell size="medium"
    align="right">
                   <Typography fontSize={20}>Ascensor</Typography>
                </TableCell>
                <TableCell size="medium"
    align="right">
                   <Typography fontSize={20}>Localizacion</Typography>
                </TableCell>
                <TableCell size="medium"
    align="right">
                   <Typography fontSize={20}>IMG</Typography>
                </TableCell> */}
                <TableCell size="medium" align="right"></TableCell>
                <TableCell size="medium" align="right"></TableCell>
                {/* <TableCell size="medium"
    align="right">
                   <Typography fontSize={20}>Seguro</Typography>
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
