// Import

import React, { Fragment, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Comment from "./Comment";

// Composant Post

export default function Post() {
  // Récupération information utilisateur
  const contentPostInnerHtml = document.querySelector(".createpostcontent");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    window.location.assign("/login");
  }
  const currentUserdecoded = currentUser && jwt_decode(currentUser);
  const [refresh, setRefresh] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [avatar, setAvatar] = useState("");
  const placeholder = "Quoi de neuf aujourd'hui " + firstName;

  // Récupération informations Post

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAttachment, setNewPostAttachment] = useState("");
  const [data, setData] = useState([]);

  // Fonction pour convertir la date

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Appel aux informations Post

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/posts/", {
        headers: { Authorization: `Bearer ${currentUser}` },
      });
      setData(result.data);
    };
    fetchData();
  }, [refresh]);

  // Appel aux informations utilisateur

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
    };
    fetchData();
  }, []);

  // Fonction création d'un Post

  const handleCreatePost = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: "http://localhost:5000/api/posts/create",
      data: {
        postContent: newPostContent,
        attachment: newPostAttachment,
        userId: currentUserdecoded.userId,
      },
    })
      .then(
        setRefresh(!refresh),
        contentPostInnerHtml.value ? (contentPostInnerHtml.value = "") : null,
        setNewPostContent("")
      )
      .catch((error) => console.log(error.response));
  };

  // Composant retourner

  return (
    <div className="containerpost">
      {/* Espace Post*/}
      <div className="postspace">
        <div className="createpost">
          <div className="avatartextarea">
            <div className="avatar">
              <img src={avatar} alt="" />
            </div>
            <textarea
              className="createpostcontent"
              name=""
              id=""
              placeholder={placeholder}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
          </div>
          <div className="containericon">
            <label htmlFor="file" className="label-file"></label>
            <input
              type="file"
              name="file"
              id="file-upload"
              onChange={(e) => setNewPostAttachment(e.target.value)}
            />
            <FontAwesomeIcon icon={faImage} className="icon">
              {" "}
              <input type="file" accept=".jpg" />
            </FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="icon"
              onClick={handleCreatePost}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="news">
          {data.map((item) => (
            <Fragment key={item.id}>
              <div key={item.id} className="post">
                <div className="postinfo">
                  <img src={item.User.avatar} alt="avatar" className="avatar" />
                  <div className="userandtime">
                    <p>
                      {item.User.firstName} {item.User.lastName}
                    </p>
                    <p>{formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <p className="postcontent">{item.postContent}</p>
                </div>
                <div className="postimg">
                  <p>Ici</p>
                  <img src={item.attachment} alt="" />
                </div>
                <div className="numberlikecomment">
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="icon"
                      ></FontAwesomeIcon>
                    </li>
                    <li className="commentnumber">
                      {item.Comments.length}{" "}
                      {item.Comments.length > 1
                        ? "Commentaires"
                        : "Commentaire"}
                    </li>
                  </ul>
                </div>
                <div className="likecomment">
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="icon"
                      ></FontAwesomeIcon>{" "}
                      J'aime
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faComment}
                        className="icon"
                      ></FontAwesomeIcon>
                      Commenter
                    </li>
                  </ul>
                </div>

                {/*Espace commentaires */}

                <Comment
                  boucle={item.Comments}
                  key={item.Comments.id}
                  date={formatDate}
                  placeholder={placeholder}
                  postid={item.id}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
