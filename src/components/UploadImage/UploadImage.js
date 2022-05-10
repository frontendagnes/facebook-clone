import { useState, useRef, useEffect } from "react";
import db, {
  storage,
  collection,
  addDoc,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  serverTimestamp,
} from "../../components/utility/firebase.js";
import { useStateValue } from "../../components/utility/StateProvider";
import { Button, LinearProgress } from "@mui/material";

function UploadImage({ input, setInput, setIsUpload }) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [{ user }] = useStateValue();

  const fileImgRef = useRef();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleClick = (e) => {
    e.preventDefault();
    fileImgRef.current.click();
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const formHandler = () => {
    if (!image) {
      alert("Najpierw wybierz zdjęcie, później zapisz logo");
    }
    uploadFiles(image);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await addDoc(collection(db, "posts"), {
            message: input,
            timestamp: serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: url,
            likes: [],
          })
            .then(() => {
              setProgress(0);
              setImage(null);
              setInput("");
              setIsUpload(false);
            })
            .catch((error) => console.log("err>>", error.message));
        });
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LinearProgress
          color="success"
          variant="determinate"
          value={progress}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            className="input"
            onChange={handleChange}
            accept="image/*"
            ref={fileImgRef}
            style={{ display: "none" }}
          />

          <Button onClick={handleClick}>
            {preview ? "Zmień zdjęcie" : "Wybierz Zdjęcie"}
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "40%",
          justifyContent: "space-between",
        }}
      >
        {preview ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "100px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              src={preview}
              alt="logo"
              onClick={handleClick}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              marginLeft: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
        )}
      </div>
      {preview ? (
        <Button
          type="button"
          onClick={formHandler}
          style={{ marginLeft: "10px" }}
        >
          Dodaj Post
        </Button>
      ) : null}
    </div>
  );
}

export default UploadImage;
