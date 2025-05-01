import axios from "axios";

const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

export const validateLogin = async (email, password) => {
  var jsonData = {
    Email: email,
    Password: password,
  };
  try {
    const response = await axios.post(urlApiBackend + "/api/Home/login", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
