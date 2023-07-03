import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Tooltip } from "../tools/tooltip";
import { GetTodos, CheckStatuses } from "../store/actions/todosAction";
import Todos from "./Todos";
import NewTodoModal from "./NewTodo";
import io from "socket.io-client";
import Alert from "./Alert";

const socket = io("http://localhost:3002");

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector(({ todos }) => todos);
  const [newTodoModalOpen, setNewTodoModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(GetTodos(page));
    socket.on("data_from_server", (todos) => {
      setAlertMessage(`${todos} passed deadline!!!`);
      setAlertMessageOpen(true);
    });
    setTimeout((_) => dispatch(CheckStatuses()), 1000);
    return () => {
      socket.off("data_from_server");
    };
  }, []);

  return (
    <Paper>
      {newTodoModalOpen && (
        <NewTodoModal
          page={page}
          handleClose={(_) => {
            setNewTodoModalOpen(false);
            dispatch(GetTodos(page));
          }}
        />
      )}
      {alertMessageOpen && (
        <Alert
          message={alertMessage}
          setAlertMessageOpen={setAlertMessageOpen}
        />
      )}
      <Typography
        variant="h1"
        style={{ textAlign: "center", margin: "20px auto" }}
      >
        Todos
      </Typography>
      <Tooltip
        start={(_) => setNewTodoModalOpen(true)}
        title={"Create new Todo"}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={todos.total}
        labelRowsPerPage={"Todos per page"}
        rowsPerPage={todos.rowPerPage}
        page={page}
        onPageChange={(_, page) => {
          setPage(page);
          dispatch(GetTodos(page));
        }}
      />
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align={"center"}
                style={{ minWidth: 100, verticalAlign: "baseline" }}
              >
                Description
              </TableCell>
              <TableCell
                align={"center"}
                style={{ minWidth: 100, verticalAlign: "baseline" }}
              >
                Is Completed?
              </TableCell>
              <TableCell
                align={"center"}
                style={{ minWidth: 100, verticalAlign: "baseline" }}
              >
                deadLine
              </TableCell>
              <TableCell
                align={"center"}
                style={{ minWidth: 100, verticalAlign: "baseline" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Todos page={page} />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
