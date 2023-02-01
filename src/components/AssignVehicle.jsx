import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import axios from "axios";
import { URL } from "../constants";
import { input } from "../constants";
import { Button } from "react-bootstrap";

const AssignVehicle = () => {
  const { user } = useUserAuth();
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const getVehicles = async () => {
      const db = await axios.get(`${URL}/vehicle/`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setVehicles(db.data);
    };
    getVehicles();
  }, []);

  const assignVehicle = async () => {
    try {
      const vehicleId = document.getElementById("vehicleId").value;
      const stationId = document.getElementById("stationId").value;
      console.log(vehicleId, stationId);
      const updatedVehicle = await axios.patch(
        `${URL}/vehicle/${vehicleId}/${stationId}`,
        {},
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      console.log(updatedVehicle);
      if (updatedVehicle.status == 200 && updatedVehicle.data[0] == 1) {
        // setVehicle(enteredVehicle.data);
        //add toast probably
        document.getElementById("vehicleId").value = null;
        document.getElementById("stationId").value = null;
        console.log(updatedVehicle);
      }
      // if (updatedVehicle.data[0] == 0) console.log("not found");
    } catch (e) {
      //toast probably
      console.log(e);
    }
  };
  return (
    <div style={{ "margin-top": "25px" }}>
      <h3>Add vehicle to station.</h3>
      <>
        <table>
          <tr>
            <th>Id</th>
            <th>Model</th>
            <th>Fuel Type</th>
            <th>Type</th>
            <th>Color</th>
            <th>Number</th>
            <th>Station</th>
          </tr>
          {vehicles?.map((v, idx) => {
            return (
              <tr key={idx}>
                <td>{v.id}</td>
                <td>{v.model}</td>
                <td>{v.fuelType}</td>
                <td>{v.type}</td>
                <td>{v.color}</td>
                <td>{v.number}</td>
                <td>{v.StationId || "0"}</td>
              </tr>
            );
          })}
        </table>
        <div style={{ display: "flex" }}>
          <div style={input}>Enter Vehicle Id</div>
          <input
            type={"number"}
            placeholder="Vehicle Id"
            id="vehicleId"
            style={input}
          ></input>
        </div>

        <div style={{ display: "flex" }}>
          <div style={input}>Enter Station Id</div>
          <input
            type={"number"}
            placeholder="Station Id"
            id="stationId"
            style={input}
          ></input>
        </div>
        <Button onClick={assignVehicle}>Submit</Button>
      </>
    </div>
  );
};

export default AssignVehicle;
