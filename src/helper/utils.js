export const initialAllOptionPromises = async (
  allPromisesArray,
  ID_TYPES_Array,
  setAllOptions
) => {
  setAllOptions([]);
  let array = [];
  await Promise.allSettled(allPromisesArray())
    .then((allOptions) => {
      allOptions.map((option, index) => {
        if (option.status === "fulfilled") {
          let key = ID_TYPES_Array[index];
          let value = option.value?.data ?? option.value;
          array.push({ key, value });
        }
      });
    })
    .finally(() => {
      setAllOptions(array);
    });
};


export const mapDropDownOptionsFromBackendToSelectOptionsNeededForLibrary = (
  backEndOptions,
  idEntity = "IdEntity"
) => {
  return backEndOptions.map((option, index) => ({
    value: option.Value,
    label: option.Text,
    idEntity: option?.IdEntity,
  }));
};

export const setStateWithCallBackResponse = async (
  callbackAPI,
  setState,
  isSelectedOptions = false
) => {
  const response = await callbackAPI();
  if (responseCode200(response)) {
    var dataMap = isSelectedOptions
      ? mapDropDownOptionsFromBackendToSelectOptionsNeededForLibrary(
          response.data
        )
      : response.data;
    setState(dataMap);
  } else {
    console.log("Error: ", response);
  }
};

export const notNullAndNotUndefinded = (data) => {
  return data != null && data != undefined ? true : false;
};

export const handleFind = (allDropdowns, key) => {
  return allDropdowns?.find((o) => o.key == key)?.value;
};

export const handleFindDropdownSelected = (allDropdowns, res, key) => {
  const currentValue = res[key];
  const dropdown = allDropdowns?.find((o) => o.key === key);
  const value = dropdown?.value?.find((item) => item.IdCategory == currentValue)
    ?.IdCategory;
  return value !== undefined ? value : currentValue;
};

export const handleChangeSelect = (setFormValues, res, key) => {
  setFormValues((lastData) => ({
    ...lastData,
    [key]: res.target?.value,
  }));
};

export const responseCode200 = (response) => {
  return response &&
    response.status &&
    (response.status === 200 || response.status === 201 || response.status === 204)
    ? true
    : false;
};

export const isNullOrUndefinded = (data) => {
  return data == null || data == undefined ? true : false;
};

export const manageResponse = (response, dispatch, navigate) => {
  if (response.response !== undefined) {
    if (response.response.status === 401) {
      console.error("Error 401");
      redirectToLogIn(dispatch);
      mostrarMensajeSesionExpirada(dispatch);
    } else if (response.response.status === 403) {
      console.error("Error 403 ", response);
      navigate.push("/");
    } else if (response.response.status === 500) {
      console.error("Error 500 ", response);
      redirectToLogIn(dispatch);
    }
  }
};

function mostrarMensajeSesionExpirada(dispatch) {
  console.debug("mostrarMensajeSesionExpirada");
  dispatch({
    type: "SHOW_MESSAGE_EXPIRED_SESSION",
  });
}

function redirectToLogIn(dispatch) {
  console.debug("redirectToLogIn");
  dispatch({
    type: "LOGOUT",
  });
}

export function formatCurrency(value) {
  const roundedValue = Math.round(value * 100) / 100;

  return roundedValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}