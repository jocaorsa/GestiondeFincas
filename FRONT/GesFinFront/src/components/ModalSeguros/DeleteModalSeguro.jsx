import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteModalUser({ handleDelete, seguro }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleVolver = () => {
    handleClose();
  };
  const handleAceptar = () => {
    handleDelete(seguro.id);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ color: "inherit", textDecoration: "none" }}
        variant="contained"
        DisableElevation
        onClick={handleClickOpen}
      >
        Eliminar Seguro
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estas seguro de que quieres elminar este seguro?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al aceptar eliminarás permanentemente al seguro de la base de datos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            DisableElevation
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={handleVolver}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            DisableElevation
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={handleAceptar}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
