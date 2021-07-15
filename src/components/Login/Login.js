import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import TelegramIcon from '@material-ui/icons/Telegram';
import { auth, provider } from '../utility/firebase'
import { useStateValue } from '../utility/StateProvider'
import { actionTypes } from '../utility/reducer'

function Login() {
    const [state, dispatch] = useStateValue()

    const signIn = () => {

        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="login">
          <div className="login__logo">
              {/* <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png" alt="" /> */}
              {/* <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="" /> */}
              <p>SocialApp</p>
              <TelegramIcon style={{fontSize: 86, color: "#1877f2"}} />
            </div>
            <Button type="submit" onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
