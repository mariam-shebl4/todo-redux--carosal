import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Box,
  Stack,
  Modal,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  addTask,
  editTask,
  deleteTask,
  markAsCompleted,
} from "../store/ReduxSlice";
import styled from "@emotion/styled";

const Todo = () => {
  //states for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //---------------end---states for modal----------------------------------
  //style in the jsx 
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#dadada59",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #dadada59",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const cellHead = {
    fontSize: "17px",
    fontWeight: "bold",
  };
  //-----------------end style in the jsx ------------------------------------
  // the CRUD Methods
  // ----the CRUD States
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [newTaskContent, setNewTaskContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  //the CRUD functions
  // Add
  const handleAdd = () => {
    dispatch(addTask(newTaskContent));
    setNewTaskContent("");
    setIsAdding(false);
  };
  // edit
  const handleEdit = (id, newContent) => {
    dispatch(editTask({ id, newContent }));
  };
  // delete
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  // complete
  const handleCompleted = (id) => {
    dispatch(markAsCompleted(id));
  };
// ----------------end----the CRUD Methods------------------
//  the task row which is inside the table
  const TaskRow = ({ task }) => {
    const [editedContent, setEditedContent] = useState(task.content);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
      handleEdit(task.id, editedContent);
      setIsEditing(false);
    };

    return (
      <StyledTableRow key={task.id}>
        <TableCell>
          {isEditing ? (
            <TextField
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            task.content
          )}
        </TableCell>
        <TableCell>{task.createdAt}</TableCell>
        <TableCell>
          {isEditing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <div>
              <Tooltip title="Edit">
                <IconButton onClick={() => setIsEditing(true)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(task.id)}>
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  task.completed ? "Mark as Completed" : "Mark as Incomplete"
                }
              >
                <IconButton
                  onClick={() => handleCompleted(task.id)}
                  color={task.completed ? "success" : "error"}
                  sx={{ fontSize: "15px" }}
                >
                  {task.completed ? "Completed" : "Incomplete"}
                </IconButton>
              </Tooltip>
            </div>
          )}
        </TableCell>
      </StyledTableRow>
    );
  };

  // ----------------end----the task row which is inside the table----------------

  return (
    <>
      {/* adding task button */}
      {isAdding ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              handleOpen();
            }}
            color="secondary"
            variant="contained"
            sx={{ my: 4 }}
          >
            Add New Task
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={ModalStyle}>
              <Typography variant="h5" my={2} textAlign={"center"}>
                Add You Task
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  my: 1,
                }}
              >
                <TextField
                  value={newTaskContent}
                  onChange={(e) => setNewTaskContent(e.target.value)}
                  sx={{}}
                />
                <Button
                  onClick={handleAdd}
                  disabled={newTaskContent === ""}
                  color="secondary"
                  variant="contained"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setIsAdding(true);
              handleOpen();
            }}
            color="secondary"
            variant="contained"
            sx={{ my: 4 }}
          >
            Add New Task
          </Button>
        </Box>
      )}
    

      {/* ----------------------------------------- */}
      <Stack sx={{ display: "flex", justifyContent: "center", mx: 6 }}>
        {tasks.length === 0 ? (
          <Typography
            variant="h3"
            textAlign={"center"}
            pt={20}
            color="secondary"
          >
            There is No Todos
          </Typography>
        ) : (
          <Table sx={{ border: "1px solid #00000030" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={cellHead}>Name</TableCell>
                <TableCell sx={cellHead}>Created At</TableCell>
                <TableCell sx={cellHead}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </TableBody>
          </Table>
        )}
      </Stack>
    </>
  );
};

export default Todo;
