import React from "react";
import './HelloWorld.scss'

const HelloWorld: React.FC<{}> = () => {



  return (
    <div className="container">



      {/* Navbar */}
      <div className="navbar">
        <h1>Hello</h1>
        <input
          type="text"
          placeholder="Enter your name"
        />
      </div>




    </div>




  )
};

export default HelloWorld;
