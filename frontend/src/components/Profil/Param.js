import React, { useEffect, useState, useQuery } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Param() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    window.location.assign("/login");
  }
  const currentUserdecoded = currentUser && jwt_decode(currentUser);
  console.log(currentUserdecoded.userId);

  const [data, setData] = useState([]);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [modifyAvatar, setModifyAvatar] = useState(false);
  const [modifyFirstName, setModifyFirstName] = useState(false);
  const [modifLastName, setModifyLastName] = useState(false);
  const [modifyEmail, setModifyEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/users/getone/${currentUserdecoded.userId}`,
        {
          headers: { Authorization: `Bearer ${currentUser}` },
          data: { id: currentUserdecoded.id },
        }
      );
      setAvatar(result.data.user.avatar);
      setFirstname(result.data.user.firstName);
      setLastName(result.data.user.lastName);
      setEmail(result.data.user.email);
    };
    fetchData();
  }, []);

  const handleModifyUser = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/${currentUserdecoded.userId}`,
      data: {
        firstName: modifyFirstName,
        lastName: modifLastName,
        email: modifyEmail,
      },
    })
      .then(console.log("It's ok"))
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="containerparam">
      <div className="paramspace">
        <div className="avatar">
          <div className="modify avatar">
            <img src={avatar} alt="" />
          </div>
          <div className="modify firstname">
            <p>{firstName}</p>
            <label htmlFor="firstname">
              <input
                type="text"
                onChange={(e) => setModifyFirstName(e.target.value)}
              />
            </label>
            <button className="modifybutton" onClick={handleModifyUser}>Valider</button>
          </div>
          <div className="modify lastname">
            <p>{lastName}</p>
            <label htmlFor="lastname">
              <input
                type="text"
                onChange={(e) => setModifyLastName(e.target.value)}
              />
            </label>
            <button className="modifybutton" onClick={handleModifyUser}>Valider</button>
          </div>
          <div className="modify email">
            <p>{email}</p>
            <label htmlFor="email">
              <input
                type="text"
                onChange={(e) => setModifyEmail(e.target.value)}
              />
            </label>
            <button className="modifybutton" onClick={handleModifyUser}>Valider</button>
          </div>
        </div>
      </div>
    </div>
  );
}
