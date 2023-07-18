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
            <TableCell size="medium"
    component="th" scope="ele">
              <Typography fontSize={18}>{ele.name}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.apellidos}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.tlf_usu}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.email}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.role}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.comunidad_id && ele.comunidad_id[0] && ele.comunidad_id[0].nombre}</Typography>
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.password}</Typography>
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
            <TableCell component="th" scope="ele" size="medium"
    >
              <Typography fontSize={18}>{ele.name}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.apellidos}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.tlf_usu}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.email}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.role}</Typography>
            </TableCell>
            <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.comunidad_id && ele.comunidad_id[0] && ele.comunidad_id[0].nombre}</Typography>
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
              <Typography fontSize={18}>{ele.password}</Typography>
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
                <TableCell size="medium"><Typography fontSize={20}>Nombre</Typography></TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Apellidos</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Telefono</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Email</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Role</Typography>
                </TableCell>
                <TableCell size="medium" align="right">
                  <Typography fontSize={20}>Comunidad</Typography>
                </TableCell>
                <TableCell size="medium" align="right"></TableCell>
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
          <ModalCrearUsuario handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
