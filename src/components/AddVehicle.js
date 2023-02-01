import { input } from "../constants";
import axios from "axios";
import { URL } from "../constants";
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from "react";
const AddVehicle = () => {
  const { user } = useUserAuth();
  const [vehicle, setVehicle] = useState({});
  const clearForm = () => {
    document.getElementById("model").value = null;
    document.getElementById("numberPlate").value = null;
    document.getElementById("fuelType").value = null;
    document.getElementById("color").value = null;
    document.getElementById("type").value = null;
  };
  const addVehicle = async () => {
    try {
      const model = document.getElementById("model").value;
      const number = document.getElementById("numberPlate").value;
      const fuelType = document.getElementById("fuelType").value;
      const color = document.getElementById("color").value;
      const type = document.getElementById("type").value;
      const enteredVehicle = await axios.post(
        `${URL}/vehicle`,
        {
          payload: {
            model,
            number,
            fuelType,
            color,
            type,
          },
        },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      if (enteredVehicle.status == 201) {
        setVehicle(enteredVehicle.data);
        //add toast probably
        clearForm();
        console.log(vehicle);
      }
    } catch (e) {
      //toast probably
      console.log(e);
    }
  };
  return (
    <div>
      <h3>Add A Vehicle</h3>
      <div style={{ display: "flex" }}>
        <div style={input}>Enter Model</div>
        <input
          type={"text"}
          placeholder="Model"
          id="model"
          style={input}
          required={true}
        />
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Vehicle Number Plate</div>
        <input
          type={"text"}
          placeholder="Vehicle Number Plate"
          id="numberPlate"
          style={input}
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Fuel Type</div>
        <input
          type={"text"}
          placeholder="Fuel Type"
          id="fuelType"
          style={input}
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Color</div>
        <input
          type={"text"}
          placeholder="Color"
          id="color"
          style={input}
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Type</div>
        <input type={"text"} placeholder="Type" id="type" style={input}></input>
      </div>
      <button onClick={addVehicle}>Submit</button>
    </div>
  );
};

export default AddVehicle;