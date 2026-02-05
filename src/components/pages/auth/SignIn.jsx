import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, TextField, Typography, Alert, CircularProgress, Paper } from "@mui/material";

import { login } from "../../../store/slicesAndThunks/authSlice";
import { authContainerSx, authPaperSx } from "../../../styles/styleSpecificAuth/authStyles";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleLoginSubmit = () => {
    dispatch(login({ email, password }));
  };

  return (
    <Box sx={authContainerSx}>
      <Paper elevation={3} sx={authPaperSx}>
        <Typography variant="h4" gutterBottom>Sign In</Typography>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLoginSubmit}>Login</Button>
        {status === "loading" && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default SignIn;
