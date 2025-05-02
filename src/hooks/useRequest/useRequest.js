import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { manageResponse } from "../../helper/utils";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export const useGetRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

  const executeGetRequest = async (api) => {
    if (api) {
      return await axios
        .get(`${urlApiBackend}${api}`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
            Authorization: "Bearer " + state.token,
          },
        })
        .catch((response) => {
          console.error("error response", response);
        manageResponse(response, dispatch, navigate);
          return response;
        });
    }
  };

  function executeGetRequestCallback(functionThatReturnsAPI) {
    return function () {
      return executeGetRequest(functionThatReturnsAPI);
    };
  }
  return [executeGetRequest, executeGetRequestCallback];
};

export const usePostRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

  const executePostRequest = async (api, payload) => {
    try {
      return await axios
        .post(`${urlApiBackend}${api}`, payload, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            Authorization: "Bearer " + state.token,
          },
        });
    } catch (response) {
      console.error("error response", response);
      manageResponse(response, dispatch, navigate);
      return response;
    }
  };

  return [executePostRequest];
};

export const usePutRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

  const executePutRequest = async (api, payload) => {
    try {
      return await axios
        .put(`${urlApiBackend}${api}`, payload, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            Authorization: "Bearer " + state.token,
          },
        });
    } catch (response) {
      console.error("error response", response);
      manageResponse(response, dispatch, navigate);
      return response;
    }
  };

  return [executePutRequest];
};

export const useDeleteRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

  const executeDeleteRequest = async (api) => {
    try {
      return await axios
        .delete(`${urlApiBackend}${api}`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            Authorization: "Bearer " + state.token,
          },
        });
    } catch (response) {
      console.error("error response", response);
      manageResponse(response, dispatch, navigate);
      return response;
    }
  };

  return [executeDeleteRequest];
};

export const useDownloadRequest = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const urlApiBackend = process.env.REACT_APP_BACKEND_URL;

  const executeDownloadRequest = async (api) => {
    try {
      return await axios
        .get(`${urlApiBackend}${api}`, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            Authorization: "Bearer " + state.token,
          },
          responseType: "blob",
        });
    } catch (response) {
      console.error("error response", response);
      manageResponse(response, dispatch, navigate);
      return response;
    }
  };

  return [executeDownloadRequest];
}