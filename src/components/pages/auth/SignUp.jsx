import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

import { roles, statuses } from "../../../utilities/constant.js";
import { register } from "../../../store/slicesAndThunks/authSlices/authSlice.js";
import {
  authContainerSx,
  authPaperSx,
  authLinkSx,
  roleToggleContainerSx,
  roleButtonSx,
} from "../../../styles/authSpecificStyles";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegisterSubmit = () => {
    dispatch(register({ name, email, password, role }));
  };

  return (
    <Box sx={authContainerSx}>
      <Paper elevation={3} sx={authPaperSx}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />

        <Box sx={roleToggleContainerSx}>
          <Button
            variant={role === roles.student ? "contained" : "outlined"}
            sx={roleButtonSx(role === roles.student)}
            onClick={() => setRole(roles.student)}
          >
            Student
          </Button>
          <Button
            variant={role === roles.teacher ? "contained" : "outlined"}
            sx={roleButtonSx(role === roles.teacher)}
            onClick={() => setRole(roles.teacher)}
          >
            Teacher
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegisterSubmit}
        >
          Register
        </Button>

        {status === statuses.loading && <CircularProgress sx={{ mt: 2 }} />}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Typography sx={authLinkSx} onClick={() => navigate("/sign-in")}>
          Already have an account? Sign In
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
