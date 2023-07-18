import * as React from "react";
import {Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/usuario.service";
import { Link } from "react-router-dom";
import ModalCrearUsuario from "../../../components/Modal/NuevoUsuarioModal";
import Search from "../../../components/Search/search";
import SpringUserModal from "../../../components/Modal/SpringUserModal";

export default function DataTableUsuarios({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const showUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };
  console.log(users)
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
            <TableCell size="medium"
    > component="th" scope="ele">
              {ele.name}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.apellidos}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.tlf_usu}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.email}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.role}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.comunidad_id}
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
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
            <TableCell component="th" scope="ele" size="medium"
    >
              {ele.name}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.apellidos}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.tlf_usu}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.email}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.role}
            </TableCell>
            <TableCell size="medium"
    align="right">
              {ele.comunidad_id}
            </TableCell>
            {/* <TableCell size="medium"
    align="right">
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
        <Search
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer component={Paper} style={{ height: 400 }}>
          <Table size="medium"
    >
            <TableHead>
              <TableRow>
                <TableCell size="medium"
    >Nombre</TableCell>
                <TableCell size="medium"
    align="right">
                  Apellidos
                </TableCell>
                <TableCell size="medium"
    align="right">
                  Telefono
                </TableCell>
                <TableCell size="medium"
    align="right">
                  Email
                </TableCell>
                <TableCell size="medium"
    align="right">
                  Role
                </TableCell>
                <TableCell size="medium"
    align="right">
                  Comunidad
                </TableCell>
                {/* <TableCell size="medium"
    align="right">
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
         <Button variant="contained" fullWidth>            volver
          </Button>
        </Link>
        <Button>
          <ModalCrearUsuario handleCreate={handleCreate} />
        </Button>
      </div>
    </>
  );
}
