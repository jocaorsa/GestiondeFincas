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
    console.log(data)
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
            <TableCell size="medium"
    component="th" scope="ele">
              <Typography fontSize={18}>{ele.tipo_propiedad}</Typography>
            </TableCell>
            <TableCell style={{ width: '15%' }} align="right">
              <Typography fontSize={18}>{ele.piso}</Typography>
            </TableCell>
            <TableCell style={{ width: '15%' }} align="right">
              <Typography fontSize={18}>{ele.num}</Typography>
            </TableCell>
            <TableCell style={{ width: '15%' }} align="right">
              <Typography fontSize={18}>{ele.letra}</Typography>
            </TableCell>
            <TableCell style={{ width: '15%' }} align="right">
              <Typography fontSize={18}>{ele.comunidad_id[0].nombre}</Typography>
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
            <TableCell component="th" scope="ele" size="medium"
    >
              <Typography fontSize={18}>{ele.tipo_propiedad}</Typography>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              <Typography fontSize={18}>{ele.piso}</Typography>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              <Typography fontSize={18}>{ele.num}</Typography>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
              <Typography fontSize={18}>{ele.letra}</Typography>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="right">
             <Typography fontSize={18}>{ele.comunidad_id[0].nombre}</Typography>
            </TableCell>
            <TableCell>
              <SpringPropiedadModal
                propiedad={ele}
                hadleUpdate={handleUpdate}
              />
            </TableCell>
          </TableRow>
        );
      });
    }
  };
const tableContainerStyle = {
  height: "100%",
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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell size="medium">
                  <Typography fontSize={20}>Tipo de Propiedad</Typography>
                </TableCell>
                <TableCell style={{ width: "15%" }} align="right">
                  <Typography fontSize={20}>Piso</Typography>
                </TableCell>
                <TableCell style={{ width: "15%" }} align="right">
                  <Typography fontSize={20}>Numero</Typography>
                </TableCell>
                <TableCell style={{ width: "15%" }} align="right">
                  <Typography fontSize={20}>Letra</Typography>
                </TableCell>
                <TableCell style={{ width: "15%" }} align="right">
                  <Typography fontSize={20}>Comunidad</Typography>
                </TableCell>
                <TableCell style={{ width: "15%" }} align="right"></TableCell>
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
