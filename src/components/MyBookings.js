import axios from "axios";
import { URL } from "../constants";
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { QrReader } from "react-qr-reader";

const MyBookings = () => {
  const { user } = useUserAuth();
  const [bookings, setBookings] = useState([]);
  const [qrValue, setQrValue] = useState("-1");
  const [read, setRead] = useState(false);
  useEffect(() => {
    const getBookings = async () => {
      const bookings = await axios.get(`${URL}/booking/user`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setBookings(bookings.data);
    };
    getBookings();
  }, []);

  return (
    <>
      <h3>My Booking data</h3>
      <table>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>User Phone</th>
          <th>Vehicle Number Plate</th>
          <th>Vehicle Model</th>
          <th>Vehicle Color</th>
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
            </tr>
          );
        })}
      </table>
      <button onClick={() => setRead(!read)}>Scan Qr to submit vehicle</button>
      {read && (
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              setRead(!read);
              const ids = result?.text.split("-");
              console.log(ids);
              axios
                .patch(
                  `${URL}/booking/${ids[0]}/${ids[1]}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${user?.accessToken}`,
                    },
                  }
                )
                .then((data) => {
                  window.prompt(data.data[0]);
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
  );
};

export default MyBookings;
