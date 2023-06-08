import React from "react";
import { useState } from 'react';
import { useAlbums } from "./hooks";
import PropTypes from "prop-types";
import axios from "axios";
import AddAlbum from "./AddAlbum";
export const AlbumsList = React.memo((props) => {
  const [modal, setModal] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const albums = useAlbums();

  if (albums.loading) {
    return <div className="app-spinner"></div>;
  }

  const deleteAlbum = (id)=>{
    albums.setLoading(true); 
    const baseUrl = `https://jsonplaceholder.typicode.com/albums/${id}`;
    axios.delete(baseUrl)
    .then(function (response) {
      albums.deleteAlbum(id);
      albums.setLoading(false);

    })
    .catch(function (error) {
      console.log(error);
      albums.setLoading(false);
    });
};

  const handleDeleteAlbum = async(id) => {
 
    await deleteAlbum(id);

  };
  return (
    <>
      <AddAlbum modal={modal} setModal={setModal} album={currentAlbum}></AddAlbum>
      <div className="flex-list">
        {albums.data.map((album) => {
          return (
            <div className="card-container" key={album.id} id={album.id}>
              <div className="hero-image-container">
                <img
                  className="hero-image"
                  src={`https://source.unsplash.com/collection/${Math.floor(
                    Math.random() * 30 + 1
                  )}/275x275/`}
                  alt="img"
                />
              </div>
              <main className="main-content">
                <h1>{album.title}</h1>
                <div className="action-btns">
                  <button
                    onClick={() => {
                      handleDeleteAlbum(album.id);
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={() => {
                      setCurrentAlbum(album);
                      setModal(!modal);
                    }}>Edit</button>
                </div>
              </main>
            </div>
          );
        })}
      </div>
    </>
  );
});
AlbumsList.propTypes = {
  albums: PropTypes.array,
};
