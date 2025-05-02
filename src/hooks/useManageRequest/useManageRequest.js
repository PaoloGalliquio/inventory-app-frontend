import { toast } from "react-toastify";
import { responseCode200 } from "../../helper/utils";
import { useDeleteRequest, useDownloadRequest, useGetRequest, usePostRequest, usePutRequest } from "../useRequest/useRequest";

export const useManageGetRequest = () => {
  const [executeGetRequest] = useGetRequest();

  const manageGetRequest = async (
    api,
    callbackSuccess
  ) => {
    const response = await executeGetRequest(api);
    if (responseCode200(response)) {
      callbackSuccess(response);
    } else {
      if (response?.response?.data?.message) toast.error(response?.response?.data?.message);
    }
    return response;
  };

  return [manageGetRequest];
};

export const useManagePostRequest = () => {
  const [executePostRequest] = usePostRequest();

  const managePostRequest = async (
    api,
    payload,
    callbackSuccess,
    callbackFailure = null
  ) => {
    const response = await executePostRequest(api, payload);
    if (responseCode200(response)) {
      if (response?.data?.message) toast.success(response?.data?.message);
      callbackSuccess(response);
    } else {
      if (response?.response?.data?.message) toast.error(response?.response?.data?.message);
      if (callbackFailure) callbackFailure(response);
    }
    return response;
  };

  return [managePostRequest];
};

export const useManagePutRequest = () => {
  const [executePutRequest] = usePutRequest();

  const managePutRequest = async (
    api,
    payload,
    callbackSuccess,
    callbackFailure = null
  ) => {
    const response = await executePutRequest(api, payload);
    if (responseCode200(response)) {
      if (response?.data?.message) toast.success(response?.data?.message);
      callbackSuccess(response);
    } else {
      console.log(response);
      
      if (response?.response?.data?.message) toast.error(response?.response?.data?.message);
      if (callbackFailure) callbackFailure(response);
    }
    return response;
  };

  return [managePutRequest];
};

export const useManageDeleteRequest = () => {
  const [executeDeleteRequest] = useDeleteRequest();

  const manageDeleteRequest = async (
    api,
    callbackSuccess,
    callbackFailure = null
  ) => {
    const response = await executeDeleteRequest(api);
    if (responseCode200(response)) {
      if (response?.data?.message) toast.success(response?.data?.message);
      callbackSuccess(response);
    } else {
      if (response?.response?.data?.message) toast.error(response?.response?.data?.message);
      if (callbackFailure) callbackFailure(response);
    }
    return response;
  };

  return [manageDeleteRequest];
}

export const useManageDownloadRequest = () => {
  const [executeDownloadRequest] = useDownloadRequest();

  const manageDownloadRequest = async (
    api,
    fileName,
    callbackSuccess,
    callbackFailure = null
  ) => {
    toast.info("Descargando archivo...");
    const response = await executeDownloadRequest(api);
    if (responseCode200(response)) {
      toast.success("Descarga exitosa");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      callbackSuccess(response);
    } else {
      if (response?.response?.data?.message) toast.error(response?.response?.data?.message);
      if (callbackFailure) callbackFailure(response);
    }
    return response;
  };

  return [manageDownloadRequest];
}