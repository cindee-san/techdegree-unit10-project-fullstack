import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function UserSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

//handles submit of form
  const handleSubmit = (e) => {

    e.preventDefault();
    //creates new user
    const newUser = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    setIsLoading(true);

    const { context } = this.props;
    
//makes post request
 fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
    // checks the response
    .then( response => {
      //if the response is ok, log 'new user added', log the user object, turn off loading button text
      if (response.ok) {
        console.log("new user added");
        console.log(newUser);
        setIsLoading(false);
        // if response is not ok, log the staus text to the console and set the errors to the errors object
      } else if (!response.ok){
        console.log(response.statusText);
        setErrors({ errors }); 
        //if something else, send a new error
      } else {
        throw new Error(response.status);
      }
    })// sign in the user
    .then(context.signIn(emailAddress, password))
    // push to history stack
    .then(e.history.push('/'))
    //catch other errors
    .catch((err => {
      console.log(err);
      this.props.history.push('/error');
    }))
   }

    return (
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>

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
