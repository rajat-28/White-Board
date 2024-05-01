import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import JoinRoomForm from './JoinRoomForm'
import './index.css'

const Forms = ({uuid,socket,setUser}) => {
  return (
    <div className="row pt-5 h-100">
        <div className="col col-md-4 form-box border p-5 border-2 rounded-2 mx-auto mt-5 d-flex flex-column align-items-center">
            <h1>Create Room</h1>
            <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
        <div className="col col-md-4 form-box border p-5 border-2 rounded-2 mx-auto mt-5 d-flex flex-column align-items-center">
            <h1>Join Room</h1>
            <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
    </div>
  )
}

export default Forms