import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UserSignIn(){

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

    return (
        <main>
          <div className="form--centered">
            <h2>Sign In</h2>
  
            <form>
              <label for="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <label for="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button" type="submit">
                Sign In
              </button>
              <button
                className="button button-secondary"
                onclick="event.preventDefault();"
              >
               <Link to="/">Cancel</Link> 
              </button>
            </form>
            <p>
              Don't have a user account? Click here to {" "}
               <Link to="/signup">sign up</Link>!
            </p>
          </div>
        </main>
      );
    
}
  

