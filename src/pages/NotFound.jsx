import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <Link to="/"> Go Back To Home Page</Link>
    </div>
  );
};

export default NotFound;
