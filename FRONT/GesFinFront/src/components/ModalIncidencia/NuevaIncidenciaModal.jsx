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
import { createIncidencia} from "../../services/incidencia.service";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllComunidades } from '../../services/comunidad.service';
import { useEffect } from "react";
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


export default function ModalCrearIncidencia({ handleCreate }) {
  const [open, setOpen] = React.useState(false);
  const [newIncidencia, setNewIncidencia] = useState({});
  const [comunidades, setComunidades] = useState([]);
  const [selectedComunidadId, setSelectedComunidadId] = useState("");
 
  useEffect(() => {
    const fetchComunidades = async () => {
      const comunidadesData = await getAllComunidades();
      setComunidades(comunidadesData);
    };
    fetchComunidades();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCom = (event) => {
    setSelectedComunidadId(event.target.value)
    setNewIncidencia((prevData) => ({
      ...prevData,
      ['comunidad_id']: event.target.value,
    }))}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewIncidencia((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponse = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    console.log(year)
    let month = (currentDate.getMonth() + 1).toString();
    let day = currentDate.getDate().toString();
    let hours = currentDate.getHours().toString();
    let minutes = currentDate.getMinutes().toString();

    // Agregar un cero delante si el mes, día, horas o minutos tienen un solo dígito
    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;
    if (hours.length === 1) hours = "0" + hours;
    if (minutes.length === 1) minutes = "0" + minutes;

    const numIncidencia = year + month + day + hours + minutes;
    console.log(numIncidencia)
    const newIncidenciaWithNum = {
      ...newIncidencia,
      num_incidencia: numIncidencia,
    };

    console.log(newIncidenciaWithNum)
    const res = await createIncidencia(newIncidenciaWithNum);
    handleClose();
    handleCreate();
    console.log("Incidencia creada");
  };

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Nueva Incidencia
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
              Nueva Incidencia:
            </Typography>
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Num Incidencia
            </Typography>
            <TextField
              name="num_incidencia"
              value={newIncidencia.num_incidencia || ""}
              onChange={handleInputChange}
            /> */}
            <Typography
              color="black"
              id="spring-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <Box sx={{ minWidth: 20 }}>
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="comunidad-label">Comunidad</InputLabel>
                <Select
                  labelId="comunidad-label"
                  id="comunidad_id"
                  name="comunidad_id"
                  value={selectedComunidadId}
                  onChange={handleCom}
                >
                  {comunidades.map((comunidad) => (
                    <MenuItem key={comunidad._id} value={comunidad._id}>
                      {comunidad.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Comunidad
            </Typography>
            <TextField
              name="comunidad_id"
              value={newIncidencia.comunidad_id || ""}
              onChange={handleInputChange}
            /> */}
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Propiedad
            </Typography>
            <TextField
              name="propiedad_id"
              value={newIncidencia.propiedad_id || ""}
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
              value={newIncidencia.fecha_creacion || ""}
              onChange={handleInputChange}
            /> */}
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Seguro
            </Typography>
            <TextField
              name="seguro"
              value={newIncidencia.seguro || ""}
              onChange={handleInputChange}
            /> */}
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Estado
            </Typography>
            <FormControl sx={{ mt: 3, minWidth: 120 }}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                name="estado"
                value={newIncidencia.estado || ""}
                onChange={handleInputChange}
              >
                <MenuItem value="Nueva">Nueva</MenuItem>
                <MenuItem value="En Proceso">En Proceso</MenuItem>
                <MenuItem value="Terminada">Terminada</MenuItem>

                {/* Otros estados */}
              </Select>
            </FormControl>
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Descripcion
            </Typography>
            <TextField
              name="descripcion"
              value={newIncidencia.descripcion || ""}
              onChange={handleInputChange}
            />
            {/* <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Imagen
            </Typography>
            <TextField
              name="img"
              value={newIncidencia.img || ""}
              onChange={handleInputChange}
            /> */}
            {/*  <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Proveedor
            </Typography>
            <TextField
              name="proveedor_id"
              value={newIncidencia.proveedor_id || ""}
              onChange={handleInputChange}
            /> */}
            <Typography></Typography>
            <Button
              variant="contained"
              DisableElevation
              style={{
                color: "inherit",
                padding: "2px",
                marginTop: "6px",
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
