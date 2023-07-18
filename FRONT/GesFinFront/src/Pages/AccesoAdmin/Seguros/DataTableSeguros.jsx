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
import { getAllSeguros } from "../../../services/seguro.service";
import { Link } from "react-router-dom";
import ModalCrearSeguro from "../../../components/ModalSeguros/NuevoSeguroModal";
import Search from "../../../components/Search/search";
import SpringSeguroModal from "../../../components/ModalSeguros/SpringSeguroModal";
import { getOneUser } from "../../../services/usuario.service";

export default function DataTableSeguros({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [seguros, setSeguros] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUser(); // Obtén los datos del usuario
    setUser(userData);
  };

  const showSeguros= async () => {
    const data = await getAllSeguros();
    setSeguros(data);
  };
  console.log(seguros)
  useEffect(() => {
    showSeguros();
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
      const filteredSeguros = seguros.filter((ele) => {
        return Object.values(ele).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      });
      return filteredSeguros.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="medium"
     component="th" scope="ele">
              <Typography fontSize={18}>{ele.compania}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.poliza}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.tlf_seg}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.fecha_contrato}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.fecha_fin_contrato}</Typography>
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.mediador_id}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.password}</Typography>
            </TableCell> */}
            <TableCell>
              <SpringSeguroModal seguro={ele} hadleUpdate={handleUpdate} />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return seguros.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ele" size="medium"
    >
              <Typography fontSize={18}>{ele.compania}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.poliza}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.tlf_seg}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.fecha_contrato}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.fecha_fin_contrato}</Typography>
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.mediador_id}</Typography>
            </TableCell> */}
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.password}</Typography>
            </TableCell> */}
            <TableCell>
              <SpringSeguroModal seguro={ele} hadleUpdate={handleUpdate} />
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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell size="medium"><Typography fontSize={20}>Compañia</Typography></TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Poliza</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Telefono Seguro</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Fecha Contrato</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Fecha Fin</Typography>
                </TableCell>
                <TableCell size="medium" align="right"></TableCell>
                {/*  <TableCell size="medium"
    align="right">
                  <Typography fontSize={20}>Mediador</Typography>
                </TableCell> */}
                {/* <TableCell size="medium"
    align="right">
                  <Typography fontSize={20}>Contraseña</Typography>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        <Button>
          <ModalCrearSeguro handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
