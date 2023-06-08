import { useState } from "react";
import { useAlbums } from "./hooks";
import axios from "axios";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

const AddAlbum = (props) => {
  const [album, setAlbum] = useState(props.album ? props.album.title : "");
  const [addingAlbum, setAddingAlbum] = useState(false);

  const albums = useAlbums();

  const addAlbum = (album) => {
    const baseUrl = "https://jsonplaceholder.typicode.com/albums";
    axios
      .post(baseUrl, {
        title: album,
      })
      .then(function (response) {
        setAlbum("");
        albums.addAlbumToState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editAlbum = (album) => {
    console.log(props);
    const baseUrl = `https://jsonplaceholder.typicode.com/albums/${props.album.id}`;
    axios
      .patch(baseUrl, {
        title: album,
        id: props.album.id
      })
      .then(function (response) {
        setAlbum("");
        console.log(response);
        albums.editAlbum(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddAlbum = async () => {
    setAddingAlbum(true);
    await addAlbum(album);
    setAddingAlbum(false);
    props.setModal(!props.modal);
  };

  const handleEditAlbum = async () => {
    setAddingAlbum(true);
    await editAlbum(album);
    setAddingAlbum(false);
    props.setModal(!props.modal);
  };

  return (
    <>
      <Modal
        size="lg"
        isOpen={props.modal}
        toggle={() => {
          props.setModal(!props.modal);
        }}
      >
        <ModalHeader
          toggle={() => {
            props.setModal(!props.modal);
          }}
        >
          {props.album ? "Edit Data" : "Enter Data"}
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album Name"
          ></Input>
          <Button
            disabled={addingAlbum}
            onClick={() => {
              if (props.album) {
                handleEditAlbum();
              } else {
                handleAddAlbum();
              }
            }}
            style={{ margin: 5 }}
            type="Submit"
          >
            Save
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddAlbum;
