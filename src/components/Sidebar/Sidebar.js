import React from 'react'
import './Sidebar.css'
import { useStateValue } from '../utility/StateProvider'
//component
import SidebarRow from '../SidebarRow/SidebarRow'
//mui
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';

function Sidebar() {
    const [{ user } ] = useStateValue()
    return (
        <div className="sidebar">
            <SidebarRow src={user.photoURL} title={user.displayName} />
            <SidebarRow Icon={EmojiFlagsIcon} title='Pages'/>
            <SidebarRow Icon={PeopleIcon} title='Friends'/> 
            <SidebarRow Icon={ChatIcon} title='Messenger'/> 
            <SidebarRow Icon={StorefrontIcon} title='Marketplace'/> 
            <SidebarRow Icon={VideoLibraryIcon} title='Videos'/> 
            <SidebarRow Icon={ExpandMoreIcon} title='See More' />
        </div>
    )
}

export default Sidebar
