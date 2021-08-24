import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, ImageSearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import React , { useState } from 'react'
import './chatbox.css'
import axios from './axios'

//~ import error
//import { InsertEmoticonIcon } from '@material-ui/icons/InsertEmoticon';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';


function Chatbox  ({ messages }) {

    const [input,setInput] = useState("");

const sendMessage=async (e)=>{
    e.preventDefault();
  
    axios.post('./messages/new',{

        message : input,
        name:'demo app',
        timestamp:'just now',
        received:false,
    })

};

    return (

        <div className='chatbox' >
            <div className="chatbox__header">
                <Avatar />
                <div className="chatbox__headerinfo">
                    <h3>room name</h3>
                    <p>last seen</p>
                </div>
                <div className="chatbox__header__right">
                    <IconButton>
                        <ImageSearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chatbox__body">
                { messages.map((message) => (


                    <p className={`'chatbox__message' ${message.received && "chatbox__receiver"}`} >

                        <span className="chatbox__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chatbox__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))};
                <p className='chatbox__reciever'>

                    <span className="chatbox__name">
                        milan
                    </span>

                    this is message
                    <span className="chatbox__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className='chatbox__message'>

                    <span className="chatbox__name">
                        milan
                    </span>

                    this is message
                    <span className="chatbox__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

            </div>
            <div className="chatbox__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} 
                    onChange={(e)=> setInput(e.target.value)}
                    placeholder='type a message' type='text' />
                    <button onClick={sendMessage} type='submit' >
                        send message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chatbox;
