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

export default function ModalModificaSeguro({ seguro, handleUpdate }) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModify = async () => {
    console.log(editedData);
    console.log(localStorage.getItem("token"));
    try {
      const respuesta = await api.put(`/seguro/${editedData._id}`,
        {
          compania: editedData.compania,
          poliza: editedData.poliza,
          tlf_seg: editedData.tlf_seg,
          fecha_contrato: editedData.fecha_contrato,
          fecha_fin_contrato: editedData.fecha_fin_contrato,
          /* mediador_id: editedData.mediador_id, */
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
    setEditedData(seguro);
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
              <Typography> Modifica Datos del Seguro :</Typography>
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Compañia
            </Typography>
            <TextField
              name="compania"
              value={editedData.compania || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Poliza
            </Typography>
            <TextField
              name="poliza"
              value={editedData.poliza || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Telefono
            </Typography>
            <TextField
              name="tlf_seg"
              value={editedData.tlf_seg || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Fecha Contrato
            </Typography>
            <TextField
              name="fecha_contrato"
              value={editedData.fecha_contrato || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Fecha Fin Contrato
            </Typography>
            <TextField
              name="fecha_fin_contrato"
              value={editedData.fecha_fin_contrato || ""}
              onChange={handleInputChange}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Mediador
            </Typography>
            <TextField
              name="mediador_id"
              value={editedData.mediador_id || ""}
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
