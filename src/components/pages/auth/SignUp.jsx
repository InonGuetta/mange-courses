import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography, Alert, CircularProgress, Paper } from "@mui/material";

import { register } from "../../../store/slicesAndThunks/authSlice";
import { authContainerSx, authPaperSx, authLinkSx, roleToggleContainerSx, roleButtonSx } from "../../../styles/authSpecificStyles";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleRegisterSubmit = () => {
    dispatch(register({ name, email, password, role }));
  };

  return (
    <Box sx={authContainerSx}>
      <Paper elevation={3} sx={authPaperSx}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>

        <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Box sx={roleToggleContainerSx}>
          <Button
            variant={role === "student" ? "contained" : "outlined"}
            sx={roleButtonSx(role === "student")}
            onClick={() => setRole("student")}
          >
            Student
          </Button>
          <Button
            variant={role === "teacher" ? "contained" : "outlined"}
            sx={roleButtonSx(role === "teacher")}
            onClick={() => setRole("teacher")}
          >
            Teacher
          </Button>
        </Box>

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegisterSubmit}>Register</Button>

        {status === "loading" && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Typography sx={authLinkSx} onClick={() => navigate("/sign-in")}>
          Already have an account? Sign In
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
