import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({uuid,socket,setUser}) => {

  const [roomId,setRoomId]=useState("")
  const [name,setName]=useState("")
  const navigate=useNavigate();


  const handleRoomJoin=(e)=>{
    e.preventDefault();
    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:false,
      presenter:false
    };
    setUser(roomData);
    navigate(`/${roomId}`)
    socket.emit("userJoined",roomData)
  }
  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          className="form-control my-2"
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div className="form-group border ">
          <input
            type="text"
            value={roomId}
            placeholder="Enter Room Code"
            className="form-control my-2 border-0 mx-2"
            onChange={(e)=>setRoomId(e.target.value)}
          />        
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4 form-control btn-block"
        onClick={handleRoomJoin}
      >
        Join Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
