// Import

import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Composant Comment

export default function Comment(props) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);
  const [showComment, setShowComments] = useState(true);
  const [newCommentContent, setNewCommentContent] = useState("");
  const contentCommentInnerHtml = document.querySelector(
    ".createcommentcontent"
  );

  // Fonction affichage des commentaires

  const handleShowComment = () => {
    setShowComments(!showComment);
  };

  // Fonction création d'un commentaire

  const handleCreateComment = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: "http://localhost:5000/api/comments/create",
      data: {
        content: newCommentContent,
        userId: currentUserdecoded.userId,
        postId: props.postid,
      },
    })
      .then(
        props.setRefresh(!props.refresh),
        contentCommentInnerHtml.value
          ? (contentCommentInnerHtml.value = "")
          : null,
        setNewCommentContent("")
      )
      .catch((error) => console.log(error.response));
  };

  // Si on clique sur commentaires on verra ces derniers

  if (showComment) {
    return (
      <div className="commentspace">
        {props.boucle.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="commentuser">
              <img src={comment.User.avatar} alt="" />
              <div>
                <p>
                  {comment.User.firstName} {comment.User.lastName}
                </p>
                <p className="commentdate">{props.date(comment.createdAt)}</p>
              </div>
            </div>
            <p>{comment.content}</p>
            <button onClick={handleCreateComment}></button>
          </div>
        ))}
        {/* Créé un commentaire*/}
        <div className="createcomment">
          {" "}
          <div className="avatartextarea">
            <div className="avatar">
              <img src="http://localhost:5000/images/user-solid.svg" alt="" />
            </div>
            <textarea
              className="createcommentcontent"
              name=""
              placeholder="Ecrire un commentaire"
              onChange={(e) => setNewCommentContent(e.target.value)}
            ></textarea>
          </div>{" "}
        </div>
        <div className="containericon">
          <label htmlFor="file" className="label-file"></label>
          <input type="file" name="file" id="file-upload" />
          <FontAwesomeIcon icon={faImage} className="iconcomment">
            {" "}
            <input type="file" accept=".jpg" />
          </FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="iconcomment"
            onClick={handleCreateComment}
          ></FontAwesomeIcon>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
