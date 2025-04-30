import axios from "axios";

const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

export const validateLogin = async (email, password) => {
  console.log("urlApiBackend", urlApiBackend);
  
  var jsonData = {
    Email: email,
    Password: password,
  };
  console.log("jsonData", jsonData);
  console.log("urlApiBackend + /api/Home/login", urlApiBackend + "/api/Home/login");
  
  try {
    const response = await axios.post(urlApiBackend + "/api/Home/login", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log("Error en la llamada a la API:", err);
    return err;
  }
};
