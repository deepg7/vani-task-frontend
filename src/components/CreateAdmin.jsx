import { input, URL } from "../constants";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
const CreateAdmin = () => {
  const { user } = useUserAuth();
  const makeAdmin = async () => {
    try {
      const phone = document.getElementById("adminPhone").value;
      const dbUser = await axios.patch(
        `${URL}/user/${phone}`,
        {},
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );
      if (dbUser.status == 201 && dbUser.data[0]) {
        document.getElementById("adminPhone").value = null;
        console.log(dbUser.data);
      }
      if (!dbUser.data[0]) console.log("not found");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h3>Make User Admin</h3>

      <div style={{ display: "flex" }}>
        <div style={input}>Enter Phone Number</div>
        <input
          type={"text"}
          placeholder="Phone"
          id="adminPhone"
          style={input}
          required
        />
      </div>
      <button onClick={makeAdmin}>Submit</button>
    </div>
  );
};

export default CreateAdmin;
