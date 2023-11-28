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
import { addTask, editTask, deleteTask, markAsCompleted } from "../store/ReduxSlice";
import styled from "@emotion/styled";

const Todo = () => {
  //for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //----------------------------------------------------
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [newTaskContent, setNewTaskContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  //style
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: 'gray',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    p: 4,
    display: 'flex', 
    justifyContent: 'center',
    flexDirection: 'column'
  };
  const handleAdd = () => {
    dispatch(addTask(newTaskContent));
    setNewTaskContent("");
    setIsAdding(false);
  };

  const handleEdit = (id, newContent) => {
    dispatch(editTask({ id, newContent }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCompleted = (id) => {
    dispatch(markAsCompleted(id));
  };

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
                  task.completed ? "Mark as Incomplete" : "Mark as Completed"
                }
              >
                <IconButton onClick={() => handleCompleted(task.id)} sx={{fontSize:'15px'}}>
                  {task.completed ? "Completed" : "Incomplete"}
                </IconButton>
              </Tooltip>
            </div>
          )}
        </TableCell>
      </StyledTableRow>
    );
  };

  return (
    <>
      {isAdding ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="secondary" variant="contained" sx={{my:4}}>Add New Task</Button>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={ModalStyle}>
          <Typography variant="h5" my={2} textAlign={'center'}>
            Add You Task
          </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center',gap:'20px',my:1 }} >
              <TextField
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
                sx={{}}
              />
              <Button onClick={handleAdd} color="secondary" variant="contained" >Add</Button>
            </Box>
          </Box>
        </Modal>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
          <Button onClick={() => { setIsAdding(true); handleOpen() }} color="secondary" variant="contained" sx={{my:4}}>Add New Task</Button>
        </Box>
      )}
      <Stack sx={{ display: 'flex', justifyContent: 'center', mx: 6 }}>
        <Table sx={{ border: '1px solid #00000030' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      </Stack>

    </>
  );
};

export default Todo;
