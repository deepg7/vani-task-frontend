import { useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
import { useEffect } from "react";
import { URL } from "../constants";
import { QRCodeSVG } from "qrcode.react";
import { QrReader } from "react-qr-reader";

const GetAllStations = (props) => {
  const { user } = useUserAuth();
  const [stations, setStations] = useState([]);
  const [id, setId] = useState(-1);
  const [vehicles, setVehicles] = useState([]);
  const [qrValue, setQrValue] = useState(-1);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    const getStations = async () => {
      const db = await axios.get(`${URL}/station`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setStations(db.data);
    };
    getStations();
  }, [user]);

  useEffect(() => {
    console.log("fired");
    const getVehicles = async () => {
      const db = await axios.get(`${URL}/vehicle/${id}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setVehicles(db.data);
    };
    getVehicles();
  }, [id]);
  return (
    <>
      <h3>Station data</h3>
      <table>
        <tr>
          {props.isAdmin && <th>Id</th>}
          <th>Name</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Pincode</th>
          <th>Get Available Vehicles</th>
        </tr>
        {stations?.map((s) => {
          return (
            <tr key={s.id}>
              {props.isAdmin && <td>{s.id}</td>}
              <td>{s.name}</td>
              <td>{s.streetAddress}</td>
              <td>{s.city}</td>
              <td>{s.state}</td>
              <td>{s.pincode}</td>
              <td>
                <button
                  onClick={() => {
                    setId(s.id);
                  }}
                >
                  Submit
                </button>
              </td>
            </tr>
          );
        })}
      </table>

      {id !== -1 && (
        <>
          <div>Vehicle for station {id}</div>
          <table>
            <tr>
              <th>Model</th>
              <th>Fuel Type</th>
              <th>Type</th>
              <th>Color</th>
              <th>Number</th>
              {props.isAdmin && <th>Generate QR</th>}
            </tr>
            {console.log("vehicles", vehicles)}
            {vehicles?.map((v) => {
              return (
                <tr key={v.id}>
                  <td>{v.model}</td>
                  <td>{v.fuelType}</td>
                  <td>{v.type}</td>
                  <td>{v.color}</td>
                  <td>{v.number}</td>
                  {props.isAdmin && (
                    <td>
                      <button onClick={() => setQrValue(v.id)}>
                        Generate Qr
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </table>
          {qrValue != -1 && (
            <>
              <h3>Generated Qr for vehicle {qrValue}</h3>
              <QRCodeSVG value={qrValue.toString()} />
            </>
          )}
          {props.isAdmin && qrValue != -1 && (
            <>
              <button onClick={() => setQrValue(-1)}>Hide Qr</button>
            </>
          )}
          {!props.isAdmin && (
            <button onClick={() => setCamera(!camera)}>Scan QR Code</button>
          )}
          {camera && (
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (!!result) {
                  //   setData(result?.text);
                  setCamera(!camera);
                  console.log(result);
                  axios
                    .post(
                      `${URL}/booking/${result?.text}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${user?.accessToken}`,
                        },
                      }
                    )
                    .then((data) => {
                      window.prompt(
                        data.data.VehicleId,
                        data.data.id,
                        data.data.UserId
                      );
                    })
                    .catch((e) => {
                      window.prompt(e);
                    });
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ width: "100%" }}
            />
          )}
        </>
      )}
    </>
  );
};
export default GetAllStations;
