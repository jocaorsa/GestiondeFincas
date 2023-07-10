import { createBrowserRouter, redirect } from "react-router-dom";
import AccesoAdmin from "../Pages/AccesoAdmin/AccesoAdmin";
import AccesoUsuario from "../Pages/AccesoUsuario/AccesoUsuario";
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

const checkUsuario = () => {
  console.log(localStorage.getItem("role"));
  if (
    localStorage.getItem("role") === "Admin" ||
    localStorage.getItem("role") === "Usuario"
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
    children: [
      { path: "/", element: <SignInSide /> },
      { path: "/admin", element: <AccesoAdmin />, loader: checkAdmin },
      { path: "/usuario", element: <AccesoUsuario />, loader: checkUsuario},
    ],
  },
]);


export default router