import React from 'react'
import './Header.css'
import { useStateValue } from '../utility/StateProvider'
import { auth, signOut } from '../utility/firebase';
// mui
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Header() {

    const [{ user }] = useStateValue()

    const Logout = () => {
        signOut(auth)
    }
    return (
        <div className = "header">
            <div className = "header__left">
                <div className="header__logo">
                    SocialApp
                </div>
                <div className="header__input">
                    <SearchIcon />
                    <input type="text" placeholder="Search Facebook"/>
                </div>
            </div>
            <div className = "header__center">
                <div className="header__option header__option--active">
                    <HomeIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <FlagIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <SubscriptionsIcon fontSize="large" />
                </div>
                <div className="header__option">
                    <StorefrontIcon fontSize="large" />
                </div> 
                <div className="header__option">
                    <SupervisedUserCircleIcon fontSize="large" /> 
                </div> 
            </div>
            <div className = "header__right">
                <div className="header__info">
                    <Avatar src={user.photoURL}/>
                    <h4>{user.displayName}</h4>
                </div>
                <IconButton>
                    <AddIcon />
                </IconButton>
                <IconButton>
                    <ForumIcon />
                </IconButton>
                <IconButton>
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton>
                    <ExpandMoreIcon />
                </IconButton>
                <IconButton onClick={Logout} title="LogoOut">
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Header

