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
import { createProveedor } from "../../services/proveedor.service";
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


export default function ModalCrearProveedor({ handleCreate }) {
  const [open, setOpen] = React.useState(false);
  const [newProveedor, setNewProveedor] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProveedor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponse = async () => {
    const res = await createProveedor(newProveedor);
    handleClose();
    handleCreate();
    console.log("Proveedor creado");
  };

    const [selectedServicio, setSelectedServicio] = useState("");


  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Nuevo Proveedor
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
              Nuevo Proveedor:
            </Typography>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Nombre
            </Typography>
            <TextField
              name="nombre"
              value={newProveedor.nombre || ""}
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
              value={newProveedor.direccion || ""}
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
              value={newProveedor.tlf_prov || ""}
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
              value={newProveedor.cif || ""}
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
              name="contacto"
              value={newProveedor.contacto || ""}
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
              value={newProveedor.email || ""}
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
              value={newProveedor.puntuacion || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Servicio
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedServicio}
                label="Servicio"
                onChange={(event) => setSelectedServicio(event.target.value)}
              >
                <MenuItem value="Fontaneria">Fontaneria</MenuItem>
                <MenuItem value="Carpinteria">Carpinteria</MenuItem>
                <MenuItem value="Electricidad">Electricidad</MenuItem>
                <MenuItem value="Limpieza">Limpieza</MenuItem>
                <MenuItem value="Obra">Obra</MenuItem>
              </Select>
            </FormControl>
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
