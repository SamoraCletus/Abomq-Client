import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ReactCrop from "react-image-crop";
import { Icon, Modal } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_USERS_QUERY, UPLOAD_PHOTO_MUTATION } from "../queries/Quieries";

export function UploadProfilePic() {
  const acceptedFileTypes = `image/x-png, image/png, image/jpeg, image/gif`;
  const [viewImage, setViewImage] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    height: 468,
    unit: "px",
    width: 468,
    x: 0,
    y: 107,
  });
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [uploadPhoto] = useMutation(UPLOAD_PHOTO_MUTATION, {
    refetchQueries: [{ query: FETCH_USERS_QUERY }],
  });
  const handleFileChange = (e) => {
    let image = e.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setViewImage(reader.result);
      };
    }
  };
  const onImageLoaded = (image) => {
    setImage(image);
    console.log(image);
  };
  function handleCrop(crop) {
    setCrop(crop);
  }
  function handleCropComplete(crop) {
    makeClientCrop(crop);
  }
  async function makeClientCrop(crop) {
    if (image && crop.width && crop.height) {
      await getCroppedImg(image, crop, "newFile.jpeg");
    }
  }
  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        let fileUrl;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
        setImageUrl(blob);
      }, "image/jpeg");
    });
  }

  const onUpload = (e) => {
    e.preventDefault();
    createUploadCallback();
  };
  function createUploadCallback() {
    uploadPhoto({ variables: imageUrl });
    setViewImage(undefined);
    setOpen(false);
  }
  const uploadBtn = (
    <label htmlFor="upload-image">
      <input
        style={{ display: "none" }}
        id="upload-image"
        name="upload photo"
        type="file"
        multiple={false}
        accept={acceptedFileTypes}
        onChange={handleFileChange}
      />
      <Button className="upload-btn" variant="contained" component="span">
        <Icon name="image" size="big" /> upload Photo
      </Button>
    </label>
  );
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="tiny"
        trigger={uploadBtn}
      >
        <Modal.Content image>
          <ReactCrop
            src={viewImage}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onChange={handleCrop}
            onComplete={handleCropComplete}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button className="form-btn" type="submit" onClick={onUpload}>
            Upload
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export function UploadButton({ btnName, onChange, name }) {
  const acceptedFileTypes = `image/x-png, image/png, image/jpeg, image/gif`;
  return (
    <label htmlFor="upload-image">
      <input
        style={{ display: "none" }}
        id="upload-image"
        name={name}
        multiple={false}
        accept={acceptedFileTypes}
        type="file"
        onChange={onChange}
      />
      <Button className="upload-btn" variant="contained" component="span">
        <Icon name="image" size="big" /> {btnName}
      </Button>
    </label>
  );
}

export function UpdataProfile() {}
