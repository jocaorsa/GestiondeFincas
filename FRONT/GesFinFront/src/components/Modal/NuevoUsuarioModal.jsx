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
import { createUser } from "../../services/usuario.service";
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
  const [newUser, setNewUser] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponse = async () => {
    const userWithRole={
      ...newUser,
      role: selectedRole,
    };
    
    const res = await createUser(userWithRole);
    handleClose();
    handleCreate();
    console.log("Usuario creado");
  
  };

  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div>
      <Button variant="contained" DisableElevation onClick={handleOpen}>
        Nuevo Usuario
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
              Nuevo Usuario:
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
              value={newUser.name || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Apellidos
            </Typography>
            <TextField
              name="apellidos"
              value={newUser.apellidos || ""}
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
              name="tlf_usu"
              value={newUser.tlf_usu || ""}
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
              value={newUser.email || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2 }}
            >
              Password
            </Typography>
            <TextField
              name="password"
              value={newUser.password || ""}
              onChange={handleInputChange}
            />
            <Typography
              color={"black"}
              id="spring-modal-description"
              sx={{ mt: 2}}
            >
              Role
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRole}
                label="Role"
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
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
