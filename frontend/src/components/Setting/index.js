import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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
  const [modifyAvatar, setModifyAvatar] = useState("");
  const [modifyFirstName, setModifyFirstName] = useState("");
  const [modifLastName, setModifyLastName] = useState("");
  const [modifyEmail, setModifyEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [modifyPassword, setModifyPassword] = useState("");

  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const [image, setImage] = useState(null);

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUserDelete = () => {
    if (window.confirm("Supprimer votre compte ? ")) {
      axios({
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser}`,
        },
        url: `http://localhost:5000/api/users/delete/${currentUserdecoded.userId}`,
        data: {
          currentPassword,
        },
      })
        .then(localStorage.clear(), window.location.assign("/login"))
        .catch((error) => console.log(error.response));
    }
  };

  const handleUserAvatar = () => {
    let formData = new FormData();
    formData.append("image", image);
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/avatar/${currentUserdecoded.userId}`,
      data: formData,
    })
      .then(setRefresh(!refresh))
      .catch((error) => console.log(error.response));
  };

  const handleUserFirstName = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/firstname/${currentUserdecoded.userId}`,
      data: {
        firstName: modifyFirstName,
      },
    })
      .then(setRefresh(!refresh))
      .catch((error) => console.log(error.response));
  };

  const handleUserLastName = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/lastname/${currentUserdecoded.userId}`,
      data: {
        lastName: modifLastName,
      },
    })
      .then(setRefresh(!refresh))
      .catch((error) => console.log(error.response));
  };

  const handleUserEmail = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/email/${currentUserdecoded.userId}`,
      data: {
        email: modifyEmail,
      },
    })
      .then(setRefresh(!refresh))
      .catch((error) => console.log(error.response));
  };

  const handleUserPassword = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/password/${currentUserdecoded.userId}`,
      data: {
        currentPassword: currentPassword,
        newPassword: modifyPassword,
      },
    })
      .then(setRefresh(!refresh))
      .catch((error) => console.log(error.response));
  };
  return (
    <div className="containerparam">
      <div className="paramspace">
        <div className="modify">
          <img src={avatar} alt="" className="avatar" />
          <label htmlFor="file">
            <FontAwesomeIcon icon={faImage} className="icon">
              {" "}
            </FontAwesomeIcon>
          </label>
          <input
            type="file"
            id="file"
            name="image"
            onChange={onFileChange}
            className="white"
            accept=".png, .jpg, .jpeg, .gif"
          />
          <button className="modifybutton" onClick={handleUserAvatar}>
            Valider
          </button>
        </div>
        <div className="modify firstname">
          <p>{firstName}</p>
          <label htmlFor="firstname">
            <input
              type="text"
              onChange={(e) => setModifyFirstName(e.target.value)}
            />
          </label>
          <button className="modifybutton" onClick={handleUserFirstName}>
            Valider
          </button>
        </div>
        <div className="modify lastname">
          <p>{lastName}</p>
          <label htmlFor="lastname">
            <input
              type="text"
              onChange={(e) => setModifyLastName(e.target.value)}
            />
          </label>
          <button className="modifybutton" onClick={handleUserLastName}>
            Valider
          </button>
        </div>
        <div className="modify email">
          <p>{email}</p>
          <label htmlFor="email">
            <input
              type="text"
              onChange={(e) => setModifyEmail(e.target.value)}
            />
          </label>
          <button className="modifybutton" onClick={handleUserEmail}>
            Valider
          </button>
        </div>
        <div className="modify password">
          <p>Modifier votre mot de passe</p>
          <label htmlFor="currentpassword">Mot de passe actuel</label>
          <input
            type="password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label htmlFor="currentpassword">Nouveau mot de passe</label>
          <input
            type="password"
            onChange={(e) => setModifyPassword(e.target.value)}
          />
          <button className="modifybutton" onClick={handleUserPassword}>
            Valider
          </button>
        </div>
        <label htmlFor="deleteuser">
          <input
            type="password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <button className="modifybutton" onClick={handleUserDelete}>
          Valider
        </button>
      </div>
    </div>
  );
}
