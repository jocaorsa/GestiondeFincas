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

export default function ModalModificaIncidencia({ incidencia, handleUpdate }) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
      const respuesta = await api.put(`/incidencia/${editedData._id}`,
        {
          num_incidencia: editedData.num_incidencia,
          comunidad_id: editedData.comunidad_id,
          propiedad_id: editedData.propiedad_id,
          fecha_creacion: editedData.fecha_creacion,
          seguro: editedData.seguro,
          estado: editedData.estado,
          descripcion: editedData.descripcion,
          img: editedData.img,
          proveedor_id: editedData.proveedor_id,
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
    setEditedData(user);
  }, []);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        DisableElevation
        style={{ color: "inherit", textDecoration: "none" }}
        >
        Editar
      </Button>
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
              <Typography> Modifica Datos del Usuario :</Typography>
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Num. Incidencia
            </Typography>
            <TextField
              name="num_incidencia"
              value={editedData.num_incidencia || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Comunidad
            </Typography>
            <TextField
              name="comunidad_id"
              value={editedData.comunidad_id || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Propiedad
            </Typography>
            <TextField
              name="propiedad_id"
              value={editedData.propiedad_id || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Fecha de Creacion
            </Typography>
            <TextField
              name="fecha_creacion"
              value={editedData.fecha_creacion || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Seguro
            </Typography>
            <TextField
              name="seguro"
              value={editedData.seguro || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Estado
            </Typography>
            <TextField
              name="estado"
              value={editedData.estado || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Descripcion
            </Typography>
            <TextField
              name="descripcion"
              value={editedData.descripcion || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Img
            </Typography>
            <TextField
              name="img"
              value={editedData.img || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Proveedor
            </Typography>
            <TextField
              name="proveedor_id"
              value={editedData.proveedor_id || ""}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              DisableElevation
              style={{ color: "inherit", textDecoration: "none" }}
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
