import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import "./App.css";
import { getAuthUser } from "./JS/actions/authActions";
import AppNavBar from "./Components/AppNavBar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { useEffect } from "react";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  // const user = {
  //   name:"firas",
  //   lastName:"benFoulen",
  //   email:"firas7@gmail.com",
  //   password:"12345"
  // }
  // const handleUser = (aUser)=>{
  //   dispatch(userRegister(aUser));
  // }

  const getUser = async () => {
    await dispatch(getAuthUser());
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <button onClick={()=>handleUser(user)}>add User</button> */}
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}

export default App;
