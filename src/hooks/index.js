import { useContext, useEffect, useRef, useState } from 'react';
import { AlbumContext } from '../providers/AlbumProvider';
import axios from "axios";
export const useAlbums = () => {
  return useContext(AlbumContext);
};

export const useProvideAlbum = () => {
  const [albums, setAlbums] = useState(null);
  const [loading, setLoading] = useState(true);
  let idz=useRef(100);

  useEffect(() => {
    const fetchAlbums = async () => {      
        const baseUrl = "https://jsonplaceholder.typicode.com/albums";
        const response = await axios.get(baseUrl);
        if (response.status === 200) {
            
            setAlbums(response.data);
        }
        setLoading(false);
    };
    fetchAlbums();
    
  }, []);

  const addAlbumToState = (album) => {
    idz.current = idz.current+1;
    console.log(typeof(idz.current));
    album.id = idz.current;
    const newAlbums = [album, ...albums];

    setAlbums(newAlbums);
  };
  const editAlbum = (newAlbum) => {
    console.log(newAlbum);
    const newAlbums = albums.map((album) => {
      if (album.id === newAlbum.id) {
        album.title=newAlbum.title;
        return { ...album};
      }
      return album;
    });

    setAlbums(newAlbums);
  };

  const deleteAlbum = (albumId) => {
    const newAlbums = albums.filter((album)=>{
      return album.id !== albumId;
    })

    setAlbums(newAlbums);
  };

  return {
    data: albums,
    loading,
    addAlbumToState,
    editAlbum,
    deleteAlbum,
    setLoading
  };
};