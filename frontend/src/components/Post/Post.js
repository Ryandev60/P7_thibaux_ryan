import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Post() {
  const test = document.querySelector(".createcontent");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    window.location.assign("/login");
  }
  const currentUserdecoded = currentUser && jwt_decode(currentUser);
  //
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAttachment, setNewPostAttachment] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  const handleCreatePost = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:5000/api/posts/create",
      data: {
        postContent: newPostContent,
        postAttachment: newPostAttachment,
        userId: currentUserdecoded.userId,
      },
    })
      .then(
        setRefresh(!refresh),
        test.value ? (test.value = "") : null,
        setNewPostContent("")
      )
      .catch((error) => console.log(error.response));
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/posts/", {
        headers: { Authorization: `Bearer ${currentUser}` },
      });
      setData(result.data);
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="containerpost">
      <div className="postspace">
        <div className="createpost">
          <div className="avatartextarea">
            <div className="avatar">
              <img src="http://localhost:5000/images/user-solid.svg" alt="" />
            </div>
            <textarea
              className="createcontent"
              name=""
              id=""
              placeholder="Quoi de neuf aujourd'hui"
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
          </div>
          <div className="containericon">
            <FontAwesomeIcon icon={faImage} className="icon"></FontAwesomeIcon>
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
                <div className="numberlikecomment">
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="icon"
                      ></FontAwesomeIcon>
                    </li>
                    <li>Commentaires</li>
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
                {item.Comments.map((comment) => (
                  <Fragment key={comment.id}>
                    <p>{item.User.firstName}</p>
                    <ul>
                      <li>{item.User.firstname}</li>
                      <li>{comment.content}</li>
                    </ul>
                  </Fragment>
                ))}
                <div className="comment"></div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
