import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow, Checkbox } from "@mui/material";
import { UpdateTodo, RemoveTodo } from "../store/actions/todosAction";
import { Edit, Delete, Check } from "@mui/icons-material";

export default function Todos({ page }) {
  const todos = useSelector(({ todos }) => todos.todos);
  const [editMod, setEditMod] = useState("");
  const [editValue, setEditValue] = useState("");
  const dispatch = useDispatch();
  return todos.map((todo) => {
    const { _id, description, status, deadline } = todo;
    const isEdit = !!(editMod.length && editMod === _id);
    return (
      <TableRow hover key={_id} tabIndex={-1} style={{ cursor: "pointer" }}>
        {isEdit ? (
          <TableCell align={"center"}>
            <input
              type="text"
              value={editValue}
              onChange={(val) => setEditValue(val.target.value)}
            />
          </TableCell>
        ) : (
          <TableCell align={"center"}>{description}</TableCell>
        )}
        <TableCell align={"center"}>
          <Checkbox
            disabled={isEdit}
            checked={status}
            onChange={(_, check) =>
              dispatch(UpdateTodo(_id, { status: check }, page))
            }
          />
        </TableCell>
        <TableCell align={"center"}>
          {new Date(deadline).toISOString()}
        </TableCell>
        <TableCell align={"center"}>
          {isEdit ? (
            <Check
              onClick={(_) => {
                dispatch(UpdateTodo(_id, { description: editValue }, page));
                setEditValue("");
                setEditMod("");
              }}
            />
          ) : (
            <>
              <Edit
                onClick={(_) => {
                  setEditValue(description);
                  setEditMod(_id);
                }}
              />
              <Delete onClick={(_) => dispatch(RemoveTodo(_id, page))} />
            </>
          )}
        </TableCell>
      </TableRow>
    );
  });
}
