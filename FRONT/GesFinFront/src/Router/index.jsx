import { createBrowserRouter, redirect } from "react-router-dom";
import AccesoAdmin from "../Pages/AccesoAdmin/AccesoAdmin";
import AccesoUsuario from "../Pages/AccesoUsuario/AccesoUsuario";
import CrearIncidencia from "../Pages/AccesoUsuario/CrearIncidencia/Crearincidencia";
import VerIncidencia from "../Pages/AccesoUsuario/VerIncidencia/Verincidencia";
import HistoricoIncidencia from "../Pages/AccesoUsuario/HistoricoIncidencia/HistoricoIncidencia";
import Comunidades from "../Pages/AccesoAdmin/Comunidades/Comunidades";
import Proveedores from "../Pages/AccesoAdmin/Proveedores/Proveedores";
import Incidencias from "../Pages/AccesoAdmin/Incidencias/Incidencias";
import Seguros from "../Pages/AccesoAdmin/Seguros/Seguros";
import Usuarios from "../Pages/AccesoAdmin/Usuarios/Usuarios";
import Home from "../Pages/Home/Home";
import Root from "../../Layout/index";
import NotFound from "../Pages/NotFound/NotFound";
import SignInSide from "../Pages/login/login";



const checkAuth = () => {
  if (!localStorage.getItem("token")) return redirect("/login");
  else return null;
};

const checkLogin = () => {
  if (!localStorage.getItem("token")) return redirect("/dashboard");
  else return null;
};

const checkAdmin = () => {
  return localStorage.getItem("role" === "Admin");
};

const checkUser = () => {
  console.log(localStorage.getItem("role"));
  if (
    localStorage.getItem("role") === "Admin" ||
    localStorage.getItem("role") === "User"
  ) {
    return null;
  } else {
    return redirect("/");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInSide />,
    errorElement: <NotFound />,
    children: [{ path: "/", element: <SignInSide /> }],
  },
  { path: "/login/admin", element: <AccesoAdmin />, loader: checkAdmin },
  { path: "/login/admin/comunidades", element: <Comunidades />, loader: checkAdmin },
  { path: "/login/admin/incidencias", element: <Incidencias />, loader: checkAdmin },
  { path: "/login/admin/proveedores", element: <Proveedores />, loader: checkAdmin },
  { path: "/login/admin/seguros", element: <Seguros />, loader: checkAdmin },
  { path: "/login/admin/usuarios", element: <Usuarios />, loader: checkAdmin },
  { path: "/login/user", element: <AccesoUsuario />, loader: checkUser },
  {path: "/login/user/crear", element: <CrearIncidencia />, loader: checkUser},
  { path: "/login/user/ver", element: <VerIncidencia />, loader: checkUser },
  { path: "/login/user/historico", element: <HistoricoIncidencia />, loader: checkUser},
  
]);


export default router