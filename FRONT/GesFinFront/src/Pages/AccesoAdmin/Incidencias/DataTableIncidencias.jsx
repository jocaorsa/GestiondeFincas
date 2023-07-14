import * as React from "react";
import {Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllIncidenciasAll } from "../../../services/incidencia.service";
import { Link } from "react-router-dom";
import ModalCrearIncidencia from "../../../components/ModalIncidencia/NuevaIncidenciaModal";
import Search from "../../../components/Search/search";
import SpringIncidenciaModal from "../../../components/ModalIncidencia/SpringIncidenciaModal";

export default function DataTableIncidencia({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [incidencia, setIncidencia] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const showIncidencias = async () => {
    const data = await getAllIncidenciasAll();
    console.log(data)
    setIncidencia(data);
  };
  
  useEffect(() => {
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
            <TableCell size="small" align="right">
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
            <TableCell size="small" align="right">
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
        <Search
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          <Table size="small">
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
        <Link
          to={"/login/admin"}
          style={{ color: "inherit", padding: "5px", textDecoration: "none" }}
        >
          <Button variant="contained" DisableElevation>
            volver
          </Button>
        </Link>
        <Button>
          <ModalCrearIncidencia handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
