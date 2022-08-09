import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context";


export default function UserSignUp() {
  // handles state of form fields, errors and buttons
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // uses context from global state
  const context = useContext(Context);
  // navigates user to a specified path
  const navigate = useNavigate()

//handles submit of form
  const handleSubmit = (e) => {

    e.preventDefault();
    //creates new user object
    const newUser = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    setIsLoading(true);

//makes post request to API
 fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
    // checks the response
    .then( response => {
      // if the response is ok, log 'new user added', log the user object
      // turn off loading button text and signs in the newly created user
      // navigates the new user to homepage
      if (response.ok) {
        console.log("new user added");
        console.log(newUser);
        setIsLoading(false);
        context.actions.signIn(emailAddress, password);
        navigate('/')
      // if response is not ok, log the status text to the console 
      //and sends the errors to the errors object
      } else if (!response.ok){
        setIsLoading(false);
        console.log(response.statusText);
        setErrors({ errors }); 
        //if something else, send a new error
      } else {
        throw new Error(response.status);
      }
    })
    .catch((err => {
      console.log(err);
    }))
   }

    return (
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          {errors && (
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                    { firstName === "" && (
                      <li>Please provide a value for " First Name"</li>
                    )}
                    { lastName === "" && (
                      <li>Please provide a value for "Last Name"</li>
                    )}
                    { emailAddress === "" && (
                      <li>Please provide a value for "Email Address"</li>
                    )}
                    { password === "" && (
                      <li>Please provide a value for "Password"</li>
                    )}
                  </ul>
                </div>
              )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            {!isLoading && (
              <button className="button" type="submit">
                Sign Up!
              </button>
            )}
            {isLoading && (
              <button disabled className="button" type="submit">
                Signing you up...
              </button>
            )}
            <button className="button button-secondary">
              <Link to="/">Cancel</Link>
            </button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <Link to="/signin">sign in</Link>!
          </p>
        </div>
      </main>
    );
  };
