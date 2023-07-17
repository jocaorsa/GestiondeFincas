import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../services/auth.service";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import theme from "../../theme";

function Copyright(props) {
    
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        GesFin
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();  
    
    const logIn = async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      //console.log(password);
      const data = await login(email, password);

      if (!localStorage.getItem("token")) {
        alert("Error: Usuario o contraseña inválidos");
      } else {
        switch (localStorage.role) {
          case "Admin":
            navigate("/login/admin");
            break;
          case "User":
            navigate("/login/user");
            break;
          default:
            alert("Error: Rol de usuario desconocido");
        }
      }
    }
  //const handleSubmit = (event) => {
  //  event.preventDefault();
  //  const data = new FormData(event.currentTarget);
  //  console.log({
  //    email: data.get("email"),
  //    password: data.get("password"),
  //  });
  //};


/* export default function Login() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate= useNavigate()  

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  const logIn = async () => {   
    const data = await login(email, password)    
    console.log(email)

   if(!localStorage.getItem('token'))
      alert('Error: Usuario o contraseña invalidos')
   else {
    switch (localStorage.role) {
      case 'Admin':
        navigate('/login/admin')
        break
      case 'Usuario':
        navigate('/login/usuario')
      break

    }
    }
   */

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?hotel)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Acceso Usuarios
            </Typography>
            <Box component="form" noValidate onSubmit={logIn} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

