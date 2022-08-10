import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";



function Header() {
const context = useContext(Context);

  return (
  <header>
    <div className="wrap header--flex">
      <h1 className="header--logo"><Link to="/">Courses</Link></h1>
      <nav>
        {/* //if the user is not logged in, display this header to allow them to sign up or sign in */}
        { !context.authenticatedUser && (<ul className="header--signedout">
            <li><Link to="/signup">Sign Up!</Link></li>
            <li><Link to="signin">Sign In!</Link></li>
         </ul>)}
        {/* //if the user is logged in, display this header to welcome them and allow them to sign out */}
          { context.authenticatedUser && (<ul className="header--signedin">
            <li>{`Welcome ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}!`}</li>
            <li><Link to="/signout">Sign Out!</Link></li>
          </ul>)} 
      </nav>
    </div> 
  </header>
  
  
  )
  
}

export default Header;