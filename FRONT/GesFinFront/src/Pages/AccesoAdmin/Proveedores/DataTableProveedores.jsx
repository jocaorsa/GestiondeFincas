import * as React from "react";
import {Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllProveedores } from "../../../services/proveedor.service";
import { Link } from "react-router-dom";
import ModalCrearProveedor from "../../../components/ModalProveedores/NuevoProveedorModal";
import Search from "../../../components/Search/search";
import SpringProveedorModal from "../../../components/ModalProveedores/SpringProveedorModal";

export default function DataTableProveedores({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const showProveedores = async () => {
    const data = await getAllProveedores();
    setProveedores(data);
  };
  console.log(proveedores)
  useEffect(() => {
    showProveedores();
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
            <TableCell size="small" component="th" scope="ele">
              {ele.nombre}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.direccion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_prov}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.cif}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.per_contacto}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.email}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.puntuacion}
            </TableCell>
            <TableCell size="small" align="right">
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
            <TableCell component="th" scope="ele" size="small">
              {ele.nombre}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.direccion}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_prov}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.cif}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.per_contacto}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.email}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.puntuacion}
            </TableCell>
            <TableCell size="small" align="right">
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
        <Search
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
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
                  Email
                </TableCell>
                <TableCell size="small" align="right">
                  Puntuacion
                </TableCell>
                <TableCell size="small" align="right">
                  Servicio
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
          <ModalCrearProveedor handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
