import { input, URL } from "../constants";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from "react";

const AddStation = () => {
  const { user } = useUserAuth();
  const [station, setStation] = useState({});
  const clearForm = () => {
    document.getElementById("stationName").value = null;
    document.getElementById("streetAddress").value = null;
    document.getElementById("city").value = null;
    document.getElementById("state").value = null;
    document.getElementById("pincode").value = null;
    document.getElementById("stationPhone").value = null;
  };
  const addStation = async () => {
    try {
      const name = document.getElementById("stationName").value;
      const streetAddress = document.getElementById("streetAddress").value;
      const city = document.getElementById("city").value;
      const state = document.getElementById("state").value;
      const pincode = document.getElementById("pincode").value;
      const phone = document.getElementById("stationPhone").value;
      const enteredStation = await axios.post(
        `${URL}/station`,
        {
          payload: {
            name,
            streetAddress,
            city,
            state,
            pincode,
            phone,
          },
        },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      if (enteredStation.status == 201) {
        setStation(enteredStation.data);
        //add toast probably
        clearForm();
        console.log(station);
      }
    } catch (e) {
      //toast probably
      console.log(e);
    }
  };
  return (
    <div>
      <h3>Add A Station</h3>
      <div style={{ display: "flex" }}>
        <div style={input}>Enter Station Name</div>
        <input
          type={"text"}
          placeholder="Name"
          id="stationName"
          style={input}
        />
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Street Address</div>
        <input
          type={"text"}
          placeholder="Street Address"
          id="streetAddress"
          style={input}
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter City</div>
        <input type={"text"} placeholder="City" id="city" style={input}></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter State</div>
        <input
          type={"text"}
          placeholder="State"
          id="state"
          style={input}
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Pincode</div>
        <input
          type={"number"}
          placeholder="Pincode"
          id="pincode"
          style={input}
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Phone</div>
        <input
          type={"text"}
          placeholder="Phone"
          id="stationPhone"
          style={input}
        ></input>
      </div>

      <button onClick={addStation}>Submit</button>
    </div>
  );
};

export default AddStation;
