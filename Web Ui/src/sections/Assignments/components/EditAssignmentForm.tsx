import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import GroupsRepository from "../../../modules/Groups/repository/GroupsRepository";
import { GroupDataObject } from "../../../modules/Groups/domain/GroupInterface";
import { useEffect } from "react";
import GetGroups from "../../../modules/Groups/application/GetGroups";

interface EditAssignmentDialogProps {
  readonly assignmentId: number;
  readonly currentGroupName: string; // Agrega una propiedad para el nombre del grupo actual
  //readonly currentGroupId: number;
  //readonly assignmentGroupId: number;
  //readonly groups: { id: number; groupName: string }[];
  readonly onClose: () => void;
}

function EditAssignmentDialog({
  assignmentId,
  currentGroupName,
  onClose,
}: EditAssignmentDialogProps) {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  const handleGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(event.target.value as number);
  };

  const groupRepository = new GroupsRepository();
  const [groups, setGroups] = useState<GroupDataObject[]>([]);
  useEffect(() => {
    const fetchGroups = async () => {
      const getGroups = new GetGroups(groupRepository);
      const allGroups = await getGroups.getGroups();
      setGroups(allGroups);
    };

    fetchGroups();
  });

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Tarea - ID: {assignmentId}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            id="titulo"
            label="Titulo"
            variant="outlined"
            size="small"
            required
            value=""
            onChange={() => {}}
          />
          <TextField
            id="descripcion"
            label="Descripcion"
            variant="outlined"
            size="small"
            required
            sx={{
              "& label.Mui-focused": {
                color: "#001F3F",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#001F3F",
                },
              },
            }}
            onChange={() => {}}
            defaultValue=""
          />
          {
            <Select
              label="Grupos"
              value={selectedGroup}
              onChange={handleGroupChange}
              variant="outlined"
              size="small"
              required
            >
              <MenuItem value={0}>{currentGroupName}</MenuItem>
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.groupName}
                </MenuItem>
              ))}
            </Select>
          }

          <section>{/* The rest of your components go here */}</section>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          style={{
            textTransform: "none",
          }}
          onClick={() => {}}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAssignmentDialog;
