import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
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
     // that needs user to be authenticate first
     <Context.Provider value={value}>
       {this.props.children}
     </Context.Provider>  
   );
 }

 // asynchronous function that takes a username and password as arguments
 signIn = async (username, password) => {
   // uses those credentials to call the getUser() method in Data.js,
   // which makes a GET request to the protected /users route
   // on the server and returns the user data.
   const user = await this.data.getUser(username, password);
   // The returned PromiseValue will be an object holding 
   // the authenticated user's name and username values
   if (user !== null) {
     // update the authenticatedUser state to the value of user
     // the authenticatedUser state will remain null
     this.setState(() => {
       return {
         authenticatedUser: user,
       };
     });
     const cookieOptions = {
       // defines when the cookie will be removed
       expires: 1 // 1 day
     };
     // create a cookie that stores 
     // the authenticated user data (user and username).
     // first argument specifies the name of the cookie to set
     // second argument specifies the value to store in the cookie
     // store the stringified user object
     // Pass Cookies.set() an object as the last argument to 
     // set additional cookie options -- for example, an expiration
     Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
   }
   return user;
 }

 signOut = () => {
   // update the authenticatedUser state to null
   // This removes the name and username properties from state – 
   // the user is no longer authenticated 
   // and cannot view the private components.
   this.setState({ authenticatedUser: null });
   // deletes a cookie
   //takes an argument, the name of the cookie to delete
   Cookies.remove('authenticatedUser');
 }
  
}


export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }
