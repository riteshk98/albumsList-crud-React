import { createContext } from "react";
import {useProvideAlbum} from "../hooks";

const initialState=  {
    user: [],
    loading:true,
    addAlbumToState:()=>{},
    editAlbum:()=>{},
    deleteAlbum:()=>{},
    setLoading:()=>{}
    
};


export const AlbumContext = createContext(initialState);

export const AlbumProvider=({children})=>{
    const album = useProvideAlbum();

    return <AlbumContext.Provider value={album}>
        {children}
        </AlbumContext.Provider>
}