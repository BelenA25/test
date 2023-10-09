import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface GithubLinkDialogProps {
  open: boolean;
  onClose: () => void;
  onSend: (link: string) => void;
}

export const GitLinkDialog: React.FC<GithubLinkDialogProps> = ({
  open,
  onClose,
  onSend,
}) => {
  const [link, setLink] = useState("");

  const handleSend = () => {
    onSend(link);
    onClose();
  };

  const dialogTitleStyle = {
    fontSize: "1rem",
  };

  const textFieldStyle = {
    fontSize: "12px",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle style={dialogTitleStyle}>Link de Github</DialogTitle>
      <DialogContent style={textFieldStyle}>
        <TextField
          label="Enlace de Github"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          fullWidth
          style={textFieldStyle}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSend}
          color="primary"
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
