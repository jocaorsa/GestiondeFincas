import * as React from "react";
import {Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllSeguros } from "../../../services/seguro.service";
import { Link } from "react-router-dom";
import ModalCrearSeguro from "../../../components/ModalSeguros/NuevoSeguroModal";
import Search from "../../../components/Search/search";
import SpringSeguroModal from "../../../components/ModalSeguros/SpringSeguroModal";

export default function DataTableSeguros({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [seguros, setSeguros] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const showSeguros= async () => {
    const data = await getAllSeguros();
    setSeguros(data);
  };
  console.log(seguros)
  useEffect(() => {
    showSeguros();
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
            <TableCell size="small" component="th" scope="ele">
              {ele.compania}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.poliza}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_seg}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.fecha_contrato}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.fecha_fin_contrato}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.mediador_id}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.password}
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
            <TableCell component="th" scope="ele" size="small">
              {ele.compania}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.poliza}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_seg}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.fecha_contrato}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.fecha_fin_contrato}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.mediador_id}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.password}
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
        <Search
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell size="small">Compañia</TableCell>
                <TableCell size="small" align="right">
                  Poliza
                </TableCell>
                <TableCell size="small" align="right">
                  Telefono Seguro
                </TableCell>
                <TableCell size="small" align="right">
                  Fecha Contrato
                </TableCell>
                <TableCell size="small" align="right">
                  Fecha Fin
                </TableCell>
                <TableCell size="small" align="right">
                  Mediador
                </TableCell>
                {/* <TableCell size="small" align="right">
                  Contraseña
                </TableCell> */}
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
          <ModalCrearSeguro handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
