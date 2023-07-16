import * as React from "react";
import {
  Grid,
  Card,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllIncidenciasAll } from "../../services/incidencia.service";
import { getOneUserAll } from "../../services/usuario.service";
import { Link } from "react-router-dom";
import ModalCrearIncidencia from "./CrearIncidencia/NuevaIncidenciaModal";
import Search from "../../components/Search/search";
import SpringIncidenciaModal from "../AccesoUsuario/SpringIncidenciaModal";

export default function DataTableUser({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [incidencia, setIncidencia] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);
  const [comunidades, setComunidades] = useState([]);

  const showUser = async () => {
    const userData = await getOneUserAll(data.userId);
    setUser(userData);
    setComunidades(userData.comunidad_id); // Obtener las comunidades del usuario
  };

  useEffect(() => {
    showUser();
  }, [actualizar]);

  const showIncidencias = async () => {
    const data = await getAllIncidenciasAll();
    console.log(data);
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
        // Filtrar por comunidades del usuario
        return comunidades.some(
          (comunidad) => comunidad._id.toString() === ele.comunidad_id._id.toString()
        );
      });
      return filteredIncidencia.map((ele) => {
        let estadoColor;
        switch (ele.estado) {
          case "Nueva":
            estadoColor = "green";
            break;
          case "En proceso":
            estadoColor = "orange";
            break;
          case "Terminada":
            estadoColor = "red";
            break;
          default:
            estadoColor = "black";
        }
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="small" component="th" scope="ele">
              {ele.num_incidencia}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id.nombre}
            </TableCell>
            <TableCell size="small" align="right">
              <span style={{ color: estadoColor }}>{ele.estado}</span>
            </TableCell>
            <TableCell size="small" align="right">
              {ele.descripcion}
            </TableCell>
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
        // Filtrar por comunidades del usuario
        if (
          comunidades.some(
            (comunidad) => comunidad._id.toString() === ele.comunidad_id._id.toString()
          )
        ) {
          let estadoColor;
          switch (ele.estado) {
            case "Nueva":
              estadoColor = "green";
              break;
            case "En Proceso":
              estadoColor = "orange";
              break;
            case "Terminada":
              estadoColor = "red";
              break;
            default:
              estadoColor = "black";
          }
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
              <TableCell size="small" align="right">
                <span style={{ color: estadoColor }}>{ele.estado}</span>
              </TableCell>
              <TableCell size="small" align="right">
                {ele.descripcion}
              </TableCell>
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
        }
        return null;
      });
    }
  };

  return (
    <>
      <Grid item>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
            {user && (
              <div>
                <Typography variant="h6" gutterBottom>
                  Bienvenido, {user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Comunidades:
                  {comunidades.map((comunidad) => (
                    <span key={comunidad._id}>{comunidad.nombre}, </span>
                  ))}
                </Typography>
              </div>
            )}
            <Search
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell size="small">Num incidencia</TableCell>
                  <TableCell size="small" align="right">
                    Comunidad
                  </TableCell>
                  <TableCell size="small" align="right">
                    Estado
                  </TableCell>
                  <TableCell size="small" align="right">
                    Descripcion
                  </TableCell>
                  <TableCell size="small" align="right">
                    Proveedor
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{filteredData()}</TableBody>
            </Table>
          
{/*           <Link
            to={"/login/user"}
            style={{ color: "inherit", padding: "5px", textDecoration: "none" }}
          >
           <Button variant="contained" fullWidth>              Volver
            </Button>
          </Link> */}
          <Button>
            <ModalCrearIncidencia handleCreate={handleCreate} />
          </Button>
          </TableContainer>
        </Card>
      </Grid>
    </>
  );
}
