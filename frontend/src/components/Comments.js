import React from "react";
import "./Comments.css";

// icons
import { BsChatLeftText } from "react-icons/bs";
import { uploads } from "../utils/config";
import { Link } from "react-router-dom";
import { Message } from "./Message";

export const Comments = ({ handleComment, photo, chat, setChat, txtComment, setTxtComment , message }) => {


  return (
    <>
  
      <div className="comment">
        <BsChatLeftText onClick={() => setChat((prevChat) => !prevChat)} />

        {!chat && (
          <div className="form-comment">
            <input
              type="text"
              placeholder="adicione um comentario"
              required
              value={txtComment}
              onChange={(e) => setTxtComment(e.target.value)}
            />
            <button type="submit" onClick={() => handleComment()}>
              {" "}
              Adicionar{" "}
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        {message && <Message type="success" name="Comentário Adicionado" />}
        {photo.comments && <p> Comentários ({photo.comments.length}) </p> }
        {photo.comments && photo.comments.length <= 0 && <p> Não há comentários </p>}
        {photo.comments && photo.comments.map((comment) => (
          <div key={comment.comment} className="comment-content">
            {comment.userImage && (
              <img className="perfil-comment"
                src={`${uploads}/users/${comment.userImage}`}
                alt={comment.comment}
              />
            )}
            <div className="comment-item">
              <Link className="name-comment" to={`/users/${comment.userId}`}> {comment.userName} </Link>

              <p className="text-comment"> {comment.comment} </p>
            </div>
         
          </div>
        ))}
      </div>
      <hr/>
    </>
  );
};
