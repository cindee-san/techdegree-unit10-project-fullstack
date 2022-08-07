import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Consumer, Context } from "../Context";

// const context = useContext(Context);

function Header() {

  return (
    <Consumer>
      {(context) =>{
  <header>
    <div className="wrap header--flex">
      <h1 className="header--logo"><Link to="/">Courses</Link></h1>
      <nav>
        {  !context.authenticatedUser && 
        (<ul className="header--signedout">
            <li><Link to="/signup">Sign Up!</Link></li>
            <li><Link to="signin">Sign In!</Link></li>
         </ul>)}
        { context.authenticatedUser && (
          <ul className="header--signedin">
            <li>Welcome, Joe Smith!</li>
            <li><a href="sign-out.html">Sign Out</a></li>
          </ul>)}
        
      </nav>
    </div> 
  </header>}} 
    </Consumer>
  
  
  )
  
}

export default Header;