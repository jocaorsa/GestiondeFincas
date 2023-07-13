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
import { createComunidad } from "../../services/comunidad.service";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BasicSelect from "./selectrole";

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


export default function ModalCrearComunidad({ handleCreate }) {
  const [open, setOpen] = React.useState(false);
  const [newCom, setNewCom] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCom((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponse = async () => {
    const res = await createComunidad(newCom);
    handleClose();
    handleCreate();
    console.log("Comunidad creada");
  };

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Nueva Comunidad
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
              Nueva Comunidad:
            </Typography>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Nombre Comunidad
            </Typography>
            <TextField
              name="nombre"
              value={newCom.nombre || ""}
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
              value={newCom.direccion || ""}
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
              name="tlf_com"
              value={newCom.tlf_com || ""}
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
              value={newCom.cif || ""}
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
              value={newCom.per_contacto || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Ascensor
            </Typography>
            <TextField
              name="ascensor"
              value={newCom.ascensor || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Localizacion
            </Typography>
            <TextField
              name="localizacion"
              value={newCom.localizacion || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Img
            </Typography>
            <TextField
              name="img"
              value={newCom.img || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Seguro
            </Typography>
            <TextField
              name="seguro_id"
              value={newCom.seguro_id || ""}
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
              onClick={handleResponse}
            >
              Crear
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
