import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Post() {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAttachment, setNewPostAttachment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/posts");

      setData(result.data);
    };
    fetchData();
  }, []);

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
    });
  };
  return (
    <div className="containerpost">
      <div className="postspace">
        <div className="createpost">
          <textarea
            className="createcontent"
            name=""
            id=""
            placeholder="Quoi de neuf aujourd'hui"
            onChange={(e) => setNewPostContent(e.target.value)}
          ></textarea>
          <div className="containericon">
            <FontAwesomeIcon
              icon={faImage}
              className="icon"
              onClick={handleCreatePost}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="icon"
              onClick={handleCreatePost}
            ></FontAwesomeIcon>
          </div>
        </div>
        <Fragment>
          <ul>
            {data.map(item =>(
              <li key={item.id}>
                <p>{item.postContent}</p>
              </li>
            ))}
          </ul>
        </Fragment>
      </div>
    </div>
  );
}
