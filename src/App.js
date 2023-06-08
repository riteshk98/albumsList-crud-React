import { useState } from "react";
import { AlbumsList } from "./AlbumsList";
import AddAlbum from "./AddAlbum";

function App() {
  const [modal, setModal] = useState(false);
  return (
    <div className="App">
      <header>
        <h1>Albums List</h1>
        <button onClick={() => setModal(!modal)}>Add Album</button>
      </header>
      <AddAlbum modal={modal} setModal={setModal}></AddAlbum>
      <AlbumsList />
    </div>
  );
}

export default App;
