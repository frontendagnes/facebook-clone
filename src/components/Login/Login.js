import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import TelegramIcon from '@material-ui/icons/Telegram';
import { auth, provider } from '../utility/firebase'


function Login() {
// logowanie za pomocą google
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .catch(error => console.log(error.message))
    }

    return (
        <div className="login">
          <div className="login__logo">
              <p>SocialApp</p>
              <TelegramIcon style={{fontSize: 86, color: "#1877f2"}} />
            </div>
            <Button type="submit" onClick={signIn}>Sign In with Google</Button>
        </div>
    )
}

export default Login
