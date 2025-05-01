import { toast } from "react-toastify";
import { responseCode200 } from "../../helper/utils";
import { useDeleteRequest, useGetRequest, usePostRequest, usePutRequest } from "../useRequest/useRequest";

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
      if (response?.data?.message) toast.error(response?.data?.message);
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
      if (response?.data?.message) toast.error(response?.data?.message);
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
      if (response?.data?.message) toast.error(response?.data?.message);
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
      if (response?.data?.message) toast.error(response?.data?.message);
      if (callbackFailure) callbackFailure(response);
    }
    return response;
  };

  return [manageDeleteRequest];
}