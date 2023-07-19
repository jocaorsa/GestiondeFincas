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
            <TableCell size="medium"
     component="th" scope="ele">
              <Typography fontSize={18}>{ele.num_incidencia}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.comunidad_id.nombre}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <span style={{ color: estadoColor }}><Typography fontSize={18}>{ele.estado}</Typography></span>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.descripcion}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.proveedor_id.nombre}</Typography>
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
              <TableCell component="th" scope="ele" size="medium">
                <Typography fontSize={18}>{ele.num_incidencia}</Typography>
              </TableCell>
              <TableCell size="medium" align="right">
                <Typography fontSize={18}>{ele.comunidad_id.nombre}</Typography>
              </TableCell>
              <TableCell size="medium" align="right">
                <span style={{ color: estadoColor }}><Typography fontSize={18}>{ele.estado}</Typography></span>
              </TableCell>
              <TableCell size="medium" align="right">
                <Typography fontSize={18}>{ele.descripcion}</Typography>
              </TableCell>
              <TableCell size="medium" align="right">
                <Typography fontSize={18}>{ele.proveedor_id.nombre}</Typography>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              width:"60vw"
            }}
          >
            {user && (
              <div>
                <Typography variant="h5" gutterBottom>
                  Bienvenido, {user.name} {user.apellidos}
                </Typography>
                <Typography  variant="h5" gutterBottom>
                  Comunidades: {}
                  {comunidades.map((comunidad) => (
                    <span key={comunidad._id}>{comunidad.nombre} </span>
                  ))}
                </Typography>
              </div>
            )}
            <Search
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <TableContainer component={Paper} style={{maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell size="medium">
                    <Typography fontSize={20}>Num incidencia</Typography>
                    </TableCell>
                  <TableCell size="medium"align="right">
                    <Typography fontSize={20}>Comunidad</Typography>
                  </TableCell>
                  <TableCell size="medium"align="right">
                    <Typography fontSize={20}>Estado</Typography>
                  </TableCell>
                  <TableCell size="medium" align="right" >
                    <Typography fontSize={20}>Descripcion</Typography>
                  </TableCell>
                  <TableCell size="medium"
    align="right"></TableCell>
                  <TableCell size="medium"
    align="right"></TableCell>
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
          </TableContainer>
          <Button>
            <ModalCrearIncidencia
              comunidades={comunidades}
              handleCreate={handleCreate}
            />
          </Button>
        </Card>
      </Grid>
    </>
  );
}
