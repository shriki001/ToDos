import React, { useState } from "react";
import * as Yup from "yup";
import {
  DialogContent,
  IconButton,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormik } from "formik";
import { Close } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { CreateTodo } from "../store/actions/todosAction";

export default function NewTodoModal({ handleClose, page }) {
  const dispatch = useDispatch();
  const fields = {
    description: "Description",
  };
  const formik = useFormik({
    initialValues: {
      description: "",
      deadline: new Date(),
    },
    validationSchema: Yup.object({
      description: Yup.string()
        .min(3, "Mininum 3 characters")
        .required("*Required"),
      deadline: Yup.date().required("*Required"),
    }),
    onSubmit: (values) => {
      dispatch(CreateTodo(values, page));
      handleClose();
    },
  });

  function renderModal() {
    return (
      <form onSubmit={formik.handleSubmit}>
        {["description"].map((id) => (
          <FormGroup controlId={id} key={id}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={6}>
                <ControlLabel>{fields[id]}</ControlLabel>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <FormControl
                  onBlur={formik.handleBlur}
                  type={"text"}
                  autoComplete="off"
                  value={formik["values"][id]}
                  onChange={formik.handleChange}
                />
                {formik.errors[id] && formik.touched[id] && (
                  <p style={{ color: "red" }}>{formik.errors[id]}</p>
                )}
              </Grid>
            </Grid>
          </FormGroup>
        ))}
        <div style={{ margin: "auto", width: "fit-content" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="deadline"
              id={"deadline"}
              onChange={(time) =>
                formik.setFieldValue("deadline", time.toDate())
              }
            />
          </LocalizationProvider>
        </div>
        <Divider style={{ margin: "20px 0" }} />
        <Button
          className={"btn btn-primary"}
          style={{
            borderRadius: 25,
            padding: "5px 30px",
            margin: "30px auto 0",
            display: "block",
          }}
          type="submit"
        >
          {"Submit"}
        </Button>
      </form>
    );
  }

  return (
    <>
      <Dialog open fullWidth>
        <DialogTitle onClose={(_) => handleClose()}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                fontWeight: "500",
                color: "black",
                alignSelf: "center",
                margin: "auto",
              }}
              variant="h5"
            >
              Create new Todo
            </Typography>
            <IconButton
              style={{
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 10px -4px",
                width: 52,
                height: 52,
                margin: "0px 0px 0px 15px",
                color: "black",
              }}
              onClick={(_) => handleClose()}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>{renderModal()}</DialogContent>
      </Dialog>
    </>
  );
}
