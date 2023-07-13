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
import DeleteModalPropiedad from "./DeleteModalPropiedad";
import { deleteOnePropiedad, updateOnePropiedad } from "../../services/propiedad.service";

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

export default function SpringModal({ propiedad, hadleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [editedData, setEditedData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
        const respuesta = await updateOnePropiedad(
          editedData._id,
          editedData.tipo_propiedad,
          editedData.piso,
          editedData.num,
          editedData.letra,
          editedData.comunidad_id
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
    setEditedData(propiedad);
  }, []);

const handleDelete = async () => {
  try {
    const respuesta = await deleteOnePropiedad(propiedad._id);

    if (respuesta) {
      console.log("propiedad eliminado");
      handleClose();
      hadleUpdate();
    } else {
      console.error("No se pudo eliminar al propiedad");
    }
  } catch (error) {
    console.error("Error al eliminar el propiedad", error);
  }
};

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Editar
      </Button>
      <Button variant="contained" DisableElevation onClick={handleDelete}>
        Eliminar
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
            <Typography
              color={"black"}
              id="spring-modal-title"
              variant="h5"
              component="h5"
            >
              Datos Propiedad:
            </Typography>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Tipo de Propiedad
            </Typography>
            <TextField
              name="tipo_propiedad"
              value={editedData.tipo_propiedad || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Piso
            </Typography>
            <TextField
              name="piso"
              value={editedData.piso || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Num
            </Typography>
            <TextField
              name="num"
              value={editedData.num || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Letra
            </Typography>
            <TextField
              name="letra"
              value={editedData.letra || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Comunidad
            </Typography>
            <TextField
              name="comunidad_id"
              value={editedData.comunidad_id || ""}
              onChange={handleInputChange}
            />
            <Typography></Typography>
            <Button
              variant="contained"
              DisableElevation
              style={{
                color: "inherit",
                padding: "5px",
                textDecoration: "none",
              }}
              onClick={handleModify}
            >
              Modificar
            </Button>
            {/*<DeleteModalUser user={user} handleDelete={handleDelete} />
             */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
