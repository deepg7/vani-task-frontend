import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { URL } from "../constants";
import { useUserAuth } from "../context/UserAuthContext";
import AddStation from "./AddStation";
import AddVehicle from "./AddVehicle";
import AdminGetBookings from "./AdminGetBookings";
import AssignVehicle from "./AssignVehicle";
import CreateAdmin from "./CreateAdmin";
import GetAllStations from "./GetAllStations";
import MyBookings from "./MyBookings";
import "./table.css";
import { ToastContainer } from "react-toastify";
const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [dbUser, setDbUser] = useState({});
  // const [stations, setStations] = useState([]);
  console.log(user);
  let db;
  useEffect(() => {
    const getUser = async () => {
      db = await axios.get(`${URL}/user`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setDbUser(db.data);
    };
    getUser();
  }, [db, user]);
  return (
    <>
      <ToastContainer />
      <h2 className="box mt-3 p-4 text-center">Hello {dbUser?.name}</h2>
      <div className=" fixed">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      {dbUser?.role === "admin" && (
        <>
          {/* <div style={{ display: "flex", gap: "10px" }}> */}
          <AddStation />
          <AddVehicle />
          {/* </div> */}
          <CreateAdmin />
          <AssignVehicle />
          <AdminGetBookings />
        </>
      )}

      <GetAllStations isAdmin={dbUser?.role === "admin"} />
      {dbUser.role != "admin" && <MyBookings />}
    </>
  );
};

export default Home;
