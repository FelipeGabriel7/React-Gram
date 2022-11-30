import React from "react";

import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Likeds } from "../../components/Likeds";
import { likedPhotos, searchSlice } from "../../slices/photoSlice";
import { PhotoItem } from "../../components/PhotoItem";
import { Link } from "react-router-dom";

import './Search.css'

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, photo ,  loading } = useSelector((state) => state.photos);

  useEffect(() => {
    dispatch(searchSlice(search));
  }, [dispatch, search]);

  function handleLike(photo){
    dispatch(likedPhotos(photo._id))
  }

  return (
    <div style={{height: '80vh' , margin: '3em'}}>
      <h3>
        {" "}
        Confira o resultado da sua busca{" "}
        <span style={{ color: " #092cee" }}> {search} </span>:{" "}
      </h3>
      <div style={{marginTop: '5em'}}>
        {loading && <p> Carregando ... </p>}
        {photos.length === 0 && (
          <>
           <p> Essa foto não existe </p>
           <Link className="link-search"
          to={`/perfil/${user._id}`}
        >
          {" "}
          Adicione uma nova Foto{" "}
        </Link>
          </>
        )}
        {photos &&
          photos.map((photo) => (
            <div key={photo._id}>
              <PhotoItem photo={photo} />
              <Likeds photo={photo} user={user} handleLike={handleLike} />
              <Link
              className="link-search"
                to={`/photos/${photo._id}`}
              >
                {" "}
                Ver mais{" "}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
