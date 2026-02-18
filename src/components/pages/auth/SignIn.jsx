import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography, Alert, CircularProgress, Paper } from "@mui/material";

import { login } from "../../../store/slicesAndThunks/authSlice";
import { authContainerSx, authPaperSx, authLinkSx } from "../../../styles/authSpecificStyles";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, error } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = () => {
    dispatch(login({ email, password }));
  };

  return (
    <Box sx={authContainerSx}>
      <Paper elevation={3} sx={authPaperSx}>
        <Typography variant="h4" gutterBottom>Sign In</Typography>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={({target : {value}}) => setEmail(value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={({target : {value}}) => setPassword(value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLoginSubmit}>Login</Button>
        {status === "loading" && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Typography sx={authLinkSx} onClick={() => navigate("/sign-up")}>
          Don't have an account? Sign Up
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignIn;
