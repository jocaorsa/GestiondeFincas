import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteModalProveedor({ handleDelete, proveedor }) {
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
    handleDelete(proveedor.id);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ textDecoration: "none" }}
        variant="contained"
        DisableElevation
        onClick={handleClickOpen}
      >
        Eliminar Proveedor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estas seguro de que quieres elminar este Proveedor?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al aceptar eliminarás permanentemente al Proveedor de la base de datos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            DisableElevation
            style={{ textDecoration: "none" }}
            onClick={handleVolver}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            DisableElevation
            style={{ textDecoration: "none" }}
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
