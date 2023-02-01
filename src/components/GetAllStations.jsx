import { useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
import { useEffect } from "react";
import { URL } from "../constants";
import { QRCodeSVG } from "qrcode.react";
import { QrReader } from "react-qr-reader";
import { Button } from "react-bootstrap";
import "./table.css";
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
      <div style={{ "margin-top": "25px" }}>
        <h3>Station data</h3>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Phone</th>
            <th>Get Available Vehicles</th>
          </tr>
          {stations?.map((s) => {
            return (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.streetAddress}</td>
                <td>{s.city}</td>
                <td>{s.state}</td>
                <td>{s.pincode}</td>
                <td>{s.phone}</td>
                <td>
                  <Button
                    onClick={() => {
                      setId(s.id);
                    }}
                  >
                    Submit
                  </Button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {vehicles.length == 0 ? (
        <h3 style={{ "margin-top": "25px" }}>
          No Available vehicles in selected station!
        </h3>
      ) : (
        id !== -1 && (
          <div style={{ "margin-top": "25px" }}>
            <h3>Vehicle for station {id}</h3>
            <table>
              <tr>
                <th>Id</th>
                <th>Model</th>
                <th>Fuel Type</th>
                <th>Type</th>
                <th>Color</th>
                <th>Number</th>
                {props.isAdmin && <th>Generate QR</th>}
              </tr>
              {vehicles?.map((v) => {
                return (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.model}</td>
                    <td>{v.fuelType}</td>
                    <td>{v.type}</td>
                    <td>{v.color}</td>
                    <td>{v.number}</td>
                    {props.isAdmin && (
                      <td>
                        <Button onClick={() => setQrValue(v.id)}>
                          Generate Qr
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </table>
            {qrValue != -1 && (
              <div style={{ "margin-top": "25px" }}>
                <h3>Generated Qr for vehicle {qrValue}</h3>
                <QRCodeSVG value={qrValue.toString()} />
              </div>
            )}
            {props.isAdmin && qrValue != -1 && (
              <div style={{ "margin-top": "5px" }}>
                <br />
                <Button onClick={() => setQrValue(-1)}>Hide Qr</Button>
              </div>
            )}
            {!props.isAdmin && (
              <Button onClick={() => setCamera(!camera)}>Scan QR Code</Button>
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
                        //success toast here
                      })
                      .catch((e) => {
                        //error toast here
                      });
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: "100%" }}
              />
            )}
          </div>
        )
      )}
    </>
  );
};
export default GetAllStations;
