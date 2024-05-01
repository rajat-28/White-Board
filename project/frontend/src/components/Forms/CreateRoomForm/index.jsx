import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid,socket,setUser}) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name,setName]=useState("");
  
  const navigate=useNavigate();

  const handleCreateRoom=(e)=>{
    e.preventDefault();
    // console.log(roomId);
    // console.log(name);

    const roomData={
        name,
        roomId,
        userId:uuid(),
        host:true,
        presenter:true,
    }
    setUser(roomData) 
    navigate(`${roomId}`);
    console.log(roomData)
    // console.log(roomData)
    
    socket.emit("userJoined",roomData); //userJoined is event name
   
  }

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Enter Your Name"
          className="form-control my-2"
        />
      </div>
      <div className="form-group">
        <div className="input-group align-items-center justify-content-center ">
          <input
            type="text"
            value={roomId}
            placeholder="Generate Room Code"
            className="form-control my-2 border-0 mx-2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary me-2" onClick={()=>setRoomId(uuid())} type="button">
              Generate
            </button>
            <button className="btn btn-outline-danger me-2" type="button">
              Copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4 form-control btn-block"
        onClick={handleCreateRoom}
      >
       Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
