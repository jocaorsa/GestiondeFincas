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
import { createSeguro } from "../../services/seguro.service";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//import BasicSelect from "./selectrole";

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


export default function ModalCrearUsuario({ handleCreate }) {
  const [open, setOpen] = React.useState(false);
  const [newSeguro, setNewSeguro] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSeguro((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponse = async () => {
    const res = await createSeguro(newSeguro);
    handleClose();
    handleCreate();
    console.log("Seguro creado");
  };

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Nuevo Seguro
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
              Nuevo Seguro:
            </Typography>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Compañia
            </Typography>
            <TextField
              name="compania"
              value={newSeguro.compania || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Poliza
            </Typography>
            <TextField
              name="poliza"
              value={newSeguro.poliza || ""}
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
              name="tlf_seg"
              value={newSeguro.tlf_seg || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Fecha Contrato
            </Typography>
            <TextField
              name="fecha_contrato"
              value={newSeguro.fecha_contrato || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Fecha Fin Contrato
            </Typography>
            <TextField
              name="fecha_fin_contrato"
              value={newSeguro.fecha_fin_contrato || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Mediador
            </Typography>
            <TextField
              name="mediador_id"
              value={newSeguro.mediador_id || ""}
              onChange={handleInputChange}
            />
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
