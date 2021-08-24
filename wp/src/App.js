import React, { useEffect, useState } from 'react';
import './App.css';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from "./axios";


function App() {

  const[messages,setMessages]=useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        console.log(response.data)
      })
  }, [])

  useEffect(() => {

    const pusher = new Pusher('bf983811ae88dc945433', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
      setMessages([...messages,setMessages])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
      
    }

  }, [messages])

console.log('messages')

  return (
    <div className='app'>
      <div className='app_body'>


        {/*ANCHOR!{sidebar components} */}
        <Sidebar />

        {/*ANCHOR!{chat components} */}
        <Chatbox  messages={messages}/>
      </div>
    </div>
  );
}

export default App;
