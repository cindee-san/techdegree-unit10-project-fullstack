import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: [],
      }
    

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
          } = this.state;
        return (
           
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={firstName} ></input>
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={lastName}></input>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress}></input>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value={password}></input>
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault();"><Link to="/">Cancel</Link></button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
        );
    }
}
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