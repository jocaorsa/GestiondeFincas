import * as React from "react";
import {Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllComunidades } from "../../../services/comunidad.service";
import { Link } from "react-router-dom";
import ModalCrearComunidad from "../../../components/ModalComunidad/NuevaComunidadModal";
import Search from "../../../components/Search/search";
import SpringComunidadModal from "../../../components/Modal/SpringUserModal";

export default function DataTableComunidades({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const showComunidades = async () => {
    const data = await getAllComunidades();
    setComunidades(data);
  };
  console.log(comunidades)
  useEffect(() => {
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
              {ele.name}
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
            <TableCell size="small" align="right">
              {ele.seguro_id}
            </TableCell>
            <TableCell>
              <SpringComunidadModal comunidades={ele} hadleUpdate={handleUpdate} />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return comunidades.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="small" component="th" scope="ele">
              {ele.name}
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
            <TableCell size="small" align="right">
              {ele.seguro_id}
            </TableCell>
            <TableCell>
              <SpringComunidadModal
                comunidades={ele}
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
                <TableCell size="small">Nombre</TableCell>
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
                <TableCell size="small" align="right">
                  Seguro
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
          <ModalCrearComunidad handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
