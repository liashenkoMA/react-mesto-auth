import React from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function ProtectedRoute(props) {

  const user = React.useContext(CurrentUserContext);

  return (
    user ? props.children : <Navigate to={props.rout.login} replace />
  )
}