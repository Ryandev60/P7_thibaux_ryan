import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Post() {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAttachment, setNewPostAttachment] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/posts");

      setData(result.data);
    };
    fetchData();
  }, []);
  console.log(data);

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
      },
    }).catch((error) => console.log(error.response));
  };

  
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
                    <p>{item.createdAt}</p>
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
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
