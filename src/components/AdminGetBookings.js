import axios from "axios";
import { URL } from "../constants";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useUserAuth } from "../context/UserAuthContext";

const AdminGetBookings = () => {
  const { user } = useUserAuth();
  const [bookings, setBookings] = useState([]);
  const [qrValue, setQrValue] = useState("-1");
  useEffect(() => {
    const getBookings = async () => {
      const bookings = await axios.get(`${URL}/booking`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setBookings(bookings.data);
    };
    getBookings();
  }, []);

  return (
    <>
      <h3>Booking data</h3>
      <table>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>User Phone</th>
          <th>Vehicle Number Plate</th>
          <th>Vehicle Model</th>
          <th>Vehicle Color</th>
          <th>Receive vehicle At station</th>
          <th>Generate QR</th>
        </tr>
        {bookings?.map((b) => {
          return (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user.name}</td>
              <td>{b.user.phone}</td>
              <td>{b.vehicle.number}</td>
              <td>{b.vehicle.model}</td>
              <td>{b.vehicle.color}</td>
              <td>
                <input
                  type={"number"}
                  placeholder="Enter station ID"
                  required={true}
                  id="sid"
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    setQrValue(
                      b.id + "-" + document.getElementById("sid").value
                    );
                  }}
                >
                  Submit
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      {qrValue != "-1" && <QRCodeSVG value={qrValue} />}
    </>
  );
};

export default AdminGetBookings;
