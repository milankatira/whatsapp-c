import React from 'react';
import './sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons';
import SideBarChat from './SidebarChat.js';

const Sidebar = () => {
    return (
        < div className="sidebar">
            <div className='sidebar_header'>
                <Avatar src="data:image/png;base64,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" />
                <div className='sidebar_headerright'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_search_container'>
                    <SearchOutlined />
                    <input placeholder='search or start now chat' type='text' />

                </div>
            </div>
            <div className="sidebar__chat">
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
            </div>
        </div>
    );
};

export default Sidebar
