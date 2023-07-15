import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import DeleteModalUser from "./DeleteModalUser";
import { deleteOne, updateOneUsuario } from "../../services/usuario.service";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({ user, hadleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [editedData, setEditedData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
        const respuesta = await updateOneUsuario(
          editedData._id,
          editedData.name,
          editedData.apellidos,
          editedData.tlf_usu,
          editedData.email,
          editedData.password,
          editedData.role
        );

      if (respuesta) {
        console.log("Datos actualizados");
        hadleUpdate();
        handleClose();
      } else {
        console.error("Fallo al actualizar datos");
      }
    } catch (error) {
      console.error("Fallo al actualizar los datos", error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setEditedData(user);
  }, []);

const handleDelete = async () => {
  try {
    const respuesta = await deleteOne(user._id);

    if (respuesta) {
      console.log("Usuario eliminado");
      handleClose();
      hadleUpdate();
    } else {
      console.error("No se pudo eliminar al usuario");
    }
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
  }
};

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
VER      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              color={"black"}
              id="spring-modal-title"
              variant="h5"
              component="h5"
            >
              Datos Usuario:
            </Typography>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Nombre
            </Typography>
            <TextField
              name="name"
              value={editedData.name || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Apellidos
            </Typography>
            <TextField
              name="apellidos"
              value={editedData.apellidos || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Telefono
            </Typography>
            <TextField
              name="tlf_usu"
              value={editedData.tlf_usu || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Email
            </Typography>
            <TextField
              name="email"
              value={editedData.email || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Password
            </Typography>
            <TextField
              name="password"
              value={editedData.password || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Role
            </Typography>
            <TextField
              name="role"
              value={editedData.role || ""}
              onChange={handleInputChange}
            />
            <Typography></Typography>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                DisableElevation
                style={{
                  color: "inherit",
                  padding: "5px",
                  textDecoration: "none",
                  marginRight: "5px",
                }}
                onClick={handleModify}
              >
                Modificar
              </Button>
              <Button variant="contained" DisableElevation onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
            {/*<DeleteModalUser user={user} handleDelete={handleDelete} />
             */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
