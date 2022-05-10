import React from "react";
import "./Login.css";
import { auth, provider, signInWithPopup } from "../utility/firebase";
// mui
import Button from "@mui/material/Button";
import TelegramIcon from "@mui/icons-material/Telegram";

function Login() {
  // logowanie za pomocą google
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) =>
      console.log("Login Google Error>>", error.message)
    );
  };

  return (
    <div className="login">
      <div className="login__logo">
        <p>SocialApp</p>
        <TelegramIcon style={{ fontSize: 86, color: "#1877f2" }} />
      </div>
      <Button type="button" onClick={signIn}>
        Sign In with Google
      </Button>

    </div>
  );
}

export default Login;
