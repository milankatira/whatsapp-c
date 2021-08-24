import { Avatar } from '@material-ui/core'
import React from 'react'
import './sidebarchat.css'

const SidebarChat = () => {
    return (
        <div className='sidebarchat'>
            <Avatar/>

            <div className="sidebarchat_info">
            <h2>room name</h2>
            <p>last message</p>
            </div>
        </div>
    )
}

export default SidebarChat

