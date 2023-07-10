import './App.css'
import { RouterProvider } from "react-router";
import router from './Router/index'
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
