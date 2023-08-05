import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardMedia, Grid, Paper, TextField, Typography } from "@mui/material";
import { LoginUser } from "./models/authentication/LoginUser";
import authService from "../services/authService";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

type Props = {};

const Login: React.FC<Props> = () => {

  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setMessage("");
    setLoading(true);

    const user: LoginUser = {
      email: data.get('email')?.toString() ?? "",
      password: data.get('password')?.toString() ?? "",
    }

    authService.login(user).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={6}>
        <Card>
          <CardMedia
            component="img"
            height="100%"
            image="/images/project_management.jpeg"
            alt=""
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockOutlined sx={{ m: 1 }} color="primary" fontSize="large" />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={loading}
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login;