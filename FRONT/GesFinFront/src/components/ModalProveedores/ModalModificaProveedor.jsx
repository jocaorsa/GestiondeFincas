import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";
import { useEffect } from "react";

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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalModificaProveedor({ proveedor, handleUpdate }) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
      const respuesta = await api.put(
        `/proveedor/${editedData._id}`,
        {
          nombre: editedData.nombre,
          direccion: editedData.direccion,
          tlf_prov: editedData.tlf_prov,
          cif: editedData.cif,
          per_contacto: editedData.per_contacto,
          email: editedData.email,
          puntuacion: editedData.puntuacion,
          servicio: editedData.servicio
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (respuesta) {
        console.log("Datos actualizados");
        handleUpdate();
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

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        DisableElevation
        style={{ textDecoration: "none" }}
      >
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
            <Typography id="spring-modal-title" variant="h5" component="h5">
              <Typography> Modifica Datos del Proveedor :</Typography>
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Nombre
            </Typography>
            <TextField
              name="nombre"
              value={editedData.nombre || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Direccion
            </Typography>
            <TextField
              name="direccion"
              value={editedData.direccion || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Telefono
            </Typography>
            <TextField
              name="tlf_prov"
              value={editedData.tlf_prov || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Cif
            </Typography>
            <TextField
              name="cif"
              value={editedData.cif || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Contacto
            </Typography>
            <TextField
              name="per_contacto"
              value={editedData.per_contacto || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Email
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Puntuacion
            </Typography>
            <TextField
              name="puntuacion"
              value={editedData.puntuacion || ""}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              value={editedData.email || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Servicio
            </Typography>
            <TextField
              name="servicio"
              value={editedData.servicio || ""}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              DisableElevation
              style={{ textDecoration: "none" }}
              onChange={handleModify}
            >
              Confirmar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
