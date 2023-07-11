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
} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/usuario.service";
import { Link } from "react-router-dom";
//import SpringModal from "../../Modal/Modal";
//import ModalCrearUsuario from "../../Modal/NuevoUsuarioModal";
import TableSearch from "../../../components/Search";

export default function DataTableUsuarios({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const showUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };
  useEffect(() => {
    showUsers();
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
            <TableCell component="th" scope="ele">
              {ele.name}
            </TableCell>
            <TableCell align="right">{ele.lastname}</TableCell>
            <TableCell align="right">{ele.phone}</TableCell>
            <TableCell align="right">{ele.fecha_nacimiento}</TableCell>
            <TableCell align="right">{ele.email}</TableCell>
            <TableCell align="right">{ele.role}</TableCell>
            <TableCell align="right">{ele.hemogrupoId}</TableCell>
            <TableCell align="right">{ele.hemorhId}</TableCell>
            <TableCell align="right">{ele.password}</TableCell>
            <TableCell>
              <SpringModal user={ele} hadleUpdate={handleUpdate} />
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
            <TableCell component="th" scope="ele">
              {ele.name}
            </TableCell>
            <TableCell align="right">{ele.lastname}</TableCell>
            <TableCell align="right">{ele.phone}</TableCell>
            <TableCell align="right">{ele.fecha_nacimiento}</TableCell>
            <TableCell align="right">{ele.email}</TableCell>
            <TableCell align="right">{ele.role}</TableCell>
            <TableCell align="right">{ele.hemogrupoId}</TableCell>
            <TableCell align="right">{ele.hemorhId}</TableCell>
            <TableCell align="right">{ele.password}</TableCell>
            <TableCell>
              <SpringModal user={ele} hadleUpdate={handleUpdate} />
            </TableCell>
          </TableRow>
        );
      });
    }
  };

  return (
    <>
      <div>
        <TableSearch
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Apellidos</TableCell>
                <TableCell align="right">Telefono</TableCell>
                <TableCell align="right">Fecha de nacimiento</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Hemo Grupo</TableCell>
                <TableCell align="right">Hemo Rh</TableCell>
                <TableCell align="right">Contraseña</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filteredData()}</TableBody>
          </Table>
        </TableContainer>
        <Link
          to={"/login/admin"}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Button
            sx={{
              alignContent: "end",
              backgroundColor: "#BF0021",
              marginLeft: "8px",
            }}
            variant="contained"
            color="error"
          >
            Volver
          </Button>
        </Link>

        <ModalCrearUsuario handleCreate={handleCreate} />
      </div>
    </>
  );
}
