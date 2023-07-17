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
import { getAllUsers } from "../../../services/usuario.service";
import { Link } from "react-router-dom";
import ModalCrearUsuario from "../../../components/Modal/NuevoUsuarioModal";
import Search from "../../../components/Search/search";
import SpringUserModal from "../../../components/Modal/SpringUserModal";
import { getOneUser } from "../../../services/usuario.service";

export default function DataTableUsuarios({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [user, setUser] = useState(undefined);

  const showUser = async () => {
    const userData = await getOneUser(); // Obtén los datos del usuario
    setUser(userData);
  };

  const showUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };
  console.log(users)
  useEffect(() => {
    showUsers();
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
      const filteredUsers = users.filter((ele) => {
        return Object.values(ele).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      });
      return filteredUsers.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell size="small" component="th" scope="ele">
              {ele.name}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.apellidos}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_usu}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.email}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.role}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.password}
            </TableCell> */}
            <TableCell>
              <SpringUserModal user={ele} hadleUpdate={handleUpdate} />
            </TableCell>
          </TableRow>
        );
      });
    } else {
      return users.map((ele) => {
        return (
          <TableRow
            key={ele.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ele" size="small">
              {ele.name}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.apellidos}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.tlf_usu}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.email}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.role}
            </TableCell>
            <TableCell size="small" align="right">
              {ele.comunidad_id}
            </TableCell>
            {/* <TableCell size="small" align="right">
              {ele.password}
            </TableCell> */}
            <TableCell>
              <SpringUserModal user={ele} hadleUpdate={handleUpdate} />
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
                <TableCell size="small">Nombre</TableCell>
                <TableCell size="small" align="right">
                  Apellidos
                </TableCell>
                <TableCell size="small" align="right">
                  Telefono
                </TableCell>
                <TableCell size="small" align="right">
                  Email
                </TableCell>
                <TableCell size="small" align="right">
                  Role
                </TableCell>
                <TableCell size="small" align="right">
                  Comunidad
                </TableCell>
                <TableCell size="small" align="right">
                  
                </TableCell>
                {/* <TableCell size="small" align="right">
                  Contraseña
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        <Button>
          <ModalCrearUsuario handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
