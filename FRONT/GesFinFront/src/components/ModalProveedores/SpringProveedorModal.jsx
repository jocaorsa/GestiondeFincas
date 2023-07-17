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
import DeleteModalProveedor from "./DeleteModalProveedor";
import { deleteOne, updateOneProveedor } from "../../services/proveedor.service.js";

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

export default function SpringModal({ proveedor, hadleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [editedData, setEditedData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
        const respuesta = await updateOneProveedor(
          editedData._id,
          editedData.nombre,
          editedData.direccion,
          editedData.tlf_prov,
          editedData.cif,
          editedData.per_contacto,
          editedData.email,
          editedData.puntuacion,
          editedData.servicio
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
    setEditedData(proveedor);
  }, []);

const handleDelete = async () => {
  try {
    const respuesta = await deleteOne(proveedor._id);

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
              Datos Proveedor:
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
              value={editedData.nombre || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Direccion
            </Typography>
            <TextField
              name="direccion"
              value={editedData.direccion || ""}
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
              name="tlf_prov"
              value={editedData.tlf_prov || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Cif
            </Typography>
            <TextField
              name="cif"
              value={editedData.cif || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Contacto
            </Typography>
            <TextField
              name="per_contacto"
              value={editedData.per_contacto || ""}
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
              Puntuacion
            </Typography>
            <TextField
              name="puntuacion"
              value={editedData.puntuacion || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Servicio
            </Typography>
            <TextField
              name="servicio"
              value={editedData.servicio || ""}
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
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
