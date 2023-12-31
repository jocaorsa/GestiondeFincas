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
import { /* deleteOne, */ updateOneIncidencia } from "../../services/incidencia.service";

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

export default function SpringModal({ incidencia, hadleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [editedData, setEditedData] = useState({});
  
  console.log(incidencia)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
        const respuesta = await updateOneIncidencia(
          editedData._id,
          editedData.num_incidencia,
          editedData.comunidad_id,
   /*        editedData.propiedad_id,
          editedData.fecha_creacion, */
/*           editedData.seguro,
 */          editedData.estado,
          editedData.descripcion,
/*           editedData.img,
          editedData.proveedor_id */
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
    setEditedData(incidencia);
  }, []);

/* const handleDelete = async () => {
  try {
    const respuesta = await deleteOne(incidencia._id);

    if (respuesta) {
      console.log("Incidencia eliminado");
      handleClose();
      hadleUpdate();
    } else {
      console.error("No se pudo eliminar al incidencia");
    }
  } catch (error) {
    console.error("Error al eliminar el incidencia", error);
  }
}; */

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Ver
      </Button>
      {/*  <Button variant="contained" DisableElevation onClick={handleDelete}>
        Eliminar
      </Button> */}
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
              Datos Incidencia:
            </Typography>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Num Incidencia
            </Typography>
            <TextField
              disabled={true}
              name="num_incidencia"
              value={editedData.num_incidencia || ""}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Comunidad
            </Typography>
            <TextField
              disabled={true}
              name="comunidad_id"
              value={
                editedData.comunidad_id ? editedData.comunidad_id.nombre : ""
              }
            />
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Propiedad
            </Typography>
            <TextField
              name="propiedad_id"
              value={editedData.propiedad_id || ""}
              onChange={handleInputChange}
            /> */}
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Fecha Creacion
            </Typography>
            <TextField
              name="fecha_creacion"
              value={editedData.fecha_creacion || ""}
              onChange={handleInputChange}
            /> */}

            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Estado:
            </Typography>
            <TextField
              disabled={true}
              name="estado"
              value={editedData.estado || ""}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Descripcion
            </Typography>
            <TextField
              placeholder="MultiLine with rows: 2 and rowsMax: 4"
              multiline
              rows={10}
              maxRows={9}
              name="descripcion"
              value={editedData.descripcion || ""}
              onChange={handleInputChange}
            />
            {/*  <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Img
            </Typography>
            <TextField
              name="img"
              value={editedData.img || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Proveedor
            </Typography>
            <TextField
              name="proveedor_id"
              value={editedData.proveedor_id || ""}
              onChange={handleInputChange}
            /> */}
            <Typography></Typography>
            <Button
              variant="contained"
              DisableElevation
              style={{
                color: "inherit",
                padding: "5px",
                textDecoration: "none",
                margin: "5px",
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
