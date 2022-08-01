import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UserSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    setIsLoading(true);

 fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
    .then( response => {
      if (response.ok) {
        console.log("new user added");
        console.log(newUser);
        setIsLoading(false);
      } else if (!response.ok){
        console.log(response.statusText);
        console.log ((response.body)); 
      } else {
        throw new Error(response.status);
      }
    })
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

//somewhere here
// async createUser(user) {
//     // makes a POST request to the /users endpoint
//     const response = await this.api('/users', 'POST', user);
//      // if the response status is 200,
//     // returns an empty array
//     if (response.status === 201) {
//       return [];
//     }
//     else if (response.status === 400) {
//       return response.json().then(data => {
//         return data.errors;
//       });
//     }
//     else {
//       throw new Error();
//     }
//   }
