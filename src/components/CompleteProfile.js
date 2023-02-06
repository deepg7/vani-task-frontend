import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { input, URL } from "../constants";
import { useUserAuth } from "../context/UserAuthContext";

const CompleteProfile = () => {
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
  const registerUser = async () => {
    try {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const dob = document.getElementById("dob").value;
      const dbUser = await axios.post(
        `${URL}/user`,
        {
          payload: {
            name,
            email,
            phone: user?.phoneNumber,
            dob,
            role: "user",
          },
        },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      if (dbUser.status == 201) navigate("/home");
    } catch (e) {
      console.log(e);
      toast.error(JSON.stringify(e.response.data.errors || e));
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Name</div>
        <input
          type={"text"}
          placeholder="Name"
          id="name"
          style={input}
          required
        />
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Email</div>
        <input
          type={"email"}
          placeholder="Email"
          id="email"
          style={input}
          required
        ></input>
      </div>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter DOB</div>
        <input
          type={"date"}
          placeholder="DOB"
          id="dob"
          style={input}
          required
        ></input>
      </div>

      <Button onClick={registerUser}>Submit</Button>
    </>
  );
};

export default CompleteProfile;
