import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import AddStation from "./AddStation";
import AddVehicle from "./AddVehicle";
import CreateAdmin from "./CreateAdmin";
import axios from "axios";
import { useEffect } from "react";
import { URL } from "../constants";
import GetAllStations from "./GetAllStations";
import AssignVehicle from "./AssignVehicle";
import AdminGetBookings from "./AdminGetBookings";
import MyBookings from "./MyBookings";
// import { QRCodeSVG } from "qrcode.react";
// import { QrReader } from "react-qr-reader";
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
  // console.log(dbUser);
  // const [data, setData] = useState("No result");
  // const [read, setRead] = useState(false);
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {dbUser?.name}
      </div>
      {/* <QRCodeSVG value="1" />, */}
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      {dbUser?.role === "admin" && (
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            <AddStation />
            <AddVehicle />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <CreateAdmin />
            <AssignVehicle />
          </div>
          <AdminGetBookings />
        </>
      )}

      <GetAllStations isAdmin={dbUser?.role === "admin"} />
      <MyBookings />
      {/* {!read && (
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              setRead(!read);
              console.log(`localhost:3000/booking/${result?.text}`);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
      )}
      <p>{data}</p> */}
    </>
  );
};

export default Home;
