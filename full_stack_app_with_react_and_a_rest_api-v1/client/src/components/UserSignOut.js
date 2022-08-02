import React, { useContext, useEffect }from 'react';
import { Navigate } from 'react-router';
import { Context } from "../Context";

export default () => {

  const context = useContext(Context);
  
  useEffect( () => context.actions.signOut());

  return (
    <Navigate to="/" />
    
  );
}