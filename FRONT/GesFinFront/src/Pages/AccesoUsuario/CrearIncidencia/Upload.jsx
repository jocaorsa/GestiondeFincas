/* eslint-disable react/prop-types */
import { useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import { TextField } from "@mui/material";

function ImageUploader({ resultImage, onDatosRecibidos }) {
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "da8ojgryp");

    try {
      const response = await axios.post(
        "http://res.cloudinary.com/da8ojgryp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  onDatosRecibidos(imageUrl);

  return (
    <>
      <Image
        style={{ width: "140px", borderRadius: "50%", marginTop: "24px" }}
        cloudName="ayoze"
        publicId={resultImage}
      />
      <TextField
        labelid="image-label"
        type="file"
        style={{ width: "80%", background: "white", borderRadius: "4px" }}
        size="small"
        onChange={handleImageUpload}
      />
    </>
  );
}

export default ImageUploader;
