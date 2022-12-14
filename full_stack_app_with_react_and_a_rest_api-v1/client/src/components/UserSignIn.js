import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context";

export default function UserSignIn(){

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [ errors, setErrors] = useState([])
  const context = useContext(Context);
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault();
    console.log(`context:${context}`)
  context.actions.signIn(emailAddress, password)
  .then((user) => {
    if (user === null) {
      console.log("no user");
      setErrors({ errors }); 
    } else {
      console.log(`user:${user}`)
      navigate('/')
      console.log(`SUCCESS! ${emailAddress} is now signed in!`);
    }
  })

  }

    return (
   
            <main>
          <div className="form--centered">
            <h2>Sign In</h2>
  
            <form >
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button" type="submit" onClick={submit}>
                Sign In
              </button>
              <button 
                className="button button-secondary"
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
          )

 
}
  

