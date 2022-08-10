import React, { Component } from "react";
import Data from "./Data";

export const Context = React.createContext();
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: null,
    };
  }

  render() {
     // extracted from this.state
    const { authenticatedUser } = this.state;
    const value = {
     //passes state to <Context.Provider>
      authenticatedUser,
      data: this.data,
      actions: {
        // Store the signIn function in a property named signIn; 
        // the value should be a reference to the function: this.signIn
        // store the signOut function in a property named signOut, 
        // and set the value to reference the function, with this.signOut:
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      // context.provider must pass on a value 
      // to be made available to other nested components
      // mandatory value prop is passed a value object, 
      // containing the authenticatedUser  etc
      // which will be made available to every other component
      // that needs user to be authenticated first
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // asynchronous function that takes a username and password as arguments
  signIn = async (emailAddress, password) => {
    // uses those credentials to call the getUser() method in Data.js,
    // which makes a GET request to the protected /users route
    // on the server and returns the user data.
    const user = await this.data.getUser(emailAddress, password);
    console.log(user)
    console.log('Sign In Works!')
    // The returned PromiseValue will be an object holding 
    // the authenticated user's name values
    if (user !== null) {
      // update the authenticatedUser state to the value of user
      // the authenticatedUser state will remain null
      user.password = password
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;
  }

  signOut = () => {
    // update the authenticatedUser state to null
    // This removes the name and username properties from state – 
    // the user is no longer authenticated 
    // and cannot view the private components.
    this.setState({ authenticatedUser: null });
  }
 
}


export const Consumer = Context.Consumer;

// export default function ContextComponent(props) {
//       return (
//         <Context.Consumer>
//           {context => <Component {...props} context={context} />}
//         </Context.Consumer>
//       );
//     }
 
